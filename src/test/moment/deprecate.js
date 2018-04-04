import { module, test } from '../qunit.js';
import { deprecate } from '../../lib/utils/deprecate.js';
import moment from '../../moment.js';

module('deprecate');

test('deprecate', function (assert) {
    // NOTE: hooks inside deprecate.js and moment are different, so this is can
    // not be test.expectedDeprecations(...)
    var fn = function () {};
    var deprecatedFn = deprecate('testing deprecation', fn);
    deprecatedFn();

    assert.expect(0);
});
