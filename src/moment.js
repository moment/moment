import moment from "./moment-core";

import { setLocaleLoader } from "./lib/locale/locales";

setLocaleLoader(function(name) {
    try {
        require('moment/locale/' + name);
    } catch (e) {
        // In the test environment, the external module 'moment'
        // can't be resolved because we're running inside it.
        // Fallback to using the old relative import
        try {
            require('./locale/' + name);
        } catch (e) { }
    }
});

export default moment;
