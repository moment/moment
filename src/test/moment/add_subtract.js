import { module, test, expect } from '../qunit';
import moment from '../../moment';

module('add and subtract');

test('add short reverse args', function (assert) {
    var a = moment(), b, c, d;
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add({ms: 50}).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add({s: 1}).seconds(), 9, 'Add seconds');
    assert.equal(a.add({m: 1}).minutes(), 8, 'Add minutes');
    assert.equal(a.add({h: 1}).hours(), 7, 'Add hours');
    assert.equal(a.add({d: 1}).date(), 13, 'Add date');
    assert.equal(a.add({w: 1}).date(), 20, 'Add week');
    assert.equal(a.add({M: 1}).month(), 10, 'Add month');
    assert.equal(a.add({y: 1}).year(), 2012, 'Add year');
    assert.equal(a.add({Q: 1}).month(), 1, 'Add quarter');

    b = moment([2010, 0, 31]).add({M: 1});
    c = moment([2010, 1, 28]).subtract({M: 1});
    d = moment([2010, 1, 28]).subtract({Q: 1});

    assert.equal(b.month(), 1, 'add month, jan 31st to feb 28th');
    assert.equal(b.date(), 28, 'add month, jan 31st to feb 28th');
    assert.equal(c.month(), 0, 'subtract month, feb 28th to jan 28th');
    assert.equal(c.date(), 28, 'subtract month, feb 28th to jan 28th');
    assert.equal(d.month(), 10, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    assert.equal(d.date(), 28, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    assert.equal(d.year(), 2009, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
});

test('add long reverse args', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add({milliseconds: 50}).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add({seconds: 1}).seconds(), 9, 'Add seconds');
    assert.equal(a.add({minutes: 1}).minutes(), 8, 'Add minutes');
    assert.equal(a.add({hours: 1}).hours(), 7, 'Add hours');
    assert.equal(a.add({days: 1}).date(), 13, 'Add date');
    assert.equal(a.add({weeks: 1}).date(), 20, 'Add week');
    assert.equal(a.add({months: 1}).month(), 10, 'Add month');
    assert.equal(a.add({years: 1}).year(), 2012, 'Add year');
    assert.equal(a.add({quarters: 1}).month(), 1, 'Add quarter');
});

test('add long singular reverse args', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add({millisecond: 50}).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add({second: 1}).seconds(), 9, 'Add seconds');
    assert.equal(a.add({minute: 1}).minutes(), 8, 'Add minutes');
    assert.equal(a.add({hour: 1}).hours(), 7, 'Add hours');
    assert.equal(a.add({day: 1}).date(), 13, 'Add date');
    assert.equal(a.add({week: 1}).date(), 20, 'Add week');
    assert.equal(a.add({month: 1}).month(), 10, 'Add month');
    assert.equal(a.add({year: 1}).year(), 2012, 'Add year');
    assert.equal(a.add({quarter: 1}).month(), 1, 'Add quarter');
});

test('add string long reverse args', function (assert) {
    var a = moment(), b;
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    b = a.clone();

    assert.equal(a.add('millisecond', 50).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add('second', 1).seconds(), 9, 'Add seconds');
    assert.equal(a.add('minute', 1).minutes(), 8, 'Add minutes');
    assert.equal(a.add('hour', 1).hours(), 7, 'Add hours');
    assert.equal(a.add('day', 1).date(), 13, 'Add date');
    assert.equal(a.add('week', 1).date(), 20, 'Add week');
    assert.equal(a.add('month', 1).month(), 10, 'Add month');
    assert.equal(a.add('year', 1).year(), 2012, 'Add year');
    assert.equal(b.add('day', '01').date(), 13, 'Add date');
    assert.equal(a.add('quarter', 1).month(), 1, 'Add quarter');
});

