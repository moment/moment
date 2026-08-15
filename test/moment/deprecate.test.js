import { describe, test } from 'vitest';
import { deprecate } from '../../src/lib/utils/deprecate';
import { hooks } from '../../src/lib/utils/hooks';

describe('deprecate', () => {
    test('deprecate', () => {
        // This directly tests deprecate(), so bypass the global test handler.
        var oldDeprecationHandler = hooks.deprecationHandler,
            oldSuppressDeprecationWarnings = hooks.suppressDeprecationWarnings,
            fn = function () {},
            deprecatedFn = deprecate('testing deprecation', fn);
        hooks.deprecationHandler = null;
        hooks.suppressDeprecationWarnings = true;
        deprecatedFn();
        hooks.deprecationHandler = oldDeprecationHandler;
        hooks.suppressDeprecationWarnings = oldSuppressDeprecationWarnings;
    });
});
