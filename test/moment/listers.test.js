import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('listers', () => {
    test('default', () => {
        expect(moment.months()).toEqual([
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
        expect(moment.monthsShort()).toEqual([
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
        expect(moment.weekdays()).toEqual([
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]);
        expect(moment.weekdaysShort()).toEqual([
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ]);
        expect(moment.weekdaysMin()).toEqual([
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
        ]);
    });

    test('index', () => {
        expect(moment.months(0)).toBe('January');
        expect(moment.months(2)).toBe('March');
        expect(moment.monthsShort(0)).toBe('Jan');
        expect(moment.monthsShort(2)).toBe('Mar');
        expect(moment.weekdays(0)).toBe('Sunday');
        expect(moment.weekdays(2)).toBe('Tuesday');
        expect(moment.weekdaysShort(0)).toBe('Sun');
        expect(moment.weekdaysShort(2)).toBe('Tue');
        expect(moment.weekdaysMin(0)).toBe('Su');
        expect(moment.weekdaysMin(2)).toBe('Tu');
    });

    test('localized', () => {
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

        expect(moment.months()).toEqual(months);
        expect(moment.monthsShort()).toEqual(monthsShort);
        expect(moment.weekdays()).toEqual(weekdays);
        expect(moment.weekdaysShort()).toEqual(weekdaysShort);
        expect(moment.weekdaysMin()).toEqual(weekdaysMin);

        expect(moment.months(0)).toBe('one');
        expect(moment.monthsShort(0)).toBe('on');
        expect(moment.weekdays(0)).toBe('one');
        expect(moment.weekdaysShort(0)).toBe('on');
        expect(moment.weekdaysMin(0)).toBe('1');

        expect(moment.months(2)).toBe('three');
        expect(moment.monthsShort(2)).toBe('th');
        expect(moment.weekdays(2)).toBe('three');
        expect(moment.weekdaysShort(2)).toBe('th');
        expect(moment.weekdaysMin(2)).toBe('3');

        expect(moment.weekdays(true)).toEqual(weekdaysLocale);
        expect(moment.weekdaysShort(true)).toEqual(weekdaysShortLocale);
        expect(moment.weekdaysMin(true)).toEqual(weekdaysMinLocale);

        expect(moment.weekdays(true, 0)).toBe('four');
        expect(moment.weekdaysShort(true, 0)).toBe('fo');
        expect(moment.weekdaysMin(true, 0)).toBe('4');

        expect(moment.weekdays(false, 2)).toBe('three');
        expect(moment.weekdaysShort(false, 2)).toBe('th');
        expect(moment.weekdaysMin(false, 2)).toBe('3');
    });

    test('with functions', () => {
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
                var arr = format.match(/-MMM-/)
                    ? monthsShortWeird
                    : monthsShort;
                return arr[m.month()];
            },
        });

        expect(moment.monthsShort()).toEqual(monthsShort);
        expect(moment.monthsShort('MMM')).toEqual(monthsShort);
        expect(moment.monthsShort('-MMM-')).toEqual(monthsShortWeird);

        expect(moment.monthsShort('MMM', 2)).toEqual('three');
        expect(moment.monthsShort('-MMM-', 2)).toEqual('threesy');
        expect(moment.monthsShort(2)).toEqual('three');
    });

    test('with locale data', () => {
        var months =
                'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split(
                    '_'
                ),
            monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
            weekdays = 'one_two_three_four_five_six_seven'.split('_'),
            weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
            weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
            customLocale = moment.localeData('numerologists');

        expect(customLocale.months()).toEqual(months);
        expect(customLocale.monthsShort()).toEqual(monthsShort);
        expect(customLocale.weekdays()).toEqual(weekdays);
        expect(customLocale.weekdaysShort()).toEqual(weekdaysShort);
        expect(customLocale.weekdaysMin()).toEqual(weekdaysMin);
    });
});
