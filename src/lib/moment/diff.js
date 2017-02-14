import absFloor from '../utils/abs-floor';
import { cloneWithOffset } from '../units/offset';
import { normalizeUnits } from '../units/aliases';

export function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    if (units === 'all') {
        return allUnitsDiff(this,that);
    }

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

function allUnitsDiff(after,before) {
    var totalMonths = absFloor(monthDiff(after,before)),
        years, months, days, hours,
        minutes, seconds, milliseconds,
        nd;

    years   = absFloor(totalMonths / 12);
    months  = totalMonths - (years * 12);
    //reduce difference between dates by totalMonths (years & months)
    nd = before.clone().add(totalMonths, 'months');
    days    = (after - nd) / 864e5; // days / ms in a day
    //extract previous unit and convert decimal
    hours   = (days % 1) * 24;
    minutes = (hours % 1) * 60;
    seconds = (minutes % 1) * 60;
    milliseconds = (seconds % 1) * 1000;

    return {
        years:   absFloor(years),
        months:  absFloor(months),
        days:    absFloor(days),
        hours:   absFloor(hours),
        minutes: absFloor(minutes),
        seconds: absFloor(seconds),
        milliseconds: Math.round(milliseconds)
    };
}
