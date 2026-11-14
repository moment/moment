import { hooks } from '../utils/hooks';
import { createDate, createUTCDate } from './date-from-array';
import { daysInYear } from '../units/year';
import {
    weekOfYearFromDate,
    weeksInYear,
    dayOfYearFromWeeks,
} from '../units/week-calendar-utils';
import {
    YEAR,
    MONTH,
    DATE,
    HOUR,
    MINUTE,
    SECOND,
    MILLISECOND,
} from '../units/constants';
import { createLocal } from './local';
import defaults from '../utils/defaults';
import getParsingFlags from './parsing-flags';

function currentDateArray(config, now, forWeek) {
    var hadWeekContext = Object.prototype.hasOwnProperty.call(
            config,
            '_isDefaultDatePartsForWeek'
        ),
        weekContext = config._isDefaultDatePartsForWeek;

    // hooks is actually the exported moment object
    config._isDefaultDatePartsForWeek = !!forWeek;
    try {
        return hooks._getDefaultDateParts(config, now, forWeek);
    } finally {
        if (hadWeekContext) {
            config._isDefaultDatePartsForWeek = weekContext;
        } else {
            delete config._isDefaultDatePartsForWeek;
        }
    }
}

function currentDateNow(config) {
    var now = config._defaultDatePartsNow;

    if (!now) {
        return hooks.now();
    }
    if (!now.hasValue) {
        now.value = hooks.now();
        now.hasValue = true;
    }
    return now.value;
}

// Internal hook for extensions that supply omitted calendar fields.
function getDefaultDateParts(config, now, forWeek) {
    var useWeekDefaults = forWeek || config._isDefaultDatePartsForWeek,
        nowValue = useWeekDefaults ? createLocal(now) : new Date(now);
    if (useWeekDefaults) {
        return [nowValue.year(), nowValue.month(), nowValue.date()];
    }
    if (config._useUTC) {
        return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate(),
        ];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

hooks._getDefaultDateParts = getDefaultDateParts;

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
export function configFromArray(config) {
    var i,
        date,
        input = [],
        now,
        currentDate,
        expectedWeekday,
        yearToUse,
        dateIsDefaulted;

    if (config._d) {
        return;
    }

    if (
        config._a[YEAR] == null ||
        config._a[MONTH] == null ||
        config._a[DATE] == null
    ) {
        now = currentDateNow(config);
        currentDate = currentDateArray(config, now);
    }

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config, currentDateArray(config, now, true));
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse =
            config._a[YEAR] != null ? config._a[YEAR] : currentDate[YEAR];

        if (
            config._dayOfYear > daysInYear(yearToUse) ||
            config._dayOfYear === 0
        ) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    dateIsDefaulted =
        config._a[YEAR] == null ||
        config._a[MONTH] == null ||
        config._a[DATE] == null;

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] =
            config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (
        config._a[HOUR] === 24 &&
        config._a[MINUTE] === 0 &&
        config._a[SECOND] === 0 &&
        config._a[MILLISECOND] === 0
    ) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(
        null,
        input
    );
    expectedWeekday = config._useUTC
        ? config._d.getUTCDay()
        : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (
        config._w &&
        typeof config._w.d !== 'undefined' &&
        !dateIsDefaulted &&
        config._w.d !== expectedWeekday
    ) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config, currentDate) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(
            w.GG,
            config._a[YEAR],
            weekOfYearFromDate(
                currentDate[YEAR],
                currentDate[MONTH],
                currentDate[DATE],
                1,
                4
            ).year
        );
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        curWeek = weekOfYearFromDate(
            currentDate[YEAR],
            currentDate[MONTH],
            currentDate[DATE],
            dow,
            doy
        );

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from beginning of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to beginning of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}
