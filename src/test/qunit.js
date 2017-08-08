/*global QUnit:false*/

import moment from '../moment';
import {resetLocales} from '../lib/locale/locale';
import { defineCommonLocaleTests } from './helpers/common-locale';
import { setupDeprecationHandler, teardownDeprecationHandler } from './helpers/deprecation-handler';

export var test = QUnit.test;

export var expect = QUnit.expect;

export function module (name, lifecycle) {
    QUnit.module(name, {
        setup : function () {
            resetLocales();
            moment.locale('en');
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            teardownDeprecationHandler(test, moment, 'core');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
            moment.locale('en');
        }
    });
}

export function localeModule (name, lifecycle) {
    QUnit.module('locale:' + name, {
        setup : function () {
            let localeConfig;
            // TODO: Move 'en' locale to locales folder.
            if (name !== 'en') {
              localeConfig = require('../../locale/' + name)._config;
            }
            moment.locale(name, localeConfig);
            moment.createFromInputFallback = function (config) {
                throw new Error('input not handled by moment: ' + config._i);
            };
            setupDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            moment.locale('en');
            teardownDeprecationHandler(test, moment, 'locale');
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
    defineCommonLocaleTests(name, -1, -1);
}
