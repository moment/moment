import { module, test, expect } from '../qunit';
import { deprecate } from '../../lib/utils/deprecate';
import { hooks } from '../../lib/utils/hooks';
import moment from '../../moment';

module('deprecate');

test('deprecate', function (assert) {
    // NOTE: hooks inside deprecate.js and moment are different, so this is can
    // not be test.expectedDeprecations(...)
    var fn = function () {};
    hooks.suppressDeprecationWarnings = true;
    var deprecatedFn = deprecate('testing deprecation', fn);
    deprecatedFn();

    expect(0);
});
