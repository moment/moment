import { module, test, expect } from '../qunit';
import { deprecate } from '../../lib/utils/deprecate';
import moment from '../../moment';

module('deprecate');

test('deprecate', function (assert) {
    var fn = function () {};
    var deprecatedFn = deprecate('testing deprecation', fn);
    deprecatedFn();

    expect(0);
});