test('add string long singular reverse args', function (assert) {
    var a = moment(), b;
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    b = a.clone();

    assert.equal(a.add('milliseconds', 50).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add('seconds', 1).seconds(), 9, 'Add seconds');
    assert.equal(a.add('minutes', 1).minutes(), 8, 'Add minutes');
    assert.equal(a.add('hours', 1).hours(), 7, 'Add hours');
    assert.equal(a.add('days', 1).date(), 13, 'Add date');
    assert.equal(a.add('weeks', 1).date(), 20, 'Add week');
    assert.equal(a.add('months', 1).month(), 10, 'Add month');
    assert.equal(a.add('years', 1).year(), 2012, 'Add year');
    assert.equal(b.add('days', '01').date(), 13, 'Add date');
    assert.equal(a.add('quarters', 1).month(), 1, 'Add quarter');
});

test('add string short reverse args', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add('ms', 50).milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add('s', 1).seconds(), 9, 'Add seconds');
    assert.equal(a.add('m', 1).minutes(), 8, 'Add minutes');
    assert.equal(a.add('h', 1).hours(), 7, 'Add hours');
    assert.equal(a.add('d', 1).date(), 13, 'Add date');
    assert.equal(a.add('w', 1).date(), 20, 'Add week');
    assert.equal(a.add('M', 1).month(), 10, 'Add month');
    assert.equal(a.add('y', 1).year(), 2012, 'Add year');
    assert.equal(a.add('Q', 1).month(), 1, 'Add quarter');
});

test('add string long', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add(50, 'millisecond').milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add(1, 'second').seconds(), 9, 'Add seconds');
    assert.equal(a.add(1, 'minute').minutes(), 8, 'Add minutes');
    assert.equal(a.add(1, 'hour').hours(), 7, 'Add hours');
    assert.equal(a.add(1, 'day').date(), 13, 'Add date');
    assert.equal(a.add(1, 'week').date(), 20, 'Add week');
    assert.equal(a.add(1, 'month').month(), 10, 'Add month');
    assert.equal(a.add(1, 'year').year(), 2012, 'Add year');
    assert.equal(a.add(1, 'quarter').month(), 1, 'Add quarter');
});

test('add string long singular', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add(50, 'milliseconds').milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add(1, 'seconds').seconds(), 9, 'Add seconds');
    assert.equal(a.add(1, 'minutes').minutes(), 8, 'Add minutes');
    assert.equal(a.add(1, 'hours').hours(), 7, 'Add hours');
    assert.equal(a.add(1, 'days').date(), 13, 'Add date');
    assert.equal(a.add(1, 'weeks').date(), 20, 'Add week');
    assert.equal(a.add(1, 'months').month(), 10, 'Add month');
    assert.equal(a.add(1, 'years').year(), 2012, 'Add year');
    assert.equal(a.add(1, 'quarters').month(), 1, 'Add quarter');
});

test('add string short', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add(50, 'ms').milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add(1, 's').seconds(), 9, 'Add seconds');
    assert.equal(a.add(1, 'm').minutes(), 8, 'Add minutes');
    assert.equal(a.add(1, 'h').hours(), 7, 'Add hours');
    assert.equal(a.add(1, 'd').date(), 13, 'Add date');
    assert.equal(a.add(1, 'w').date(), 20, 'Add week');
    assert.equal(a.add(1, 'M').month(), 10, 'Add month');
    assert.equal(a.add(1, 'y').year(), 2012, 'Add year');
    assert.equal(a.add(1, 'Q').month(), 1, 'Add quarter');
});

test('add strings string short args', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add('ms', '50').milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add('s', '1').seconds(), 9, 'Add seconds');
    assert.equal(a.add('m', '1').minutes(), 8, 'Add minutes');
    assert.equal(a.add('h', '1').hours(), 7, 'Add hours');
    assert.equal(a.add('d', '1').date(), 13, 'Add date');
    assert.equal(a.add('w', '1').date(), 20, 'Add week');
    assert.equal(a.add('M', '1').month(), 10, 'Add month');
    assert.equal(a.add('y', '1').year(), 2012, 'Add year');
    assert.equal(a.add('Q', '1').month(), 1, 'Add quarter');
});

