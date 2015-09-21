import { isMoment } from './constructor';
import { normalizeUnits } from '../units/aliases';
import { createLocal } from '../create/local';

export function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
    if (units === 'millisecond') {
        return +this > +localInput;
    } else {
        return +localInput < +this.clone().startOf(units);
    }
}

export function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
    if (units === 'millisecond') {
        return +this < +localInput;
    } else {
        return +this.clone().endOf(units) < +localInput;
    }
}

export function isBetween (from, to, units) {
    return this.isAfter(from, units) && this.isBefore(to, units);
}

export function isSame (input, units) {
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
