import absFloor from '../utils/abs-floor';
import absCeil from '../utils/abs-ceil';
import { createUTCDate } from '../create/date-from-array';

export function bubble() {
    var milliseconds = this._milliseconds;
    var days;
    var months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds = milliseconds / 1000;
    data.seconds = seconds % 60;

    minutes = seconds / 60;
    data.minutes = minutes % 60;

    hours = minutes / 60;
    data.hours = hours % 24;

    days = hours / 24;
    // convert days to months
    months = daysToMonths(days);

    data.days = days - monthsToDays(months);

    // 12 months -> 1 year
    data.years = months / 12;
    data.months = months % 12;

    return this;
}

export function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

export function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}
