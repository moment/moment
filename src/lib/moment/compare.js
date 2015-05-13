import { isMoment } from './constructor';
import { normalizeUnits } from '../units/aliases';
import { createLocal } from '../create/local';
import { isValid } from '../create/valid';

export function isAfter (input, units) {
    var bothValid;
    var inputMs;
    input = isMoment(input) ? input : createLocal(input);
    units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
    bothValid = isValid(this) && isValid(input);

    if (units === 'millisecond') {
        return bothValid && +this > +input;
    } else {
        inputMs = isMoment(input) ? +input : +createLocal(input);
        return bothValid && inputMs < +this.clone().startOf(units);
    }
}

export function isBefore (input, units) {
    var bothValid;
    var inputMs;
    input = isMoment(input) ? input : createLocal(input);
    units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
    bothValid = isValid(this) && isValid(input);

    if (units === 'millisecond') {
        return bothValid && +this < +input;
    } else {
        inputMs = +input;
        return bothValid && +this.clone().endOf(units) < inputMs;
    }
}

export function isBetween (from, to, units) {
    return this.isAfter(from, units) && this.isBefore(to, units);
}

export function isSame (input, units) {
    var inputMs;
    var bothValid;
    input = isMoment(input) ? input : createLocal(input);
    units = normalizeUnits(units || 'millisecond');
    bothValid = isValid(this) && isValid(input);

    if (units === 'millisecond') {
        return bothValid && +this === +input;
    } else {
        inputMs = +input;
        return bothValid && +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
    }
}
