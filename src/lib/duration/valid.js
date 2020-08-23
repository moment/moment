import hasOwnProp from '../utils/has-own-prop.js';
import toInt from '../utils/to-int.js';
import indexOf from '../utils/index-of.js';
import { createDuration } from './create.js';

var ordering = [
    'year',
    'quarter',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
];

export default function isDurationValid(m) {
    var key,
        unitHasDecimal = false,
        i;
    for (key in m) {
        if (
            hasOwnProp(m, key) &&
            !(
                indexOf.call(ordering, key) !== -1 &&
                (m[key] == null || !isNaN(m[key]))
            )
        ) {
            return false;
        }
    }

    for (i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

export function isValid() {
    return this._isValid;
}

export function createInvalid() {
    return createDuration(NaN);
}
