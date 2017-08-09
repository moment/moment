import keys from "../utils/keys";
import compareArrays from '../utils/compare-arrays';

import {Locale} from "./constructor";
import {defaultLocaleConfig, mergeLocaleConfigs, isSameLocaleConfig} from "./config";

// internal storage for locale config files
let locales = {};

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move tso the next array item if it's a more specific variant than the current root
export function loadLocale(names) {
  if (!Array.isArray(names)) {
    names = [names];
  }

  // Normalize inputs to lower case hyphenated strings.
  let normalNames = names
    .filter(name => !!name)
    .map(name => name.toLowerCase().replace('_', '-'));

  return tryPrefixes(normalNames);

  function tryPrefixes(prefixes) {
    for (let prefix of prefixes) {
        if (locales[prefix])
            return locales[prefix];
    }
    prefixes = prefixes
        .map(prefix => prefix.substr(0, prefix.lastIndexOf('-')))
        .filter(prefix => prefix !== '');

    if (prefixes.length === 0) {
        throw new Error('Could not find locale \'' + names.join('\', \'') + '\'. Has it been defined?')
    }

    return tryPrefixes(prefixes);
  }
}

export function defineLocale (name, config) {
    if (!config) {
        throw new Error('A configuration object must be provided');
    }
    if (config.parentLocale) {
        let parentLocale;
        try {
            parentLocale = loadLocale(config.parentLocale);
        } catch (e) {
            throw new Error('The parent locale of \'' + name + '\' has not been defined');
        }
        config = mergeLocaleConfigs(parentLocale._config, config);
    } else {
        config = mergeLocaleConfigs(defaultLocaleConfig, config);
    }
    config.abbr = name;

    if (locales[name] && !isSameLocaleConfig(locales[name]._config, config)) {
        throw new Error('Locale \'' + name + '\' has already been defined');
    }

    return locales[name] = new Locale(name, config);
}

export function updateLocale(name, config) {
  if (!locales[name]) {
      return defineLocale(name, config);
  }
  let localeConfig = mergeLocaleConfigs(locales[name]._config, config);
  return locales[name] = new Locale(name, localeConfig);
}

/// @Internal @Testing
/// Reset locales
export function resetLocales() {
  listLocales().forEach(k => {
    if (k !== 'en') {
      delete locales[k];
    }
  });
}

export function listLocales() {
  return keys(locales);
}
