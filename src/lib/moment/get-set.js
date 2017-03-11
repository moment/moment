import { normalizeUnits, normalizeObjectUnits } from '../units/aliases';
import { getPrioritizedUnits } from '../units/priorities';
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

export function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


export function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}
