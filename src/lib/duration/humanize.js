import { createDuration } from './create';

var round = Math.round;

var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to week/month
    w : 4,          // weeks to months
    M : 11          // months to year
};

var includeWeeks = false;

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime (posNegDuration, withoutSuffix, locale) {
    var duration   = createDuration(posNegDuration).abs();
    var seconds    = round(duration.as('s'));
    var minutes    = round(duration.as('m'));
    var hours      = round(duration.as('h'));
    var days       = round(duration.as('d'));
    var weeks      = round(duration.as('w'));
    var months     = round(duration.as('M'));
    var years      = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days];

    if (includeWeeks) {
        a = a || weeks <= 1             && ['w']         ||
                 weeks < thresholds.w   && ['ww', weeks];
    }
    a = a || months  <= 1             && ['M']           ||
             months  < thresholds.M   && ['MM', months]  ||
             years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
export function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
export function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}
export function getSetRelativeTimeIncludeWeeks(setIncludeWeeks) {
    if (setIncludeWeeks === undefined) {
        return includeWeeks;
    }
    if (typeof setIncludeWeeks !== 'boolean') {
        return false;
    }
    includeWeeks = setIncludeWeeks;
    if (includeWeeks === true) {
        thresholds.w = 4;
        thresholds.d = 7;
    }
    if (includeWeeks === false) {
        delete thresholds.w;
        thresholds.d = 26;
    }
    return true;
}
export function humanize (withSuffix, includeWeeks) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}
