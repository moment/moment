import isUndefined from '../utils/is-undefined';
import isArray from '../utils/is-array';
import {defineLocale, loadLocale, chooseLocale} from "./loader";

var globalLocale;


// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
export function getSetGlobalLocale (key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    }
    else {
      data = defineLocale(key, values);
    }

    if (data) {
      // moment.duration._locale = moment._locale = data;
      globalLocale = data;
    }
  }

  return globalLocale._abbr;
}




// returns locale data
export function getLocale (key) {
  var locale;

  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }

  if (!key) {
    return globalLocale;
  }

  if (!isArray(key)) {
    //short-circuit everything else
    locale = loadLocale(key);
    if (locale) {
      return locale;
    }
    key = [key];
  }

  return chooseLocale(key);
}
