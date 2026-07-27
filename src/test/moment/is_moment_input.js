import { module, test } from '../qunit';
import { isMomentInput } from '../../lib/utils/is-moment-input';

module('is moment input');

test('isMomentInput recognizes arrays of numbers and strings', function (assert) {
    assert.ok(isMomentInput([]), 'empty array');
    assert.ok(isMomentInput([2010, 0, 1]), 'number array');
    assert.ok(isMomentInput(['2010', '0', '1']), 'string array');
    assert.ok(isMomentInput([2010, '0']), 'mixed number and string array');
});

test('isMomentInput rejects arrays with other item types', function (assert) {
    assert.ok(!isMomentInput([2010, {}]), 'object item');
    assert.ok(!isMomentInput([2010, null]), 'null item');
    assert.ok(!isMomentInput([2010, undefined]), 'undefined item');
    assert.ok(!isMomentInput([2010, new Date()]), 'date item');
});
