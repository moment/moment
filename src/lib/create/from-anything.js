import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import isUndefined from '../utils/is-undefined';
import isNumber from '../utils/is-number';
import isDate from '../utils/is-date';
import map from '../utils/map';
import { createInvalid } from './valid';
import { Moment, isMoment } from '../moment/constructor';
import { getLocale } from '../locale/locales';
import { hooks } from '../utils/hooks';
import checkOverflow from './check-overflow';
import { isValid } from './valid';

import { configFromStringAndArray }  from './from-string-and-array';
import { configFromStringAndFormat } from './from-string-and-format';
import { configFromString }          from './from-string';
import { configFromArray }           from './from-array';
import { configFromObject }          from './from-object';

var updateInProgress = false;

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    // Prevent infinite loop in case updateOffset creates new moment objects.
    // if (updateInProgress === false) {
    //     updateInProgress = true;
    //     res = hooks.updateOffset(res);
    //     updateInProgress = false;
    // }

    if (res._nextDay) {
        // Adding is smart enough around DST
        res = res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

export function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (input._d != null || input._l != null && input._isAMomentObject !== true) {
        // If it looks like a moment, but isn't
        throw new Error("No uninitialized config should ever reach this place");
    } else if (isMoment(input)) {
        // TODO(iskren): This is wrong, we create moment twice, this is
        // supposed to return ready config
        //
        // TODOv3(iskren): config._i could be just config in-progress? I don't
        // think this should be allowed -- find all places by removing
        // isAMomentObject from config and setting it in the constructor.
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

// TODO: Check what existing moments have in them
// ts, off, locale, tz + parsing flags (only for new)
export function quickCreateLocal(lts, locale, timeZone, flags) {
    var local_ts_offset = computeOffset(lts, timeZone, flags);
    return new Moment({local_ts[0], local_ts[1], locale, timeZone});
}

export function quickCreateUTC(uts, locale, timeZone) {
    var offset = timeZone.offsetFromTimestamp(uts);
    return new Moment({uts + offset, offset, locale, timeZone});
}

function computeOffset(lts, timeZone, flags) {
    // TODO: Flags are being ignored. Take them into account some day

    var of1 = timezone.offsetFromTimestamp(lts) // we treat local timestamp as unix to get
                                                // a ballbpark estimate
    var of2 = timezone.offsetFromTimestamp(lts - of1) // adjust local by probable offset
    if (of1 == of2) {
        // (lts, of1) is valid, but could be ambigous (second)
        of3 = timezone.offsetFromTimestamp(lts - of1 - 6 * 60 * 60 * 1000); // subtract 6h to see if
                                                                            // we're near DST
        if (of1 === of3) {
            return [lts, of1];
        } else if (timezone.offsetFromTimestamp(lts - of3) === of3) {
            // ambiguous, variants are [lts, of3], [lts, of1], of3 being
            // the previous
            return [lts, of3];
        } else {
            // there was DST shortly before [lts, of1], but it fully passed
            return [lts, of1];
        }
    } else {
        // we try a second time, this could happen around invalid time
        var of3 = timezone.offsetFromTimestamp(lts - of2);
        if (of3 === of2) {
            return [lts, of2]
        } else {
            // invalid time!
            if (of2 > of3) {
                var tmp = of2; of2 = of3; of3 = tmp;
            }
            var dstGap = of3 - of2;
            if (timezone.offsetFromTimestamp(lts + dstGap - of3) == of3) {
                return [lts + dstGap, of3];
            } else {
                throw new Error("should never happen (test)");
            }
        }
    }
}

export function createCollect (input, format, locale, strict, tz) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    // c._isAMomentObject = true;
    c._tz = tz;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}
