import zeroFill from '../utils/zero-fill';
import { createDuration } from '../duration/create';
import { addSubtract } from '../moment/add-subtract';
import { isMoment, copyConfig } from '../moment/constructor';
import { addFormatToken } from '../format/format';
import { addRegexToken, matchOffset, matchShortOffset } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { createLocal } from '../create/local';
import { prepareConfig } from '../create/from-anything';
import { createUTC } from '../create/utc';
import isDate from '../utils/is-date';
import toInt from '../utils/to-int';
import isUndefined from '../utils/is-undefined';
import compareArrays from '../utils/compare-arrays';
import { hooks } from '../utils/hooks';

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        var signedOffset = '';
        switch (separator) {
            case '.':
                signedOffset = sign + (((~~(offset / 60)) + separator + (~~(offset) % 60)).replace(/^0+|0+$/g, ''));
                signedOffset = signedOffset[signedOffset.length - 1] === '.' ? signedOffset.slice(0,-1) : signedOffset;
                signedOffset = signedOffset === '+' ? '+0' : signedOffset;
                break;
            case ':':
            case '':
                signedOffset = sign + (zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2));
                break;
        }
        return signedOffset;
    });
}

offset('Z', ':');
offset('ZZ', '');
offset('ZZZ', '.');
// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addRegexToken('ZZZ', matchShortOffset);
addParseToken(['Z', 'ZZ', 'ZZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function shortAbbroffsetFromString(timeZone) {
    var noDigitBeforeDecimalRegex = /^[+-]\.\d\d?$/gi;
    if (noDigitBeforeDecimalRegex.test(timeZone)) {
        timeZone = timeZone.slice(0,1) + '0' + timeZone.slice(1);
    }
    var timeZoneRegex = /^[+-]\d{1,2}(\.\d{1,2})?$/gi;
    var splitRegex = /[+-]|\d\d?/gi;
    if (timeZoneRegex.test(timeZone)) {
        return timeZone.match(splitRegex);
    }
}

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);
    if (matches === null) {
        return null;
    }
    var decimalAndInteger = /^[+-]\d{1,2}(\.\d{1,2})?$/gi;
    var integerAfterDecimal = /^[+-](\.\d{1,2})?$/gi;
    if (decimalAndInteger.test(string) || integerAfterDecimal.test(string)) {
        var shortParts   = shortAbbroffsetFromString(string) || ['-', 0, 0];
        var shortMinutes = +(shortParts[1] * 60) + toInt(shortParts[2] ? shortParts[2].replace(/^\d$/, '$&0') : 0);
        return shortMinutes === 0 ? 0 : (shortParts[0] === '+' ? shortMinutes : -shortMinutes);
    }
    else {
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);
        return minutes === 0 ? 0 : (parts[0] === '+' ? minutes : -minutes);
    }
}

// Return a moment from input, that is local/utc/zone equivalent to model.
export function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
export function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

export function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

export function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

export function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

export function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

export function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

export function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

export function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

export function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

export function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

export function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
