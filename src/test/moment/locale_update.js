import { module, test } from '../qunit';
import moment from '../../moment';

module('locale update');

test('defineLocale/updateLocale should not set the global locale', function (assert) {
    moment.defineLocale('test-1', {months: '1_2_3_4_5_6_7_8_9_10_11_12'.split('_')});
    assert.notEqual(moment.locale(), 'test-1', 'defineLocale should not set the global locale');

    moment.updateLocale('test-1', {months: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_')})
    assert.notEqual(moment.locale(), 'test-1', 'updateLocale should not set the global locale');
});

test('global locale does not need to be reset after updateLocale', function (assert) {
    moment.locale('test-1', {months: '1_2_3_4_5_6_7_8_9_10_11_12'.split('_')});
    assert.equal(moment.unix(0).format('MMMM'), '1', 'should use the test-1 locale');

    moment.updateLocale('test-1', {months: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_')});
    assert.equal(moment.unix(0).format('MMMM'), 'one', 'should not need to reset the global locale after update')
});

// Instances are immutable.
test('instance locale needs to be reset after updateLocale', function (assert) {
    moment.locale('test-1', {months: '1_2_3_4_5_6_7_8_9_10_11_12'.split('_')});
    const mom = moment.unix(0);

    assert.equal(mom.format('MMMM'), '1', 'should use the test-1 locale');

    moment.updateLocale('test-1', {months: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_')});

    assert.equal(mom.format('MMMM'), '1', 'does not use the updated locale');
    assert.equal(mom.locale('test-1').format('MMMM'), 'one', 'uses the updated locale');

});

test('calendar', function (assert) {
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
    assert.equal(anchor.add(3, 'hours').calendar(anchor), 'Today 15:00', 'today uses child version');
    assert.equal(anchor.add(1, 'day').calendar(anchor), 'Tomorrow 12:00', 'tomorrow uses child version');
    assert.equal(anchor.add(3, 'days').calendar(anchor), 'Next week 12:00', 'next week uses child version');

    assert.equal(anchor.subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assert.equal(anchor.subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assert.equal(anchor.subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assert.equal(anchor.add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
});

test('missing', function (assert) {
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
    assert.equal(anchor.add(3, 'hours').calendar(anchor), 'Today at 15:00', 'today uses parent version');
    assert.equal(anchor.add(1, 'day').calendar(anchor), 'Tomorrow at 12:00', 'tomorrow uses parent version');
    assert.equal(anchor.add(3, 'days').calendar(anchor), 'Next week at 12:00', 'next week uses parent version');
    assert.equal(anchor.subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assert.equal(anchor.subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assert.equal(anchor.subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assert.equal(anchor.add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
});

// Test function vs obj both directions

test('long date format', function (assert) {
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
    moment.defineLocale('ordinal-1', {
        ordinal : '%dx'
    });
    moment.updateLocale('ordinal-1', {
        ordinal : '%dy'
    });
    moment.locale('ordinal-1');

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string');

    moment.defineLocale('ordinal-2', {
        ordinal : '%dx'
    });
    moment.updateLocale('ordinal-2', {
        ordinal : function (num) {
            return num + 'y';
        }
    });
    moment.locale('ordinal-2');

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child function');

    moment.defineLocale('ordinal-3', {
        ordinal : function (num) {
            return num + 'x';
        }
    });
    moment.updateLocale('ordinal-3', {
        ordinal : '%dy'
    });
    moment.locale('ordinal-3');

    assert.equal(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string (overwrite parent function)');
});

test('ordinal parse', function (assert) {
    moment.defineLocale('ordinal-parse-1', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-1', {
        dayOfMonthOrdinalParse : /\d{1,2}y/
    });
    moment.locale('ordinal-parse-1');

    assert.ok(moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child');

    moment.defineLocale('ordinal-parse-2', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-2', {
        dayOfMonthOrdinalParse : /\d{1,2}/
    });
    moment.locale('ordinal-parse-2');

    assert.ok(moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child (default)');
});

test('months', function (assert) {
    moment.defineLocale('months', {
        months : 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split('_')
    });
    moment.updateLocale('months', {
        parentLocale: 'base-months',
        months : 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth '.split('_')
    });
    moment.locale('months');
    assert.ok(moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'), 'First', 'months uses child');
});
