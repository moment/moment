import { module, test } from '../qunit';
import moment from '../../moment';
import each from '../helpers/each';
import { daysInMonth } from '../../lib/units/month';
import {
    JANUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER,
    FEBRUARY,
} from '../../lib/units/month-constants';

module('days in month');

test('days in month', function (assert) {
    each([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], function (days, i) {
        var firstDay = moment([2012, i]),
            lastDay = moment([2012, i, days]);
        assert.equal(
            firstDay.daysInMonth(),
            days,
            firstDay.format('L') + ' should have ' + days + ' days.'
        );
        assert.equal(
            lastDay.daysInMonth(),
            days,
            lastDay.format('L') + ' should have ' + days + ' days.'
        );
    });
});

test('days in month of January', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, JANUARY]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, JANUARY), 31);
    }
});

test('days in month of March', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, MARCH]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, MARCH), 31);
    }
});

test('days in month of April', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, APRIL]).daysInMonth(), 30);
        assert.equal(daysInMonth(year, APRIL), 30);
    }
});

test('days in month of May', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, MAY]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, MAY), 31);
    }
});

test('days in month of June', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, JUNE]).daysInMonth(), 30);
        assert.equal(daysInMonth(year, JUNE), 30);
    }
});

test('days in month of July', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, MAY]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, MAY), 31);
    }
});

test('days in month of August', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, AUGUST]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, AUGUST), 31);
    }
});

test('days in month of September', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, SEPTEMBER]).daysInMonth(), 30);
        assert.equal(daysInMonth(year, SEPTEMBER), 30);
    }
});

test('days in month of October', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, OCTOBER]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, OCTOBER), 31);
    }
});

test('days in month of November', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, NOVEMBER]).daysInMonth(), 30);
        assert.equal(daysInMonth(year, NOVEMBER), 30);
    }
});

test('days in month of December', function (assert) {
    for (var year = 1899; year < 2100; year++) {
        assert.equal(moment([year, DECEMBER]).daysInMonth(), 31);
        assert.equal(daysInMonth(year, DECEMBER), 31);
    }
});

test('days in month leap years', function (assert) {
    assert.equal(
        moment([2010, FEBRUARY]).daysInMonth(),
        28,
        'Feb 2010 should have 28 days'
    );
    assert.equal(
        moment([2100, FEBRUARY]).daysInMonth(),
        28,
        'Feb 2100 should have 28 days'
    );
    assert.equal(
        moment([2008, FEBRUARY]).daysInMonth(),
        29,
        'Feb 2008 should have 29 days'
    );
    assert.equal(
        moment([2000, FEBRUARY]).daysInMonth(),
        29,
        'Feb 2000 should have 29 days'
    );
});

test('days in month with NaN inputs', function (assert) {
    assert.ok(
        isNaN(daysInMonth(NaN, NaN)),
        'year and month NaN inputs should return NaN'
    );
    assert.ok(isNaN(daysInMonth(2, NaN)), 'month NaN inputs should return NaN');
    assert.ok(isNaN(daysInMonth(NaN, 0)), 'year NaN inputs should return NaN');
    assert.ok(
        !moment([2010, null, null]).isValid(),
        'Invalid date because month is NaN'
    );
});

test('days in month with overflow', function (assert) {
    assert.equal(
        daysInMonth(14, 22),
        daysInMonth(15, 10),
        'positive overflow by 1'
    );
    assert.equal(
        daysInMonth(14, 122),
        daysInMonth(24, 2),
        'positive overflow by 10'
    );
    assert.equal(
        daysInMonth(8, -2),
        daysInMonth(7, 10),
        'negative overflow by 1'
    );
    assert.equal(
        daysInMonth(-2380, -25),
        daysInMonth(-2383, 11),
        'negative overflow by 3'
    );
});

test('days in month consistent with Date()', function (assert) {
    var oldMethod = function (year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    };
    assert.equal(
        daysInMonth(14, 22),
        oldMethod(14, 22),
        'positive overflow by 1'
    );
    assert.equal(
        daysInMonth(14, 122),
        oldMethod(14, 122),
        'positive overflow by 10'
    );
    assert.equal(
        daysInMonth(8, -2),
        oldMethod(8, -2),
        'negative overflow by 1'
    );
    assert.equal(
        daysInMonth(-2380, -25),
        oldMethod(-2380, -25),
        'negative overflow by 3'
    );
});
