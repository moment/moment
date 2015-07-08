import absFloor from '../utils/abs-floor';
import { createUTCDate } from '../create/date-from-array';

export function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years = 0, monthDaySplit, sign;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absFloor(yearsToDays(months / 12) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // Accurately convert days to years, assume start from year 0.
    years = absFloor(daysToYears(days));
    days -= absFloor(yearsToDays(years));

    // Use Jan 1st 1970 as anchor.
    if (days !== 0) {
        monthDaySplit = createUTCDate(1970, 0, Math.abs(days) + 1);
        sign = days < 0 ? -1 : 1;
        months += sign * monthDaySplit.getUTCMonth();
        days = sign * (monthDaySplit.getUTCDate() - 1);
    }

    // 12 months -> 1 year
    years  += absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

export function daysToYears (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
}

export function yearsToDays (years) {
    // years * 365 + absFloor(years / 4) -
    //     absFloor(years / 100) + absFloor(years / 400);
    return years * 146097 / 400;
}
