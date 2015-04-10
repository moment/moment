import { module, test } from '../qunit';
import moment from '../../moment';

module('merge');

test('merge two Date objects', function (assert) {
    var year = 2010, month = 5, day = 3,
        hour = 10, minute = 20, second = 30,
        datePart = new Date(year, month, day),
        timePart = new Date(0, 0, 0, hour, minute, second),
        expected = moment([year, month, day, hour, minute, second]);

    var merged = moment.merge(datePart, timePart);

    assert.equal(merged.isSame(expected), true, 'merge(datePart, timePart)');
});
