import { afterEach, beforeEach } from 'vitest';

import moment from '../../src/moment';
import { defineCommonLocaleTests } from './common-locale';

export function setupLocaleTests(name) {
    beforeEach(() => {
        moment.locale(name);
    });
    afterEach(() => {
        moment.locale('en');
    });
    defineCommonLocaleTests(name, -1, -1);
}
