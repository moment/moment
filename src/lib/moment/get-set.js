import { normalizeUnits } from '../units/aliases';
import updateOffset from '../timezone/update-offset';
import isFunction from '../utils/is-function';

export function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            return updateOffset(this, keepTime);
        } else {
            return get(this, unit);
        }
    };
}

export function get (mom, unit) {
    return mom.isValid() ?
        mom._d['getUTC' + unit]() : NaN;
}

export function set (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['setUTC' + unit](value);
    }
}

// MOMENTS

export function getSet (units, value) {
    var unit;
    if (typeof units === 'object') {
        for (unit in units) {
            this.set(unit, units[unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}
