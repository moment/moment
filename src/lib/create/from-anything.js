import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import isUndefined from '../utils/is-undefined';
import isNumber from '../utils/is-number';
import isDate from '../utils/is-date';
import map from '../utils/map';
import extend from '../utils/extend';
import { Moment, isMoment } from '../moment/constructor';
import { getLocale } from '../locale/locales';
import { hooks } from '../utils/hooks';
import checkOverflow from './check-overflow';
import { isValid } from './valid';
import { default as getParsingFlags, defaultParsingFlags } from './parsing-flags';
import { invalidTimeZone } from '../timezone/invalid';

import { configFromStringAndArray }  from './from-string-and-array';
import { configFromStringAndFormat } from './from-string-and-format';
import { configFromString }          from './from-string';
import { configFromArray }           from './from-array';
import { configFromObject }          from './from-object';

var updateInProgress = false;

export function createInvalid(flags, config) {
    config = extend(
        {_i: null, _f: null, _strict: null, _locale: getLocale(null), _tz: invalidTimeZone},
        config != null ? config : {});
    flags = extend(defaultParsingFlags(),
        {input: config._i, format: config._f, strict: config._strict},
        flags ? flags : {userInvalidated: true});
    return new Moment({_pf: flags, _locale: config._locale, _tz: config._tz, _d: new Date(NaN), _isValid: false});
}

function createFromConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true}, config);
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isUndefined(input) && !format) {
        config._d = hooks.now();
        config._useUTC = true;
    } else if (isMoment(input) || isDate(input)) {
        config._d = input.valueOf();
        config._useUTC = true;
    } else if (isNumber(input) && !format) {
        config._d = input;
        config._useUTC = true;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else {
        hooks.createFromInputFallback(config);
    }
    // TODO: Move invalid tz handling from quick create here, get a saner PF
    // logic for all parsing paths
    if (!isValid(config)) {
        return createInvalid(getParsingFlags(config), config);
    }

    // TODO: parsing flags fail ...
    if (config._pf.format == null) {
        config._pf.format = config._f;
    }
    if (config._useUTC) {
        return quickCreateUTC(+config._d, config._locale, config._tz, config._pf);
    } else {
        return quickCreateLocal(+config._d, config._locale, config._tz, config._pf);
    }

    // Prevent infinite loop in case updateOffset creates new moment objects.
    // if (updateInProgress === false) {
    //     updateInProgress = true;
    //     res = hooks.updateOffset(res);
    //     updateInProgress = false;
    // }

    // if (res._nextDay) {
    //     // Adding is smart enough around DST
    //     res = res.add(1, 'd');
    //     res._nextDay = undefined;
    // }

    // return res;
}

export function prepareConfig (config) {
}

function configFromInput(config) {
    var input = config._i;
}

export function quickCreateLocal(lts, locale, timeZone, pf) {
    var localTsOffset = computeOffset(lts, timeZone);
    return new Moment({_ts: localTsOffset[0], _offset: localTsOffset[1], _locale: locale, _tz: timeZone, _pf: pf});
}

export function quickCreateUTC(uts, locale, timeZone, pf) {
    var offset = timeZone.offsetFromTimestamp(uts);
    return new Moment({_ts: uts + offset, _offset: offset, _locale: locale, _tz: timeZone, _pf: pf});
}

function computeOffset(lts, timeZone) {
    // we treat local timestamp as unix to get a ballbpark estimate
    var of1 = timeZone.offsetFromTimestamp(lts),
        // adjust local by probable offset
        of2 = timeZone.offsetFromTimestamp(lts - of1),
        of3;
    if (of1 === of2) {
        // (lts, of1) is valid, but could be ambigous (second)

        // subtract 6h to see if we're near DST
        of3 = timeZone.offsetFromTimestamp(lts - of1 - 6 * 60 * 60 * 1000);
        if (of1 === of3) {
            // not near DST, its all good
            return [lts, of1];
        } else if (timeZone.offsetFromTimestamp(lts - of3) === of3) {
            // ambiguous, variants are [lts, of3], [lts, of1], of3 being
            // the first
            return [lts, of3];
        } else {
            // there was DST shortly before [lts, of1], but it fully passed
            return [lts, of1];
        }
    } else {
        // we try a second time, this could happen around invalid time
        of3 = timeZone.offsetFromTimestamp(lts - of2);
        if (of3 === of2) {
            return [lts, of2];
        } else {
            // invalid time!
            if (of2 > of3) {
                var tmp = of2; of2 = of3; of3 = tmp;
            }
            var dstGap = of3 - of2;
            if (timeZone.offsetFromTimestamp(lts + dstGap - of3) === of3) {
                return [lts + dstGap, of3];
            } else {
                throw new Error('should never happen (test)');
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
