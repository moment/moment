import { hooks } from '../utils/hooks';
import hasOwnProp from '../utils/has-own-prop';
import isUndefined from '../utils/is-undefined';
import getParsingFlags from '../create/parsing-flags';

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

export function copyConfig(to, from) {
    var i, prop, val;

    // TODO(iskren): These are going in parsing flags
    // if (!isUndefined(from._i)) {
    //     to._i = from._i;
    // }
    // if (!isUndefined(from._f)) {
    //     to._f = from._f;
    // }
    // if (!isUndefined(from._l)) {
    //     to._l = from._l;
    // }
    // if (!isUndefined(from._strict)) {
    //     to._strict = from._strict;
    // }
    // if (!isUndefined(from._tzm)) {
    //     to._tzm = from._tzm;
    // }

    // this can not be null, and should be a freshly created object
    to._d = from._ts != null ? new Date(from._ts) : from._d;
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from, true);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }
    if (!isUndefined(from._tz)) {
        to._tz = from._tz;
    }
    if (!isUndefined(from._isValid)) {
        to._isValid = from._isValid;
    }

    // TODO(iskren): Drop these, not needed any more
    // if (momentProperties.length > 0) {
    //     for (i = 0; i < momentProperties.length; i++) {
    //         prop = momentProperties[i];
    //         val = from[prop];
    //         if (!isUndefined(val)) {
    //             to[prop] = val;
    //         }
    //     }
    // }

    return to;
}

// Moment prototype object.
//
// Run hooks.updateOffset(new Moment(config)) if you're constructing from user
// input, but be careful to detect and break out of loops in case the user's
// version of hooks.updateOffset() decides to trigger the same code path.
// (Or just use from-anything's createFromConfig(), which handles this for you.)
export function Moment(config) {
    copyConfig(this, config);
    this._isAMomentObject = true;
}

export function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}
