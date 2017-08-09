import { Duration } from './constructor';
import { getLocale } from '../locale/context';

// If passed a locale key, it will return a cloned instance that is set
// to the specified locale.  Otherwise, it will return the name of the
// locale that is set on this instance.
export function locale (key) {
    var clone, newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        clone = new Duration(this);
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            clone._locale = newLocaleData;
        }
        return clone;
    }
}

export function localeData () {
    return this._locale;
}