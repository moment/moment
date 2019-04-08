import absFloor from '../utils/abs-floor';
import { cloneWithOffset } from '../units/offset';
import { normalizeUnits } from '../units/aliases';
import { createDuration } from '../duration/create';
import absRound from '../utils/abs-round';
import { get } from './get-set';
import { daysInMonth } from '../units/month';

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

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function isEndOfMonth(mom) {
    return mom.date() === daysInMonth(mom.year(), mom.month());
}

function addWithEndOfMonth(a, b, val) {
    if (!a.isValid()) {
        return;
    }
    var dur = createDuration(val, 'months');
    var months = absRound(dur._months);
    var dayInMonth = a.date();
    var newMonth = get(a, 'Month') + months;
    var maxDays = daysInMonth(a.year(), newMonth);
    const utcChecked = a._isUTC ? 'UTC' : '';
    const getUtcChecked = 'get' + utcChecked;
    const setUtcChecked = 'set' + utcChecked;
    // if End of Month, should ignore time difference
    if (dayInMonth > maxDays || isEndOfMonth(a)) {
        dayInMonth = maxDays;
        const h = b._d[getUtcChecked + 'Hours']();
        const m = b._d[getUtcChecked + 'Minutes']();
        const s = b._d[getUtcChecked + 'Seconds']();
        const ms = b._d[getUtcChecked + 'Milliseconds']();
        a._d[setUtcChecked + 'Hours'](h, m, s, ms);
    }
    a._d[setUtcChecked + 'Month'](newMonth, dayInMonth);
    return a;
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = addWithEndOfMonth(a.clone(), b, wholeMonthDiff),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = addWithEndOfMonth(a.clone(), b, wholeMonthDiff - 1);
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = addWithEndOfMonth(a.clone(), b, wholeMonthDiff + 1);
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}
