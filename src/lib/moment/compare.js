import { normalizeUnits } from '../units/aliases';
import { momentize } from '../create/constructors';
import isUndefined from '../utils/is-undefined';

export function isAfter (input, units) {
    input = momentize(input);
    if (!(this.isValid() && input.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > input.valueOf();
    } else {
        return input.valueOf() < this.startOf(units).valueOf();
    }
}

export function isBefore (input, units) {
    input = momentize(input);
    if (!(this.isValid() && input.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < input.valueOf();
    } else {
        return this.endOf(units).valueOf() < input.valueOf();
    }
}

export function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

export function isSame (input, units) {
    var inputMs;
    input = momentize(input);
    if (!(this.isValid() && input.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === input.valueOf();
    } else {
        inputMs = input.valueOf();
        return this.startOf(units).valueOf() <= inputMs && inputMs <= this.endOf(units).valueOf();
    }
}

export function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

export function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}
