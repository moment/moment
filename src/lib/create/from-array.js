import { hooks } from '../utils/hooks';
import { createUTCDate } from './date-from-array';
import { quickCreateUTC } from './from-anything';
import { daysInYear } from '../units/year';
import { weekOfYear, weeksInYear, dayOfYearFromWeeks } from '../units/week-calendar-utils';
import { YEAR, MONTH, DATE, HOUR, MINUTE, SECOND, MILLISECOND } from '../units/constants';
import { fixedTimeZoneForOffset } from '../timezone/fixed-offset';
import { parsedTimeZone } from '../timezone/parsed';
import defaults from '../utils/defaults';
import getParsingFlags from './parsing-flags';
import checkOverflow from './check-overflow';

// TODO(Iskren): Call only if needed
// TODO(Iskren): tz.isValid -- does it make sense?
function currentDateArray(config, tz) {
    var now = hooks.now(),
        nowValue = new Date(now + (tz.isValid() ? tz.offsetFromTimestamp(now) : 0));
    return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
export function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse, tz = config._tz;

    if (config._d) {
        return;
    }

    // TODO: Implement ignoreOffset config flag
    if (config._tzm != null) {
        tz = fixedTimeZoneForOffset(config._tzm);
    }

    currentDate = currentDateArray(config, tz);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config, tz);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

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
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = createUTCDate.apply(null, input);
    // TODO: Handle ignoreOffset flag
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        config._useUTC = true;
    }
    if (config._tz === parsedTimeZone) {
        config._tz = fixedTimeZoneForOffset(isNaN(config._tzm) ? 0 : config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
    checkOverflow(config);
}

function dayOfYearFromWeekInfo(config, tz) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, now;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: Compute only if required.
        now = quickCreateUTC(hooks.now(), config._locale, tz);
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(now, 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        // TODO: Compute only if required
        now = quickCreateUTC(hooks.now(), config._locale, tz);
        var curWeek = weekOfYear(now, dow, doy);

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
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
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
