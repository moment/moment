import { module, test } from '../qunit';
import moment from '../../moment';

module('is today');

test('is moment today', function (assert) {
    var m = moment(Date.now()),
        mCopy = moment(m);
    assert.equal(m.isToday(), true, 'new Date is today');
    assert.equal(+m, +mCopy, 'isToday should not change moment');
});

test('is today with invalid moments', function (assert) {
    assert.equal(
        moment.invalid().isToday(),
        false,
        'invalid moment is not today'
    );
});
