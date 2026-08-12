import { module, test } from '../qunit';
import { deprecate } from '../../lib/utils/deprecate';
import { hooks } from '../../lib/utils/hooks';

module('deprecate');

test('deprecate', function (assert) {
    // NOTE: hooks inside deprecate.js and moment are different, so this is can
    // not be test.expectedDeprecations(...)
    var oldSuppressDeprecationWarnings = hooks.suppressDeprecationWarnings,
        fn = function () {},
        deprecatedFn = deprecate('testing deprecation', fn);
    hooks.suppressDeprecationWarnings = true;
    deprecatedFn();
    hooks.suppressDeprecationWarnings = oldSuppressDeprecationWarnings;

    assert.expect(0);
});
