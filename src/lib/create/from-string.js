import { configFromStringAndFormat } from './from-string-and-format';
import { hooks } from '../utils/hooks';
import moment from '../moment';     // Needed for RFC2822 validation of weekday
import { deprecate } from '../utils/deprecate';
import getParsingFlags from './parsing-flags';

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
export function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// rfc 2822 regex
//  [Group 1: Day (optional)]
//  [Group 2: Date and Time]
//  [Group 3: Seconds (optional)]
//  [Group 4: Timezone|Time offset]
//----
// Group 1: "Day[,] "
//  Day= Day of Week ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')
// Group 2: "dD Mon [CC]YY "
//  dD= Day of Month (1-2-digits) - Strict: 1 to 31 with optional leading zero
//  Mon= Month of Year ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
//  CC: Century [optional] (2-digits) - Strict: 19 to 99
//  YY: Year in Century (2-digits)
// Group 3: "HH:MM"
//  HH: Hour of Day (2-digits) - Strict: 00 to 23
//  MM: Minute in Hour (2-digits) - Strict: 00 to 59
// Group 4: ":SS"
//  SS: Seconds in Minute [optional] (2-digits) - Strict: 00 to 60
// Group 5: " (TZ|MIL|TO)"
//  TZ: Timezone ('UT','GMT','EST','EDT','CST','CDT','MST','MDT','PST','PDT')
//  MIL: Military timezone code (A-Z excluding J)
//  TO: Time Offset (+|- 4-digits) - Strict: 0000 to 9959 (as per spec)
//====
// Regular Expressions
//  basicRfcRegex: Simplified (easier to test) pattern consistent with the IETF RFC2822 specification.
//  detailedRfcRegex: Enhanced pattern with greater built-in validation in excess of the specification.
/*
    var detailedRfcRegex = /^
        ((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?
        ((?:0?[1-9]|[1-2]?\d|3[01])\s
            (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:(?:19|[2-9]\d)?\d\d\s))
        ((?:(?:2[0-3]|[0-1]\d)):[0-5]\d)
        (\:(?:60|[0-5]\d))?
        (\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Z]|(?:[+-](?:1[012]|0\d)[03]0)))
    $/;
*/
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
export function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var Military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO Confirm the given day-of-week is consistent with the day-of-month-year
        //  NB: Needs an instance of moment, created from the date element of the input string.
        /*
        if (match[1]) { // day of week given
            console.log('[' + match[1].substr(0,3) + ']', moment(match[2], dateFormat).format('ddd'));
            var momentDay = moment(match[2], dateFormat).format('ddd');

            if (match[1].substr(0,3) !== momentDay) {
                config._isValid = false;
                return;
            }
        }
        */
        getParsingFlags(config).rfc2822 = true;

        switch (match[5].length) {
            case 2: // Military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = Military.indexOf(match[5][1]) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                timezone += '00';
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
export function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;

        configFromRFC2822(config);
        if (config._isValid === false) {
            getParsingFlags(config).iso = false;
            delete config._isValid;
            hooks.createFromInputFallback(config);
        }
    }
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);
