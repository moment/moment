/*global QUnit:false*/

import moment from '../moment';
import { defineCommonLocaleTests } from './helpers/common-locale';
import { setupDeprecationHandler, teardownDeprecationHandler } from './helpers/deprecation-handler';
import { test } from './qunit';

export function localeModule (name, lifecycle) {
    QUnit.module('locale:' + name, {
        beforeEach : function () {
            moment.locale(name);
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        afterEach : function () {
            moment.locale('en');
            teardownDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
    defineCommonLocaleTests(name, -1, -1);
}
