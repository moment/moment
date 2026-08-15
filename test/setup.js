import { afterEach, beforeEach } from 'vitest';

import moment from '../src/moment';
import {
    setupDeprecationHandler,
    teardownDeprecationHandler,
} from './helpers/deprecation-handler';

beforeEach(() => {
    moment.locale('en');
    moment.createFromInputFallback = function (config) {
        throw new Error('input not handled by moment: ' + config._i);
    };
    setupDeprecationHandler(moment);
});

afterEach(() => {
    teardownDeprecationHandler(moment);
});
