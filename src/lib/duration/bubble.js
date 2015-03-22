import absFloor from '../utils/abs-floor';

export function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years = 0;

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

    // 30 days to a month
    // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
    months += absFloor(days / 30);
    days   %= 30;

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
