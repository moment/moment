import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import isNumber from '../utils/is-number';
import isDate from '../utils/is-date';
import map from '../utils/map';
import { createInvalid } from './valid';
import { Moment, isMoment } from '../moment/constructor';
import { getLocale } from '../locale/locales';
import { hooks } from '../utils/hooks';
import checkOverflow from './check-overflow';
import { isValid } from './valid';
import { deprecate } from '../utils/deprecate';

var fromStringAndArray, fromStringAndFormat, fromString;

// import { configFromStringAndArray }  from './from-string-and-array';
// import { configFromStringAndFormat } from './from-string-and-format';
// import { configFromString }          from './from-string';
import { configFromArray }           from './from-array';
import { configFromObject }          from './from-object';


export var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
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

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format) && fromStringAndArray) {
        fromStringAndArray(config);
    } else if (format && fromStringAndFormat) {
        fromStringAndFormat(config);
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
    if (input === undefined) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string' && fromString) {
        fromString(config);
    } else if (isArray(input) && configFromArray) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (typeof(input) === 'object') {
        configFromObject(config);
    } else if (isNumber(input)) {
        config._d = new Date(input);
    } else {
        var parsedString = extendedIsoRegex.exec(input);
        if (parsedString && parsedString[4]) {
            config._d = new Date(input);
        } else if (parsedString) {
            config._d = new Date(parsedString[1].replace(/-/g, '/') + ' ' + (parsedString[3] || '') + (config._useUTC ? ' UTC' : ''));
        } else {
           hooks.createFromInputFallback(config);
        }
    }
}

export function createLocalOrUTC (input, format, locale, strict, isUTC) {
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
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);