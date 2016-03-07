import { isMoment } from './constructor';
import { normalizeUnits } from '../units/aliases';
import { createLocal } from '../create/local';
import isUndefined from '../utils/is-undefined';

export function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return +this > +localInput;
    } else {
        return +localInput < +this.clone().startOf(units);
    }
}

export function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return +this < +localInput;
    } else {
        return +this.clone().endOf(units) < +localInput;
    }
}

export function isBetween(from, to, options) {
    var units;
    var inclusive;
    if (typeof options === 'object') {
        units = !(isUndefined(options['units'])) ? options['units'] : 'millisecond';
        inclusive = !(isUndefined(options['inclusive'])) ? options['inclusive'] : '()';
    } else {
        units = options;
        inclusive = arguments[3];
    }
    if (inclusive) {
        switch (inclusive) {
            case '()':
                return this.isAfter(from, units) && this.isBefore(to, units);
            case '(]':
                return this.isAfter(from, units) && this.isSameOrBefore(to, units);
            case '[)':
                return this.isSameOrAfter(from, units) && this.isBefore(to, units);
            case '[]':
                return !(this.isBefore(from, units) || this.isAfter(to, units));
            default:
                throw new Error("Inclusive option should be one of '()','[)','(]', or '[]'.");
        }
    } else {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }
}

export function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return +this === +localInput;
    } else {
        inputMs = +localInput;
        return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
    }
}

export function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
}

export function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
}
