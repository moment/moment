import { daysToMonths, monthsToDays } from './bubble';
import { normalizeUnits } from '../units/aliases';
import toInt from '../utils/to-int';
import fpMath from '../utils/fp-math';

export function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days = this._days;
    var months = this._months;
    var milliseconds = this._milliseconds;
    var daysFromMonths = monthsToDays(months);
    // if there are fractional months, keep fractional days
    // if months is an integer, round daysFromMonths to an integer
    if (months % 1 === 0) {
        daysFromMonths = Math.round(daysFromMonths);
    }
    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days = fpMath(days, '+', fpMath(milliseconds, '/', 864e5));
        // always keep fractional months
        months = fpMath(months, '+', daysToMonths(days));
        if (units === 'year') {
            return fpMath(months, '/', 12);
        } else {
            return months;
        }
    } else {
        days = fpMath(days, '+', daysFromMonths);
        switch (units) {
            case 'week'   : return fpMath(fpMath(days, '/', 7),         '+', fpMath(milliseconds, '/', 6048e5));
            case 'day'    : return fpMath(days,                         '+', fpMath(milliseconds, '/', 864e5));
            case 'hour'   : return fpMath(fpMath(days, '*', 24),        '+', fpMath(milliseconds, '/', 36e5));
            case 'minute' : return fpMath(fpMath(days, '*', 1440),      '+', fpMath(milliseconds, '/', 6e4));
            case 'second' : return fpMath(fpMath(days, '*', 86400),     '+', fpMath(milliseconds, '/', 1000));
            case 'millisecond': return fpMath(fpMath(days, '*', 864e5), '+', milliseconds);
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
export function valueOf () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

export var asMilliseconds = makeAs('ms');
export var asSeconds      = makeAs('s');
export var asMinutes      = makeAs('m');
export var asHours        = makeAs('h');
export var asDays         = makeAs('d');
export var asWeeks        = makeAs('w');
export var asMonths       = makeAs('M');
export var asYears        = makeAs('y');
