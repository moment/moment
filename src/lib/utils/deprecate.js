import extend from './extend';
import { hooks } from './hooks';
import isUndefined from './is-undefined';

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && !isUndefined(console) && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

export function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (firstTime) {
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

export function deprecateSimple(name, msg) {
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
