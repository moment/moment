import { Moment } from './constructor';
import { normalizeUnits, normalizeObjectUnits } from '../units/aliases';
import { getPrioritizedUnits } from '../units/priorities';
import { smartSetUTCMonth } from '../units/month';
import { hooks } from '../utils/hooks';
import { quickCreateUTC, quickCreateLocal } from '../create/from-anything';
import isFunction from '../utils/is-function';


export function makeGetSet (unit, msCoef) {
    return function (value) {
        if (value != null) {
            return set(this, unit, value, msCoef);
        } else {
            return get(this, unit);
        }
    };
}

export function get (mom, unit) {
    return mom.isValid() ?
        mom._d['getUTC' + unit]() : NaN;
}

function set (mom, unit, value, msCoef) {
    if (!mom.isValid()) {
        return mom;
    }
    var d, uts;
    console.log('SET', arguments);
    if (msCoef != null) {
        // this is one of ms, second, minute, hour
        uts = mom.valueOf();
        uts += (value - get(mom, unit)) * msCoef;
        return quickCreateUTC(uts, mom._locale, mom._tz);
    } else {
        // day or year, NOT month
        d = new Date(mom._d);
        d['setUTC' + unit](value);
        return quickCreateLocal(d.valueOf(), mom._locale, mom._tz);
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
