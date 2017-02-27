import { module, test } from '../qunit';
import moment from '../../moment';

module('locale update');

test('calendar', function (assert) {
    moment.defineLocale('cal', null);
    moment.defineLocale('cal', {
        calendar : {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]'
        }
    });
    moment.updateLocale('cal', {
        calendar: {
            sameDay: '[Today] HH:mm',
            nextDay: '[Tomorrow] HH:mm',
            nextWeek: '[Next week] HH:mm'
        }
    });

    moment.locale('cal');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assert.equal(anchor.clone().add(3, 'hours').calendar(anchor), 'Today 15:00', 'today uses child version');
    assert.equal(anchor.clone().add(1, 'day').calendar(anchor), 'Tomorrow 12:00', 'tomorrow uses child version');
    assert.equal(anchor.clone().add(3, 'days').calendar(anchor), 'Next week 12:00', 'next week uses child version');

    assert.equal(anchor.clone().subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assert.equal(anchor.clone().subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assert.equal(anchor.clone().subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assert.equal(anchor.clone().add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
});

test('missing', function (assert) {
    moment.defineLocale('cal-2', null);
    moment.defineLocale('cal-2', {
        calendar: {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]'
        }
    });
    moment.updateLocale('cal-2', {
    });
    moment.locale('cal-2');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assert.equal(anchor.clone().add(3, 'hours').calendar(anchor), 'Today at 15:00', 'today uses parent version');
    assert.equal(anchor.clone().add(1, 'day').calendar(anchor), 'Tomorrow at 12:00', 'tomorrow uses parent version');
    assert.equal(anchor.clone().add(3, 'days').calendar(anchor), 'Next week at 12:00', 'next week uses parent version');
    assert.equal(anchor.clone().subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assert.equal(anchor.clone().subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assert.equal(anchor.clone().subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assert.equal(anchor.clone().add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
});

// Test function vs obj both directions

test('long date format', function (assert) {
    moment.defineLocale('ldf', null);
    moment.defineLocale('ldf', {
        longDateFormat : {
            LTS  : 'h:mm:ss A',
            LT   : 'h:mm A',
            L    : 'MM/DD/YYYY',
            LL   : 'MMMM D, YYYY',
            LLL  : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        }
    });
    moment.updateLocale('ldf', {
        longDateFormat: {
            LLL  : '[child] MMMM D, YYYY h:mm A',
            LLLL : '[child] dddd, MMMM D, YYYY h:mm A'
        }
    });

    moment.locale('ldf');
    var anchor = moment.utc('2015-09-06T12:34:56', moment.ISO_8601);
    assert.equal(anchor.format('LTS'), '12:34:56 PM', 'LTS uses base');
    assert.equal(anchor.format('LT'), '12:34 PM', 'LT uses base');
    assert.equal(anchor.format('L'), '09/06/2015', 'L uses base');
    assert.equal(anchor.format('l'), '9/6/2015', 'l uses base');
    assert.equal(anchor.format('LL'), 'September 6, 2015', 'LL uses base');
    assert.equal(anchor.format('ll'), 'Sep 6, 2015', 'll uses base');
    assert.equal(anchor.format('LLL'), 'child September 6, 2015 12:34 PM', 'LLL uses child');
    assert.equal(anchor.format('lll'), 'child Sep 6, 2015 12:34 PM', 'lll uses child');
    assert.equal(anchor.format('LLLL'), 'child Sunday, September 6, 2015 12:34 PM', 'LLLL uses child');
    assert.equal(anchor.format('llll'), 'child Sun, Sep 6, 2015 12:34 PM', 'llll uses child');
});

test('ordinal', function (assert) {
    moment.defineLocale('ordinal-1', null);
    moment.defineLocale('ordinal-1', {
        ordinal : '%dx'
    });
    moment.updateLocale('ordinal-1', {
        ordinal : '%dy'
    });

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string');

    moment.defineLocale('ordinal-2', null);
    moment.defineLocale('ordinal-2', {
        ordinal : '%dx'
    });
    moment.updateLocale('ordinal-2', {
        ordinal : function (num) {
            return num + 'y';
        }
    });

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child function');

    moment.defineLocale('ordinal-3', null);
    moment.defineLocale('ordinal-3', {
        ordinal : function (num) {
            return num + 'x';
        }
    });
    moment.updateLocale('ordinal-3', {
        ordinal : '%dy'
    });

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string (overwrite parent function)');
});

test('ordinal parse', function (assert) {
    moment.defineLocale('ordinal-parse-1', null);
    moment.defineLocale('ordinal-parse-1', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-1', {
        dayOfMonthOrdinalParse : /\d{1,2}y/
    });

    assert.ok(moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child');

    moment.defineLocale('ordinal-parse-2', null);
    moment.defineLocale('ordinal-parse-2', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-2', {
        dayOfMonthOrdinalParse : /\d{1,2}/
    });

    assert.ok(moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child (default)');
});

test('months', function (assert) {
    moment.defineLocale('months', null);
    moment.defineLocale('months', {
        months : 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split('_')
    });
    moment.updateLocale('months', {
        parentLocale: 'base-months',
        months : 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth '.split('_')
    });
    assert.ok(moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'), 'First', 'months uses child');
});
