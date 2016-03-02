// These tests are for locale independent features
// locale dependent tests would be in locale test folder
import { module, test } from '../qunit';
import moment from '../../moment';

module('calendar');

const march1 = moment('2016-03-01');
const march8 = moment('2016-03-08');
const july1 = moment('2016-07-01');
const jan1 = moment('2016-01-01');
const dec28 = moment('2015-12-28');
const nov1 = moment('2015-11-01');

test('passing a function', function (assert) {
    var day = moment().hours(2).minutes(0).seconds(0);
    assert.equal(moment(day).calendar(null, {
        'sameDay': function () {
            return 'h:mmA';
        }
    }), '2:00AM', 'should equate');
});

test('same month format', function (assert) {
  assert.equal(march8.calendar(march1, {
    sameMonth: 'ddd, D',
  }), 'Tue, 8', 'should equate');
});

test('future same year format', function (assert) {
  assert.equal(july1.calendar(march1, {
    sameYear: 'ddd, D MMM',
  }), 'Fri, 1 Jul', 'should equate');
});

test('past same year format', function (assert) {
  assert.equal(jan1.calendar(march1, {
    sameYear: 'ddd, D MMM',
  }), 'Fri, 1 Jan', 'should equate');
});

test('past year format', function (assert) {
  assert.equal(nov1.calendar(jan1, {
    lastYear: 'ddd, D MMM YYYY',
  }), 'Sun, 1 Nov 2015', 'should equate');
});

test('past year past week prefrence', function (assert) {
  assert.equal(dec28.calendar(jan1, {
    lastWeek: '[Last] dddd [at] LT',
    lastYear: 'ddd, D MMM YYYY',
  }), 'Last Monday at 12:00 AM', 'should equate');
});

