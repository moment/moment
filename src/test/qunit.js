/*global QUnit:false*/

import moment from '../moment';
import { setupDeprecationHandler, teardownDeprecationHandler } from './helpers/deprecation-handler';

export var test = QUnit.test;

export function module (name, lifecycle) {
    QUnit.module(name, {
        beforeEach : function () {
            moment.locale('en');
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        afterEach : function () {
            teardownDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
}
