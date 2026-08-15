import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/fa';

describe('locale:fa', () => {
    setupLocaleTests('fa');

    test('parse', () => {
        var tests =
                'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split(
                    '_'
                ),
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

        function equalTestStrict(input, mmm, monthIndex) {
            expect(
                moment(input, mmm, true).month(),
                input +
                    ' ' +
                    mmm +
                    ' should be strict month ' +
                    (monthIndex + 1)
            ).toBe(monthIndex);
        }

        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);

            equalTestStrict(tests[i], 'MMM', i);
            equalTestStrict(tests[i], 'MMMM', i);
            equalTestStrict(tests[i].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(tests[i].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'یک\u200cشنبه، فوریه ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ بعد از ظهر',
                ],
                ['ddd, hA', 'یک\u200cشنبه، ۳بعد از ظهر'],
                ['M Mo MM MMMM MMM', '۲ ۲م ۰۲ فوریه فوریه'],
                ['YYYY YY', '۲۰۱۰ ۱۰'],
                ['D Do DD', '۱۴ ۱۴م ۱۴'],
                ['d do dddd ddd dd', '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
                ['DDD DDDo DDDD', '۴۵ ۴۵م ۰۴۵'],
                ['w wo ww', '۸ ۸م ۰۸'],
                ['h hh', '۳ ۰۳'],
                ['H HH', '۱۵ ۱۵'],
                ['m mm', '۲۵ ۲۵'],
                ['s ss', '۵۰ ۵۰'],
                ['a A', 'بعد از ظهر بعد از ظهر'],
                ['DDDo [روز سال]', '۴۵م روز سال'],
                ['LTS', '۱۵:۲۵:۵۰'],
                ['L', '۱۴/۰۲/۲۰۱۰'],
                ['LL', '۱۴ فوریه ۲۰۱۰'],
                ['LLL', '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['LLLL', 'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['l', '۱۴/۲/۲۰۱۰'],
                ['ll', '۱۴ فوریه ۲۰۱۰'],
                ['lll', '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['llll', 'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1').toBe('۱م');
        expect(moment([2011, 0, 2]).format('DDDo'), '2').toBe('۲م');
        expect(moment([2011, 0, 3]).format('DDDo'), '3').toBe('۳م');
        expect(moment([2011, 0, 4]).format('DDDo'), '4').toBe('۴م');
        expect(moment([2011, 0, 5]).format('DDDo'), '5').toBe('۵م');
        expect(moment([2011, 0, 6]).format('DDDo'), '6').toBe('۶م');
        expect(moment([2011, 0, 7]).format('DDDo'), '7').toBe('۷م');
        expect(moment([2011, 0, 8]).format('DDDo'), '8').toBe('۸م');
        expect(moment([2011, 0, 9]).format('DDDo'), '9').toBe('۹م');
        expect(moment([2011, 0, 10]).format('DDDo'), '10').toBe('۱۰م');

        expect(moment([2011, 0, 11]).format('DDDo'), '11').toBe('۱۱م');
        expect(moment([2011, 0, 12]).format('DDDo'), '12').toBe('۱۲م');
        expect(moment([2011, 0, 13]).format('DDDo'), '13').toBe('۱۳م');
        expect(moment([2011, 0, 14]).format('DDDo'), '14').toBe('۱۴م');
        expect(moment([2011, 0, 15]).format('DDDo'), '15').toBe('۱۵م');
        expect(moment([2011, 0, 16]).format('DDDo'), '16').toBe('۱۶م');
        expect(moment([2011, 0, 17]).format('DDDo'), '17').toBe('۱۷م');
        expect(moment([2011, 0, 18]).format('DDDo'), '18').toBe('۱۸م');
        expect(moment([2011, 0, 19]).format('DDDo'), '19').toBe('۱۹م');
        expect(moment([2011, 0, 20]).format('DDDo'), '20').toBe('۲۰م');

        expect(moment([2011, 0, 21]).format('DDDo'), '21').toBe('۲۱م');
        expect(moment([2011, 0, 22]).format('DDDo'), '22').toBe('۲۲م');
        expect(moment([2011, 0, 23]).format('DDDo'), '23').toBe('۲۳م');
        expect(moment([2011, 0, 24]).format('DDDo'), '24').toBe('۲۴م');
        expect(moment([2011, 0, 25]).format('DDDo'), '25').toBe('۲۵م');
        expect(moment([2011, 0, 26]).format('DDDo'), '26').toBe('۲۶م');
        expect(moment([2011, 0, 27]).format('DDDo'), '27').toBe('۲۷م');
        expect(moment([2011, 0, 28]).format('DDDo'), '28').toBe('۲۸م');
        expect(moment([2011, 0, 29]).format('DDDo'), '29').toBe('۲۹م');
        expect(moment([2011, 0, 30]).format('DDDo'), '30').toBe('۳۰م');

        expect(moment([2011, 0, 31]).format('DDDo'), '31').toBe('۳۱م');
    });

    test('format month', () => {
        var expected =
                'ژانویه ژانویه_فوریه فوریه_مارس مارس_آوریل آوریل_مه مه_ژوئن ژوئن_ژوئیه ژوئیه_اوت اوت_سپتامبر سپتامبر_اکتبر اکتبر_نوامبر نوامبر_دسامبر دسامبر'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split(
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
        var start = moment([2007, 1, 28]),
            s,
            ss;
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = a few seconds'
        ).toBe('چند ثانیه');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('یک دقیقه');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('یک دقیقه');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('۲ دقیقه');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('۴۴ دقیقه');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('یک ساعت');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('یک ساعت');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('۲ ساعت');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('۵ ساعت');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('۲۱ ساعت');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('یک روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('یک روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('۲ روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('یک روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('۵ روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('۲۵ روز');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('یک ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('یک ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('یک ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('۲ ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('۲ ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('۳ ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('یک ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('۵ ماه');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('یک سال');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('۲ سال');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('یک سال');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('۵ سال');

        s = moment.relativeTimeThreshold('s');
        ss = moment.relativeTimeThreshold('ss');

        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('ss', 0);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = 44 seconds'
        ).toBe('۴۴ ثانیه');
        moment.relativeTimeThreshold('s', s);
        moment.relativeTimeThreshold('ss', ss);
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('در چند ثانیه');
        expect(moment(0).from(30000), 'suffix').toBe('چند ثانیه پیش');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('چند ثانیه پیش');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'در چند ثانیه'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('در ۵ روز');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'امروز ساعت ۱۲:۰۰'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'امروز ساعت ۱۲:۲۵'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'امروز ساعت ۱۳:۰۰'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('فردا ساعت ۱۲:۰۰');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('امروز ساعت ۱۱:۰۰');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('دیروز ساعت ۱۲:۰۰');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [ساعت] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [ساعت] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [ساعت] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [پیش ساعت] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [پیش ساعت] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [پیش ساعت] LT')
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

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2011, 11, 31]).format('w ww wo'),
            'Dec 31 2011 should be week 1'
        ).toBe('۱ ۰۱ ۱م');
        expect(
            moment([2012, 0, 6]).format('w ww wo'),
            'Jan  6 2012 should be week 1'
        ).toBe('۱ ۰۱ ۱م');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 2'
        ).toBe('۲ ۰۲ ۲م');
        expect(
            moment([2012, 0, 13]).format('w ww wo'),
            'Jan 13 2012 should be week 2'
        ).toBe('۲ ۰۲ ۲م');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 3'
        ).toBe('۳ ۰۳ ۳م');
    });
});
