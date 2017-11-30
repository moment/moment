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
    if (units === undefined || units === 'millisecond' || !this.isValid()) {
        return this;
    }

    switch (units) {
        case 'year':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), 0) :
                    new Date(this.year(), 0).valueOf())
            );
            break;
        case 'quarter':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month() - this.month() % 3) :
                    new Date(this.year(), this.month() - this.month() % 3).valueOf())
            );
            break;
        case 'month':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month()) :
                    new Date(this.year(), this.month()).valueOf())
            );
            break;
        case 'week':
            // start of week should be: this.date() - this.weekday():
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month(), this.date() - this.weekday()) :
                    new Date(this.year(), this.month(), this.date() - this.weekday()).valueOf())
            );
            break;
        case 'isoWeek':
            // start of iso week should be: this.date() - (this.isoWeekday - 1):
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month(), this.date() - (this.isoWeekday() - 1)) :
                    new Date(this.year(), this.month(), this.date() - (this.isoWeekday() - 1)).valueOf())
            );
            break;
        case 'day':
        case 'date':
            time = this._d.valueOf();
            time = (
                (this._isUTC ?
                    time - mod(time, MS_PER_24_HOUR_DAY) :
                    new Date(this.year(), this.month(), this.date()).valueOf())
            );
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

    switch (units) {
        case 'year':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year() + 1, 0) :
                    new Date(this.year() + 1, 0).valueOf()) - 1
            );
            break;
        case 'quarter':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), 3 + this.month() - this.month() % 3) :
                    new Date(this.year(), 3 + this.month() - this.month() % 3).valueOf()) - 1
            );
            break;
        case 'month':
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), 1 + this.month()) :
                    new Date(this.year(), 1 + this.month()).valueOf()) - 1
            );
            break;
        case 'week':
            // start of week should be: this.date() - this.weekday(), so end of week would be: this.date() - this.weekday() + 7
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month(), this.date() + 7 - this.weekday()) :
                    new Date(this.year(), this.month(), this.date() + 7 - this.weekday()).valueOf()) - 1
            );
            break;
        case 'isoWeek':
            // start of iso week should be: this.date() - (this.isoWeekday - 1), so end would be: this.date() - (this.isoWeekday() - 1) + 7
            time = (
                (this._isUTC ?
                    Date.UTC(this.year(), this.month(), this.date() + 7 - (this.isoWeekday() - 1)) :
                    new Date(this.year(), this.month(), this.date() + 7 - (this.isoWeekday() - 1)).valueOf()) - 1
            );
            break;
        case 'day':
        case 'date':
            time = this._d.valueOf();
            time = (
                (this._isUTC ?
                    time - mod(time, MS_PER_24_HOUR_DAY) + MS_PER_24_HOUR_DAY :
                    new Date(this.year(), this.month(), this.date() + 1).valueOf()) - 1
            );
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
