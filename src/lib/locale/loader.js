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
export function loadLocale(names) {
  if (!Array.isArray(names)) {
    names = [names];
  }

  // Normalize inputs to lower case hyphenated strings.
  let normalNames = names.map(function (name) {
    return name ? name.toLowerCase().replace('_', '-') : name;
  });

  for (let i=0; i < normalNames.length; i++) {
      let split = normalNames[i].split('-');
      let next = names[i + 1] ? names[i + 1].split('-') : null;

      for (let j = split.length; j > 0; j--) {
          let prefix = split.slice(0,j).join('-');
          if (locales[prefix]) {
              return locales[prefix];
          }

          if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
              // The next array item is better than a more generic prefix of this one
              break;
          }
      }
  }
  throw new Error('Could not find locale \'' + names.join('\', \'') + '\'. Has it been defined?')
}

export function defineLocale (name, config) {
  if (config !== null) {
    var parentConfig = baseConfig;
    config.abbr = name;

    //FIXME: We should check if there is a locale already defined.

    if (config.parentLocale != null) {
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
