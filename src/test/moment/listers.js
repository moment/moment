import { module, test } from '../qunit';
import moment from '../../moment';

module('listers');

test('default', function (assert) {
    assert.deepEqual(moment.months(), [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]);
    assert.deepEqual(moment.monthsShort(), [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]);
    assert.deepEqual(moment.weekdays(), [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]);
    assert.deepEqual(moment.weekdaysShort(), [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]);
    assert.deepEqual(moment.weekdaysMin(), [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
    ]);
});

test('index', function (assert) {
    assert.equal(moment.months(0), 'January');
    assert.equal(moment.months(2), 'March');
    assert.equal(moment.monthsShort(0), 'Jan');
    assert.equal(moment.monthsShort(2), 'Mar');
    assert.equal(moment.weekdays(0), 'Sunday');
    assert.equal(moment.weekdays(2), 'Tuesday');
    assert.equal(moment.weekdaysShort(0), 'Sun');
    assert.equal(moment.weekdaysShort(2), 'Tue');
    assert.equal(moment.weekdaysMin(0), 'Su');
    assert.equal(moment.weekdaysMin(2), 'Tu');
});

test('localized', function (assert) {
    var months =
            'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                '_'
            ),
        monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
        weekdays = 'one_two_three_four_five_six_seven'.split('_'),
        weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
        weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
        weekdaysLocale = 'four_five_six_seven_one_two_three'.split('_'),
        weekdaysShortLocale = 'fo_fi_si_se_on_tw_th'.split('_'),
        weekdaysMinLocale = '4_5_6_7_1_2_3'.split('_'),
        week = {
            dow: 3,
            doy: 6,
        };

    moment.locale('numerologists', {
        months: months,
        monthsShort: monthsShort,
        weekdays: weekdays,
        weekdaysShort: weekdaysShort,
        weekdaysMin: weekdaysMin,
        week: week,
    });

    assert.deepEqual(moment.months(), months);
    assert.deepEqual(moment.monthsShort(), monthsShort);
    assert.deepEqual(moment.weekdays(), weekdays);
    assert.deepEqual(moment.weekdaysShort(), weekdaysShort);
    assert.deepEqual(moment.weekdaysMin(), weekdaysMin);

    assert.equal(moment.months(0), 'one');
    assert.equal(moment.monthsShort(0), 'on');
    assert.equal(moment.weekdays(0), 'one');
    assert.equal(moment.weekdaysShort(0), 'on');
    assert.equal(moment.weekdaysMin(0), '1');

    assert.equal(moment.months(2), 'three');
    assert.equal(moment.monthsShort(2), 'th');
    assert.equal(moment.weekdays(2), 'three');
    assert.equal(moment.weekdaysShort(2), 'th');
    assert.equal(moment.weekdaysMin(2), '3');

    assert.deepEqual(moment.weekdays(true), weekdaysLocale);
    assert.deepEqual(moment.weekdaysShort(true), weekdaysShortLocale);
    assert.deepEqual(moment.weekdaysMin(true), weekdaysMinLocale);

    assert.equal(moment.weekdays(true, 0), 'four');
    assert.equal(moment.weekdaysShort(true, 0), 'fo');
    assert.equal(moment.weekdaysMin(true, 0), '4');

    assert.equal(moment.weekdays(false, 2), 'three');
    assert.equal(moment.weekdaysShort(false, 2), 'th');
    assert.equal(moment.weekdaysMin(false, 2), '3');
});

test('with functions', function (assert) {
    var monthsShort =
            'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                '_'
            ),
        monthsShortWeird =
            'onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy'.split(
                '_'
            );

    moment.locale('difficult', {
        monthsShort: function (m, format) {
            var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
            return arr[m.month()];
        },
    });

    assert.deepEqual(moment.monthsShort(), monthsShort);
    assert.deepEqual(moment.monthsShort('MMM'), monthsShort);
    assert.deepEqual(moment.monthsShort('-MMM-'), monthsShortWeird);

    assert.deepEqual(moment.monthsShort('MMM', 2), 'three');
    assert.deepEqual(moment.monthsShort('-MMM-', 2), 'threesy');
    assert.deepEqual(moment.monthsShort(2), 'three');
});

test('with locale data', function (assert) {
    var months =
            'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                '_'
            ),
        monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
        weekdays = 'one_two_three_four_five_six_seven'.split('_'),
        weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
        weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
        customLocale = moment.localeData('numerologists');

    assert.deepEqual(customLocale.months(), months);
    assert.deepEqual(customLocale.monthsShort(), monthsShort);
    assert.deepEqual(customLocale.weekdays(), weekdays);
    assert.deepEqual(customLocale.weekdaysShort(), weekdaysShort);
    assert.deepEqual(customLocale.weekdaysMin(), weekdaysMin);
});
