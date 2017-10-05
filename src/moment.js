import moment from './moment-core';

import { setLocaleLoader } from './lib/locale/locales';

var hackedRequireToIgnoreError = require;

setLocaleLoader(function (name) {
    try {
        hackedRequireToIgnoreError('./locale/' + name);
    } catch (e) { }
});

export default moment;
