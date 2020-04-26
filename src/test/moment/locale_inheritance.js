import { module, test } from '../qunit';
import moment from '../../moment';

module('locale inheritance');

test('calendar', function (assert) {
    moment.defineLocale('base-cal', {
        calendar: {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]',
        },
    });
    moment.defineLocale('child-cal', {
        parentLocale: 'base-cal',
        calendar: {
            sameDay: '[Today] HH:mm',
            nextDay: '[Tomorrow] HH:mm',
            nextWeek: '[Next week] HH:mm',
        },
    });

    moment.locale('child-cal');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assert.equal(
        anchor.clone().add(3, 'hours').calendar(anchor),
        'Today 15:00',
        'today uses child version'
    );
    assert.equal(
        anchor.clone().add(1, 'day').calendar(anchor),
        'Tomorrow 12:00',
        'tomorrow uses child version'
    );
    assert.equal(
        anchor.clone().add(3, 'days').calendar(anchor),
        'Next week 12:00',
        'next week uses child version'
    );

    assert.equal(
        anchor.clone().subtract(1, 'day').calendar(anchor),
        'Yesterday at 12:00',
        'yesterday uses parent version'
    );
    assert.equal(
        anchor.clone().subtract(3, 'days').calendar(anchor),
        'Last week at 12:00',
        'last week uses parent version'
    );
    assert.equal(
        anchor.clone().subtract(7, 'days').calendar(anchor),
        'whatever',
        'sameElse uses parent version -'
    );
    assert.equal(
        anchor.clone().add(7, 'days').calendar(anchor),
        'whatever',
        'sameElse uses parent version +'
    );
});

test('missing', function (assert) {
    moment.defineLocale('base-cal-2', {
        calendar: {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]',
        },
    });
    moment.defineLocale('child-cal-2', {
        parentLocale: 'base-cal-2',
    });
    moment.locale('child-cal-2');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assert.equal(
        anchor.clone().add(3, 'hours').calendar(anchor),
        'Today at 15:00',
        'today uses parent version'
    );
    assert.equal(
        anchor.clone().add(1, 'day').calendar(anchor),
        'Tomorrow at 12:00',
        'tomorrow uses parent version'
    );
    assert.equal(
        anchor.clone().add(3, 'days').calendar(anchor),
        'Next week at 12:00',
        'next week uses parent version'
    );
    assert.equal(
        anchor.clone().subtract(1, 'day').calendar(anchor),
        'Yesterday at 12:00',
        'yesterday uses parent version'
    );
    assert.equal(
        anchor.clone().subtract(3, 'days').calendar(anchor),
        'Last week at 12:00',
        'last week uses parent version'
    );
    assert.equal(
        anchor.clone().subtract(7, 'days').calendar(anchor),
        'whatever',
        'sameElse uses parent version -'
    );
    assert.equal(
        anchor.clone().add(7, 'days').calendar(anchor),
        'whatever',
        'sameElse uses parent version +'
    );
});

// Test function vs obj both directions

test('long date format', function (assert) {
    moment.defineLocale('base-ldf', {
        longDateFormat: {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A',
        },
    });
    moment.defineLocale('child-ldf', {
        parentLocale: 'base-ldf',
        longDateFormat: {
            LLL: '[SUMMER child] MMMM D, YYYY h:mm A',
            LLLL: '[SUMMER child] dddd, MMMM D, YYYY h:mm A',
        },
    });

    moment.locale('child-ldf');
    var anchor = moment.utc('2015-09-06T12:34:56', moment.ISO_8601);
    assert.equal(anchor.format('LTS'), '12:34:56 PM', 'LTS uses base');
    assert.equal(anchor.format('LT'), '12:34 PM', 'LT uses base');
    assert.equal(anchor.format('L'), '09/06/2015', 'L uses base');
    assert.equal(anchor.format('l'), '9/6/2015', 'l uses base');
    assert.equal(anchor.format('LL'), 'September 6, 2015', 'LL uses base');
    assert.equal(anchor.format('ll'), 'Sep 6, 2015', 'll uses base');
    assert.equal(
        anchor.format('LLL'),
        'SUMMER child September 6, 2015 12:34 PM',
        'LLL uses child'
    );
    assert.equal(
        anchor.format('lll'),
        'SUMMER child Sep 6, 2015 12:34 PM',
        'lll uses child'
    );
    assert.equal(
        anchor.format('LLLL'),
        'SUMMER child Sunday, September 6, 2015 12:34 PM',
        'LLLL uses child'
    );
    assert.equal(
        anchor.format('llll'),
        'SUMMER child Sun, Sep 6, 2015 12:34 PM',
        'llll uses child'
    );
});

