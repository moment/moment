import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ar-ly';

describe('locale:ar-ly', () => {
    setupLocaleTests('ar-ly');

    var months = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ];

    test('parse', () => {
        var tests = months,
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input +
                    ' should be month ' +
                    (i + 1) +
                    ' instead is month ' +
                    moment(input, mmm).month()
            ).toBe(i);
        }

        // function equalTestStrict(input, mmm, monthIndex) {
        //         moment(input, mmm, true).month(),
        //         monthIndex,
        //         input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1)
        //     );
        // }

        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);

            // All strict parsing tests fail
            // equalTestStrict(tests[i][1], 'MMM', i);
            // equalTestStrict(tests[i][0], 'MMMM', i);
            // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            // equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            // equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'الأحد، فبراير 14 2010، 3:25:50 م',
                ],
                ['ddd, hA', 'أحد، 3م'],
                ['M Mo MM MMMM MMM', '2 2 02 فبراير فبراير'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 الأحد أحد ح'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '8 8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'م م'],
                ['[the] DDDo [day of the year]', 'the 45 day of the year'],
                ['LT', '15:25'],
                ['LTS', '15:25:50'],
                ['L', '14/\u200f2/\u200f2010'],
                ['LL', '14 فبراير 2010'],
                ['LLL', '14 فبراير 2010 15:25'],
                ['LLLL', 'الأحد 14 فبراير 2010 15:25'],
                ['l', '14/\u200f2/\u200f2010'],
                ['ll', '14 فبراير 2010'],
                ['lll', '14 فبراير 2010 15:25'],
                ['llll', 'أحد 14 فبراير 2010 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1').toBe('1');
        expect(moment([2011, 0, 2]).format('DDDo'), '2').toBe('2');
        expect(moment([2011, 0, 3]).format('DDDo'), '3').toBe('3');
        expect(moment([2011, 0, 4]).format('DDDo'), '4').toBe('4');
        expect(moment([2011, 0, 5]).format('DDDo'), '5').toBe('5');
        expect(moment([2011, 0, 6]).format('DDDo'), '6').toBe('6');
        expect(moment([2011, 0, 7]).format('DDDo'), '7').toBe('7');
        expect(moment([2011, 0, 8]).format('DDDo'), '8').toBe('8');
        expect(moment([2011, 0, 9]).format('DDDo'), '9').toBe('9');
        expect(moment([2011, 0, 10]).format('DDDo'), '10').toBe('10');

        expect(moment([2011, 0, 11]).format('DDDo'), '11').toBe('11');
        expect(moment([2011, 0, 12]).format('DDDo'), '12').toBe('12');
        expect(moment([2011, 0, 13]).format('DDDo'), '13').toBe('13');
        expect(moment([2011, 0, 14]).format('DDDo'), '14').toBe('14');
        expect(moment([2011, 0, 15]).format('DDDo'), '15').toBe('15');
        expect(moment([2011, 0, 16]).format('DDDo'), '16').toBe('16');
        expect(moment([2011, 0, 17]).format('DDDo'), '17').toBe('17');
        expect(moment([2011, 0, 18]).format('DDDo'), '18').toBe('18');
        expect(moment([2011, 0, 19]).format('DDDo'), '19').toBe('19');
        expect(moment([2011, 0, 20]).format('DDDo'), '20').toBe('20');

        expect(moment([2011, 0, 21]).format('DDDo'), '21').toBe('21');
        expect(moment([2011, 0, 22]).format('DDDo'), '22').toBe('22');
        expect(moment([2011, 0, 23]).format('DDDo'), '23').toBe('23');
        expect(moment([2011, 0, 24]).format('DDDo'), '24').toBe('24');
        expect(moment([2011, 0, 25]).format('DDDo'), '25').toBe('25');
        expect(moment([2011, 0, 26]).format('DDDo'), '26').toBe('26');
        expect(moment([2011, 0, 27]).format('DDDo'), '27').toBe('27');
        expect(moment([2011, 0, 28]).format('DDDo'), '28').toBe('28');
        expect(moment([2011, 0, 29]).format('DDDo'), '29').toBe('29');
        expect(moment([2011, 0, 30]).format('DDDo'), '30').toBe('30');

        expect(moment([2011, 0, 31]).format('DDDo'), '31').toBe('31');
    });

    test('format month', () => {
        var expected = months,
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM'), expected[i]).toBe(
                expected[i]
            );
            expect(moment([2011, i, 1]).format('MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = a few seconds'
        ).toBe('44 ثانية');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('دقيقة واحدة');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('دقيقة واحدة');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('دقيقتان');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 دقيقة');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ساعة واحدة');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ساعة واحدة');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('ساعتان');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 ساعات');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 ساعة');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('يوم واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('يوم واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('يومان');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('يوم واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 أيام');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 يومًا');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('شهر واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('شهر واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('شهر واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('شهران');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('شهران');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 أشهر');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('شهر واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 أشهر');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('عام واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('عامان');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('عام واحد');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 أعوام');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('بعد 30 ثانية');
        expect(moment(0).from(30000), 'suffix').toBe('منذ 30 ثانية');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('منذ ثانية واحدة');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'بعد 30 ثانية'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'بعد 5 أيام'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'اليوم عند الساعة 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'اليوم عند الساعة 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'اليوم عند الساعة 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('غدًا عند الساعة 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('اليوم عند الساعة 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('أمس عند الساعة 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [عند الساعة] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [عند الساعة] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [عند الساعة] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [عند الساعة] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [عند الساعة] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [عند الساعة] LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 week ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 1 week').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 weeks ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 2 weeks').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting wednesday custom', () => {
        expect(
            moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'),
            'Week 1 of 2003 should be Dec 28 2002'
        ).toBe('2002-12-28');
        expect(
            moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'),
            'Week 1 of 2003 should be Dec 28 2002'
        ).toBe('2002-12-28');
        expect(
            moment('2003 1 6', 'gggg w d').format('gggg w d'),
            'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6'
        ).toBe('2003 1 6');
        expect(
            moment('2003 1 0', 'gggg w e').format('gggg w e'),
            '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0'
        ).toBe('2003 1 0');
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2011, 11, 31]).format('w ww wo'),
            'Dec 31 2011 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 6]).format('w ww wo'),
            'Jan  6 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 13]).format('w ww wo'),
            'Jan 13 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 3'
        ).toBe('3 03 3');
    });

    test('no leading zeros in long date formats', () => {
        var i, j, longDateStr, shortDateStr;
        for (i = 1; i <= 9; ++i) {
            for (j = 1; j <= 9; ++j) {
                longDateStr = moment([2014, i, j]).format('L');
                shortDateStr = moment([2014, i, j]).format('l');
                expect(
                    longDateStr,
                    'should not have leading zeros in month or day'
                ).toBe(shortDateStr);
            }
        }
    });

    // locale-specific
    test('ar-ly strict mode parsing works', () => {
        var m, formattedDate;
        m = moment().locale('ar-ly');
        formattedDate = m.format('l');
        expect(
            moment.utc(formattedDate, 'l', 'ar-ly', false).isValid(),
            'Non-strict parsing works'
        ).toBe(true);
        expect(
            moment.utc(formattedDate, 'l', 'ar-ly', true).isValid(),
            'Strict parsing must work'
        ).toBe(true);
    });
});
