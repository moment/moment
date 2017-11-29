import { normalizeUnits } from '../units/aliases';
import { hooks } from '../utils/hooks';

var MS_PER_SECOND = 1000;
var MS_PER_MINUTE = 60 * MS_PER_SECOND;
var MS_PER_HOUR = 60 * MS_PER_MINUTE;
var MS_PER_24_HOUR_DAY = 24 * MS_PER_HOUR;

// actual modulo - handles negative numbers (for dates before 1970):
function mod(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
}

export function startOf (units) {
    var time;
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            if (this.isValid()) {
                if (this._isUTC) {
                    time = this._d.valueOf();
                    this._d.setTime(time - mod(time, MS_PER_24_HOUR_DAY));
                } else {
                    this._d.setTime(new Date(this.year(), this.month(), this.date()).valueOf());
                }
                hooks.updateOffset(this, true);
            }
            break;
        case 'hour':
            if (this.isValid()) {
                var offset = this._isUTC ? 0 : this.utcOffset();
                time = this._d.valueOf();
                this._d.setTime(time - mod(time + offset * MS_PER_MINUTE, MS_PER_HOUR));
                hooks.updateOffset(this, true);
            }
            break;
        case 'minute':
            if (this.isValid()) {
                time = this._d.valueOf();
                this._d.setTime(time - mod(time, MS_PER_MINUTE));
            }
            break;
        case 'second':
            if (this.isValid()) {
                time = this._d.valueOf();
                this._d.setTime(time - mod(time, MS_PER_SECOND));
            }
            break;
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
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

    if (units === 'day') {
        if (this.isValid()) {
            if (this._isUTC) {
                var time = this._d.valueOf();
                this._d.setTime(time - mod(time, MS_PER_24_HOUR_DAY) + MS_PER_24_HOUR_DAY - 1);
            } else {
                this._d.setTime(new Date(this.year(), this.month(), this.date() + 1).valueOf() - 1);
            }
            hooks.updateOffset(this, true);
        }
        return this;
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}