test('ordinal', function (assert) {
    moment.defineLocale('base-ordinal-1', {
        ordinal: '%dx',
    });
    moment.defineLocale('child-ordinal-1', {
        parentLocale: 'base-ordinal-1',
        ordinal: '%dy',
    });

    assert.equal(
        moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
        '3y',
        'ordinal uses child string'
    );

    moment.defineLocale('base-ordinal-2', {
        ordinal: '%dx',
    });
    moment.defineLocale('child-ordinal-2', {
        parentLocale: 'base-ordinal-2',
        ordinal: function (num) {
            return num + 'y';
        },
    });

    assert.equal(
        moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
        '3y',
        'ordinal uses child function'
    );

    moment.defineLocale('base-ordinal-3', {
        ordinal: function (num) {
            return num + 'x';
        },
    });
    moment.defineLocale('child-ordinal-3', {
        parentLocale: 'base-ordinal-3',
        ordinal: '%dy',
    });

    assert.equal(
        moment.utc('2015-02-03', moment.ISO_8601).format('Do'),
        '3y',
        'ordinal uses child string (overwrite parent function)'
    );
});

test('ordinal parse', function (assert) {
    moment.defineLocale('base-ordinal-parse-1', {
        dayOfMonthOrdinalParse: /\d{1,2}x/,
    });
    moment.defineLocale('child-ordinal-parse-1', {
        parentLocale: 'base-ordinal-parse-1',
        dayOfMonthOrdinalParse: /\d{1,2}y/,
    });

    assert.ok(
        moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(),
        'ordinal parse uses child'
    );

    moment.defineLocale('base-ordinal-parse-2', {
        dayOfMonthOrdinalParse: /\d{1,2}x/,
    });
    moment.defineLocale('child-ordinal-parse-2', {
        parentLocale: 'base-ordinal-parse-2',
        dayOfMonthOrdinalParse: /\d{1,2}/,
    });

    assert.ok(
        moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(),
        'ordinal parse uses child (default)'
    );
});

test('months', function (assert) {
    moment.defineLocale('base-months', {
        months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split(
            '_'
        ),
    });
    moment.defineLocale('child-months', {
        parentLocale: 'base-months',
        months: 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelfth '.split(
            '_'
        ),
    });
    assert.ok(
        moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'),
        'First',
        'months uses child'
    );
});

test('define child locale before parent', function (assert) {
    moment.defineLocale('months-x', null);
    moment.defineLocale('base-months-x', null);

    moment.defineLocale('months-x', {
        parentLocale: 'base-months-x',
        months: 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelfth '.split(
            '_'
        ),
    });
    assert.equal(
        moment.locale(),
        'en',
        'failed to set a locale requiring missing parent'
    );

    assert.equal(
        moment(
            '00:00:00 01/January/2017',
            'HH:mm:ss DD/MMM/YYYY',
            'months-x'
        ).locale(),
        'en',
        'creating moment using child with undefined parent defaults to global'
    );

    moment.defineLocale('base-months-x', {
        months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split(
            '_'
        ),
    });
    assert.equal(
        moment.locale(),
        'base-months-x',
        'defineLocale should also set the locale (regardless of child locales)'
    );

    assert.equal(
        moment().locale('months-x').month(0).format('MMMM'),
        'First',
        'loading child before parent locale works'
    );
});

test('lazy load parentLocale', function (assert) {
    moment.defineLocale('de_test', {
        parentLocale: 'de',
        monthsShort: [
            'M1',
            'M2',
            'M3',
            'M4',
            'M5',
            'M6',
            'M7',
            'M8',
            'M9',
            'M10',
            'M11',
            'M12',
        ],
    });
    assert.equal(
        moment.locale(),
        'de_test',
        'failed to lazy load parentLocale'
    );
});
