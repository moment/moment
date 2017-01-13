import { normalizeUnits } from '../units/aliases';

export function startOf (units) {
    var initialDate = this.date(),
        checkForDST = true,
        hour, clone;

    units = normalizeUnits(units);

    // in week/isoWeek operations, jump to noon to make sure that we do not hit DST bugs when
    // switching the weekday/isoWeekday and can collect a valid initialDate to use for comparison
    // after the time is adjusted
    if (units === 'week' || units === 'isoWeek') {
        this.hours(12);
    }

    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
            // quarters is a special case
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }
            /* falls through */
        case 'month':
            this.date(1);
            // for month/quarter/year changes, no DST can interfere so we do not check for it
            checkForDST = false;
            /* falls through */
        case 'week':
        case 'isoWeek':
            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
                initialDate = this.date();
            }
            if (units === 'isoWeek') {
                this.isoWeekday(1);
                initialDate = this.date();
            }
            /* falls through */
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // check if day of month changed when setting the time
    if (checkForDST && this.date() !== initialDate) {
        // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
        // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

        // depending on JS implementations, the time can jump 1day ahead or be in the past
        if (this.date() > initialDate) {
            this.date(initialDate);
        } else {
            // increment hour until cloned date == current date
            hour = 1;
            do {
                clone = this.clone().add(hour++, 'hour');
            } while (clone.date() < initialDate);

            this.date(initialDate);
            this.hours(clone.hours());
        }
    }

    return this;
}

export function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // in week/isoWeek operations, jump to noon to make sure that we do not hit DST bugs when
    // switching the weekday/isoWeekday
    if (units === 'week' || units === 'isoWeek') {
        this.hours(12);
    }

    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(11);
            /* falls through */
        case 'quarter':
            // quarters is a special case
            if (units === 'quarter') {
                this.month((Math.floor(this.month() / 3) * 3) + 2);
            }
            /* falls through */
        case 'month':
            this.date(this.month() === 1 ? (this.isLeapYear() ? 29 : 28) : ([0, 2, 4, 6, 7, 9, 11].indexOf(this.month()) === -1 ? 30 : 31));
            /* falls through */
        case 'week':
        case 'isoWeek':
            // weeks are a special case
            if (units === 'week') {
                this.weekday(6);
            }
            if (units === 'isoWeek') {
                this.isoWeekday(7);
            }
            /* falls through */
        case 'day':
        case 'date':
            this.hours(23);
            /* falls through */
        case 'hour':
            this.minutes(59);
            /* falls through */
        case 'minute':
            this.seconds(59);
            /* falls through */
        case 'second':
            this.milliseconds(999);
    }

    return this;
}
