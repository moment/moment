import hasOwnProp from '../utils/has-own-prop';

var priorities = {
    date: 9,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    dayOfYear: 4,
    hour: 13,
    millisecond: 16,
    minute: 14,
    month: 8,
    quarter: 7,
    second: 15,
    weekYear: 1,
    isoWeekYear: 1,
    week: 5,
    isoWeek: 5,
    year: 1
}

/*
var priorities = {};

export function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}


//day-of-month.js
addUnitPriority('date', 9);
//day-of-week.js
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);
//day-of-year.js
addUnitPriority('dayOfYear', 4);
//hour.js
addUnitPriority('hour', 13);
//millisecond.js
addUnitPriority('millisecond', 16);
//minute.js
addUnitPriority('minute', 14);
//month.js
addUnitPriority('month', 8);
//quarter.js
addUnitPriority('quarter', 7);
//second.js
addUnitPriority('second', 15);
//week-year.js
addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);
//week.js
addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);
//year.js
addUnitPriority('year', 1);


*/

export function getPrioritizedUnits(unitsObj) {
    var units = [],
        u;
    for (u in unitsObj) {
        if (hasOwnProp(unitsObj, u)) {
            units.push({ unit: u, priority: priorities[u] });
        }
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}
