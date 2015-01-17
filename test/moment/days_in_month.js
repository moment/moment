import { module, test } from '../qunit';
import moment from '../../moment';
import each from '../helpers/each';

module('days in month');

test('days in month', function (assert) {
    each([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], function (days, i) {
        var firstDay = moment([2012, i]),
            lastDay  = moment([2012, i, days]);
        assert.equal(firstDay.daysInMonth(), days, firstDay.format('L') + ' should have ' + days + ' days.');
        assert.equal(lastDay.daysInMonth(), days, lastDay.format('L') + ' should have ' + days + ' days.');
    });
});

test('days in month leap years', function (assert) {
    assert.equal(moment([2010, 1]).daysInMonth(), 28, 'Feb 2010 should have 28 days');
    assert.equal(moment([2100, 1]).daysInMonth(), 28, 'Feb 2100 should have 28 days');
    assert.equal(moment([2008, 1]).daysInMonth(), 29, 'Feb 2008 should have 29 days');
    assert.equal(moment([2000, 1]).daysInMonth(), 29, 'Feb 2000 should have 29 days');
});
