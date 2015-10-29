import { daysInYear } from './year';
import { createLocal } from '../create/local';
import { createUTCDate } from '../create/date-from-array';

//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
export function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
    var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear, resYear, resDayOfYear;
    if (d < firstDayOfWeek) {
        d += 7;
    }

    weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

    dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

// firstDayOfWeek       0 = sun, 6 = sat
//                      the day of the week that starts the week
//                      (usually sunday or monday)
// firstDayOfWeekOfYear 0 = sun, 6 = sat
//                      the first week is the week that contains the first
//                      of this day of the week
//                      (eg. ISO weeks use thursday (4))
export function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
    var end = firstDayOfWeekOfYear - firstDayOfWeek,
        daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
        adjustedMoment;


    if (daysToDayOfWeek > end) {
        daysToDayOfWeek -= 7;
    }

    if (daysToDayOfWeek < end - 7) {
        daysToDayOfWeek += 7;
    }

    adjustedMoment = createLocal(mom).add(daysToDayOfWeek, 'd');
    return {
        week: Math.ceil(adjustedMoment.dayOfYear() / 7),
        year: adjustedMoment.year()
    };
}

// HELPERS

export function weeksInYear(year, dow, doy) {
    return weekOfYear(createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
}

