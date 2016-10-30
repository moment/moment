import { normalizeUnits } from '../units/aliases';

export function startOf (units) {
    units = normalizeUnits(units);

    var m = this;
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            m = m.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            m = m.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            m = m.hours(0);
            /* falls through */
        case 'hour':
            m = m.minutes(0);
            /* falls through */
        case 'minute':
            m = m.seconds(0);
            /* falls through */
        case 'second':
            m = m.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        m = m.weekday(0);
    }
    if (units === 'isoWeek') {
        m = m.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        m = m.month(Math.floor(m.month() / 3) * 3);
    }

    return m;
}

export function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}
