import { normalizeUnits } from '../units/aliases';
import { hooks } from '../utils/hooks';

var MS_PER_SECOND = 1000;
var MS_PER_MINUTE = 60 * MS_PER_SECOND;
var MS_PER_HOUR = 60 * MS_PER_MINUTE;
var MS_PER_24_HOUR_DAY = 24 * MS_PER_HOUR;
var MS_PER_400_YEARS = (365 * 400 + 97) * MS_PER_24_HOUR_DAY;

// actual modulo - handles negative numbers (for dates before 1970):
function mod(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
}

function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (0 <= y && y <= 99) {
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
        return new Date(y, m, d).valueOf();
    }
}

function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (0 <= y && y <= 99) {
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
        return Date.UTC(y, m, d);
    }
}

export function startOf (units) {
    var time;
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
        return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
        case 'year':
            time = startOfDate(this.year(), 0, 1);
            break;
        case 'quarter':
            time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
            break;
        case 'month':
            time = startOfDate(this.year(), this.month(), 1);
            break;
        case 'week':
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
            break;
        case 'isoWeek':
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
        case 'day':
        case 'date':
            time = startOfDate(this.year(), this.month(), this.date());
            break;
        case 'hour':
            time = this._d.valueOf();
            time = (time - mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR));
            break;
        case 'minute':
            time = this._d.valueOf();
            this._d.setTime(time - mod(time, MS_PER_MINUTE));
            return this;
        case 'second':
            time = this._d.valueOf();
            this._d.setTime(time - mod(time, MS_PER_SECOND));
            return this;
    }

    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
}

export function endOf (units) {
    var time;
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
        return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
        case 'year':
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
        case 'quarter':
            time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
        case 'month':
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
        case 'week':
            time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
        case 'isoWeek':
            time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
        case 'day':
        case 'date':
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
        case 'hour':
            time = this._d.valueOf();
            time = (time - mod(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) + MS_PER_HOUR - 1);
            break;
        case 'minute':
            time = this._d.valueOf();
            this._d.setTime(time - mod(time, MS_PER_MINUTE) + MS_PER_MINUTE - 1);
            return this;
        case 'second':
            time = this._d.valueOf();
            this._d.setTime(time - mod(time, MS_PER_SECOND) + MS_PER_SECOND - 1);
            return this;
    }

    this._d.setTime(time);
    hooks.updateOffset(this, true);
    return this;
}
