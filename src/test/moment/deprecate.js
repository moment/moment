import { module, test } from '../qunit';
import { deprecate, deprecateSimple } from '../../lib/utils/deprecate';
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

test('deprecateSimple includes a stack trace and warns once', function (assert) {
    var oldSuppressDeprecationWarnings = hooks.suppressDeprecationWarnings,
        oldWarn = console.warn,
        warnings = [];

    hooks.suppressDeprecationWarnings = false;
    console.warn = function (msg) {
        warnings.push(msg);
    };

    try {
        deprecateSimple(
            'testing deprecateSimple',
            'testing simple deprecation'
        );
        deprecateSimple(
            'testing deprecateSimple',
            'testing simple deprecation'
        );
    } finally {
        console.warn = oldWarn;
        hooks.suppressDeprecationWarnings = oldSuppressDeprecationWarnings;
    }

    assert.equal(warnings.length, 1, 'warns once for each named deprecation');
    assert.ok(
        warnings[0].indexOf('testing simple deprecation\n') !== -1,
        'includes a stack trace after the message'
    );
});
