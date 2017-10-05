import moment from './moment-core';

import { setLocaleLoader } from './lib/locale/locales';

var hackedRequireToIgnoreError = require;

setLocaleLoader(function (name) {
    try {
        hackedRequireToIgnoreError('moment/locale/' + name);
    } catch (e) {
        // In the test environment, the external module 'moment'
        // can't be resolved because we're running inside it.
        // Fallback to using the old relative import
        try {
            hackedRequireToIgnoreError('./locale/' + name);
        } catch (e) { }
    }
});

export default moment;
