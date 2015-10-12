import { module, test } from '../qunit';
import moment from '../../moment';

module('age');

test('age', function (assert) {
    assert.equal(moment().subtract(10, 'years').age(), 10, 'Age from now');
    assert.equal(moment('2000-01-01').age('2015-01-01'), 15, 'Age from date');
    assert.equal(moment('2000-01-02').age('2015-01-01'), 15, 'Age from date - tomorrow');
    assert.equal(moment('2000-02-29').age('2016-02-29'), 16, 'Age from date - leap-leap');
    assert.equal(moment('2000-02-29').age('2015-02-28'), 15, 'Age from date - leap-nonleap');
});


