import isUndefined from '../utils/is-undefined';
import {defineLocale, loadLocale} from "./loader";

let globalLocale;


// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
export function getSetGlobalLocale (key, values) {
  if (key) {
    let locale;
    if (isUndefined(values)) {
      locale = getLocale(key);
    }
    else {
      locale = defineLocale(key, values);
    }

    if (locale) {
      // moment.duration._locale = moment._locale = data;
      globalLocale = locale._abbr;
    }
  }

  return globalLocale;
}

// Gets the key from a string, moment, duration, etc.
export function getLocale (key) {
  if (!key) {
    return loadLocale(globalLocale);
  }

  if (key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }

  return loadLocale(key);
}