test('subtract strings string short args', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.subtract('ms', '50').milliseconds(), 450, 'Subtract milliseconds');
    assert.equal(a.subtract('s', '1').seconds(), 7, 'Subtract seconds');
    assert.equal(a.subtract('m', '1').minutes(), 6, 'Subtract minutes');
    assert.equal(a.subtract('h', '1').hours(), 5, 'Subtract hours');
    assert.equal(a.subtract('d', '1').date(), 11, 'Subtract date');
    assert.equal(a.subtract('w', '1').date(), 4, 'Subtract week');
    assert.equal(a.subtract('M', '1').month(), 8, 'Subtract month');
    assert.equal(a.subtract('y', '1').year(), 2010, 'Subtract year');
    assert.equal(a.subtract('Q', '1').month(), 5, 'Subtract quarter');
});

test('add strings string short', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.add('50', 'ms').milliseconds(), 550, 'Add milliseconds');
    assert.equal(a.add('1', 's').seconds(), 9, 'Add seconds');
    assert.equal(a.add('1', 'm').minutes(), 8, 'Add minutes');
    assert.equal(a.add('1', 'h').hours(), 7, 'Add hours');
    assert.equal(a.add('1', 'd').date(), 13, 'Add date');
    assert.equal(a.add('1', 'w').date(), 20, 'Add week');
    assert.equal(a.add('1', 'M').month(), 10, 'Add month');
    assert.equal(a.add('1', 'y').year(), 2012, 'Add year');
    assert.equal(a.add('1', 'Q').month(), 1, 'Add quarter');
});

test('subtract strings string short', function (assert) {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assert.equal(a.subtract('50', 'ms').milliseconds(), 450, 'Subtract milliseconds');
    assert.equal(a.subtract('1', 's').seconds(), 7, 'Subtract seconds');
    assert.equal(a.subtract('1', 'm').minutes(), 6, 'Subtract minutes');
    assert.equal(a.subtract('1', 'h').hours(), 5, 'Subtract hours');
    assert.equal(a.subtract('1', 'd').date(), 11, 'Subtract date');
    assert.equal(a.subtract('1', 'w').date(), 4, 'Subtract week');
    assert.equal(a.subtract('1', 'M').month(), 8, 'Subtract month');
    assert.equal(a.subtract('1', 'y').year(), 2010, 'Subtract year');
    assert.equal(a.subtract('1', 'Q').month(), 5, 'Subtract quarter');
});

test('add across DST', function (assert) {
    // Detect Safari bug and bail. Hours on 13th March 2011 are shifted
    // with 1 ahead.
    if (new Date(2011, 2, 13, 5, 0, 0).getHours() !== 5) {
        expect(0);
        return;
    }

    var a = moment(new Date(2011, 2, 12, 5, 0, 0)),
        b = moment(new Date(2011, 2, 12, 5, 0, 0)),
        c = moment(new Date(2011, 2, 12, 5, 0, 0)),
        d = moment(new Date(2011, 2, 12, 5, 0, 0)),
        e = moment(new Date(2011, 2, 12, 5, 0, 0));
    a.add(1, 'days');
    b.add(24, 'hours');
    c.add(1, 'months');
    e.add(1, 'quarter');

    assert.equal(a.hours(), 5, 'adding days over DST difference should result in the same hour');
    if (b.isDST() && !d.isDST()) {
        assert.equal(b.hours(), 6, 'adding hours over DST difference should result in a different hour');
    } else if (!b.isDST() && d.isDST()) {
        assert.equal(b.hours(), 4, 'adding hours over DST difference should result in a different hour');
    } else {
        assert.equal(b.hours(), 5, 'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time');
    }
    assert.equal(c.hours(), 5, 'adding months over DST difference should result in the same hour');
    assert.equal(e.hours(), 5, 'adding quarters over DST difference should result in the same hour');
});
