import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match3, match1to3 } from "../parse/regex";
import { daysInYear } from "./year";
import { createUTCDate } from "../create/date-from-array";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";

// FORMATTING

addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");

// ALIASES

addUnitAlias("dayOfYear", "DDD");

// PARSING

addRegexToken("DDD",  match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
export function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
    var d = createUTCDate(year, 0, 1).getUTCDay();
    var daysToAdd;
    var dayOfYear;

    d = d === 0 ? 7 : d;
    weekday = weekday != null ? weekday : firstDayOfWeek;
    daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
    dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

    return {
        year      : dayOfYear > 0 ? year      : year - 1,
        dayOfYear : dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
    };
}

// MOMENTS

export function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}
