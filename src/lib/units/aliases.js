import hasOwnProp from '../utils/has-own-prop';

var aliases = 
{
    D: 'date',
    dates: 'date',
    date: 'date',
    d: 'day',
    days: 'day',
    day: 'day',
    e: 'weekday',
    weekdays: 'weekday',
    weekday: 'weekday',
    E: 'isoWeekday',
    isoweekdays: 'isoWeekday',
    isoweekday: 'isoWeekday',
    DDD: 'dayOfYear',
    dayofyears: 'dayOfYear',
    dayofyear: 'dayOfYear',
    h: 'hour',
    hours: 'hour',
    hour: 'hour',
    ms: 'millisecond',
    milliseconds: 'millisecond',
    millisecond: 'millisecond',
    m: 'minute',
    minutes: 'minute',
    minute: 'minute',
    M: 'month',
    months: 'month',
    month: 'month',
    Q: 'quarter',
    quarters: 'quarter',
    quarter: 'quarter',
    s: 'second',
    seconds: 'second',
    second: 'second',
    gg: 'weekYear',
    weekyears: 'weekYear',
    weekyear: 'weekYear',
    GG: 'isoWeekYear',
    isoweekyears: 'isoWeekYear',
    isoweekyear: 'isoWeekYear',
    w: 'week',
    weeks: 'week',
    week: 'week',
    W: 'isoWeek',
    isoweeks: 'isoWeek',
    isoweek: 'isoWeek',
    y: 'year',
    years: 'year',
    year: 'year'
  }

/*

var aliases = {};

export function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

//day-of-month.js
addUnitAlias('date', 'D');
//day-of-week.js
addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');
//day-of-year.js
addUnitAlias('dayOfYear', 'DDD');
//hour.js
addUnitAlias('hour', 'h');
//millisecond.js
addUnitAlias('millisecond', 'ms');
//minute.js
addUnitAlias('minute', 'm');
//month.js
addUnitAlias('month', 'M');
//quarter.js
addUnitAlias('quarter', 'Q');
//second.js
addUnitAlias('second', 's');
//week-year.js
addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');
//week.js
addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');
//year.js
addUnitAlias('year', 'y');

*/
export function normalizeUnits(units) {
    return typeof units === 'string'
        ? aliases[units] || aliases[units.toLowerCase()]
        : undefined;
}

export function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}
