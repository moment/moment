export var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
};

import isFunction from '../utils/is-function';

export function relativeTimeWithoutPostformat(
    number,
    withoutSuffix,
    string,
    isFuture
) {
    var output = this._relativeTime[string];
    return isFunction(output)
        ? output(number, withoutSuffix, string, isFuture)
        : output.replace(/%d/i, number);
}

export function relativeTime(number, withoutSuffix, string, isFuture) {
    return this.postformat(
        relativeTimeWithoutPostformat.call(
            this,
            number,
            withoutSuffix,
            string,
            isFuture
        )
    );
}

export function pastFutureWithoutPostformat(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

export function pastFuture(diff, output) {
    return this.postformat(
        pastFutureWithoutPostformat.call(this, diff, output)
    );
}
