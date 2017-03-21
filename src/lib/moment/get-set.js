import { Moment } from './constructor';
import { normalizeUnits, normalizeObjectUnits } from '../units/aliases';
import { getPrioritizedUnits } from '../units/priorities';
import { hooks } from '../utils/hooks';
import isFunction from '../utils/is-function';


export function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            var mom = set(this, unit, value);
            return hooks.updateOffset(mom, keepTime);
        } else {
            return get(this, unit);
        }
    };
}

export function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

export function set (mom, unit, value) {
    if (mom.isValid()) {
        mom = new Moment(mom);
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
    return mom;
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
    var mom = this;
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            mom = prioritized[i].getSet.call(mom, prioritized[i].value);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(mom[units])) {
            return mom[units](value);
        }
    }
    return mom;
}
