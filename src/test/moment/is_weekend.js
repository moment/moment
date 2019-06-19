import { module, test } from '../qunit';
import moment from '../../moment';

module('is weekend');

test('is a weekend invalid', function (assert) {
    assert.equal(moment(NaN).isWeekend(), false, 'Invalid');
});

test('is a weekend valid', function (assert) {
    assert.equal(moment(new Date(2019, 5, 15)).isWeekend(), true, 'Saturday');
    assert.equal(moment(new Date(2019, 5, 16)).isWeekend(), true, 'Sunday');
    assert.equal(moment(new Date(2019, 5, 17)).isWeekend(), false, 'Monday');
});
