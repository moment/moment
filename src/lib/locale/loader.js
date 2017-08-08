import keys from "../utils/keys";
import compareArrays from '../utils/compare-arrays';
import {deprecateSimple} from "../utils/deprecate";

import {getSetGlobalLocale} from './context';
import {mergeConfigs} from "./set";
import {Locale} from "./constructor";
import {baseConfig} from "./base-config";

// internal storage for locale config files
var locales = {};
var localeFamilies = {};


// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move tso the next array item if it's a more specific variant than the current root
export function chooseLocale(names) {
  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  }

  var i = 0, j, next, locale, split;

  while (i < names.length) {
    split = normalizeLocale(names[i]).split('-');
    j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split('-') : null;
    while (j > 0) {
      locale = loadLocale(split.slice(0, j).join('-'));
      if (locale) {
        return locale;
      }
      if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
        //the next array item is better than a shallower substring of this one
        break;
      }
      j--;
    }
    i++;
  }
  return null;
}


export function loadLocale(name) {
  var oldLocale = null;
  // TODO: Find a better way to register and load all the locales in Node
  if (!locales[name] && (typeof module !== 'undefined') &&
    module && module.exports) {
    try {
      oldLocale = getSetGlobalLocale();
      require('./locale/' + name);
      // because defineLocale currently also sets the global locale, we
      // want to undo that for lazy loaded locales
      getSetGlobalLocale(oldLocale);
    } catch (e) { }
  }
  return locales[name];
}


export function defineLocale (name, config) {
  if (config !== null) {
    var parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple('defineLocaleOverride',
        'use moment.updateLocale(localeName, config) to change ' +
        'an existing locale. moment.defineLocale(localeName, ' +
        'config) should only be used for creating a new locale ' +
        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        if (!localeFamilies[config.parentLocale]) {
          localeFamilies[config.parentLocale] = [];
        }
        localeFamilies[config.parentLocale].push({
          name: name,
          config: config
        });
        return null;
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));

    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function (x) {
        defineLocale(x.name, x.config);
      });
    }

    // backwards compat for now: also set the locale
    // make sure we set the locale AFTER all child locales have been
    // created, so we won't end up with the child locale set.
    getSetGlobalLocale(name);


    return locales[name];
  } else {
    // useful for testing
    delete locales[name];
    return null;
  }
}


export function updateLocale(name, config) {
  if (config != null) {
    var locale, parentConfig = baseConfig;
    // MERGE
    if (locales[name] != null) {
      parentConfig = locales[name]._config;
    }
    config = mergeConfigs(parentConfig, config);
    locale = new Locale(config);
    locale.parentLocale = locales[name];
    locales[name] = locale;

    // backwards compat for now: also set the locale
    getSetGlobalLocale(name);
  } else {
    // pass null for config to unupdate, useful for tests
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}

export function listLocales() {
  return keys(locales);
}
