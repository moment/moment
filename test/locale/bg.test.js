import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/bg';

describe('locale:bg', () => {
    setupLocaleTests('bg');

    test('parse', () => {
        var tests =
                'януари яну_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
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
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);

            equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, H:mm:ss',
                    'неделя, февруари 14-ти 2010, 15:25:50',
                ],
                ['ddd, hA', 'нед, 3PM'],
                ['M Mo MM MMMM MMM', '2 2-ри 02 февруари фев'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-ти 14'],
                ['d do dddd ddd dd', '0 0-ев неделя нед нд'],
                ['DDD DDDo DDDD', '45 45-ти 045'],
                ['w wo ww', '7 7-ми 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45-ти day of the year'],
                ['LT', '15:25'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 февруари 2010'],
                ['LLL', '14 февруари 2010 15:25'],
                ['LLLL', 'неделя, 14 февруари 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 фев 2010'],
                ['lll', '14 фев 2010 15:25'],
                ['llll', 'нед, 14 фев 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1-ви').toBe('1-ви');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-ри').toBe('2-ри');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-ти').toBe('3-ти');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-ти').toBe('4-ти');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-ти').toBe('5-ти');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-ти').toBe('6-ти');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-ми').toBe('7-ми');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-ми').toBe('8-ми');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-ти').toBe('9-ти');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-ти').toBe('10-ти');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-ти').toBe('11-ти');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-ти').toBe('12-ти');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-ти').toBe('13-ти');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-ти').toBe('14-ти');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-ти').toBe('15-ти');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-ти').toBe('16-ти');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-ти').toBe('17-ти');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-ти').toBe('18-ти');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-ти').toBe('19-ти');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-ти').toBe('20-ти');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-ви').toBe('21-ви');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-ри').toBe('22-ри');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-ти').toBe('23-ти');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-ти').toBe('24-ти');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-ти').toBe('25-ти');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-ти').toBe('26-ти');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-ми').toBe('27-ми');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-ми').toBe('28-ми');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-ти').toBe('29-ти');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-ти').toBe('30-ти');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-ви').toBe('31-ви');
    });

    test('format month', () => {
        var expected =
                'януари яну_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split(
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
                'неделя нед нд_понеделник пон пн_вторник вто вт_сряда сря ср_четвъртък чет чт_петък пет пт_събота съб сб'.split(
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
        ).toBe('няколко секунди');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('минута');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('минута');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 минути');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 минути');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('час');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('час');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 часа');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 часа');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 часа');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ден');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ден');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 дена');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ден');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 дена');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 дена');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('месец');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('месец');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('месец');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 месеца');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 месеца');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 месеца');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('месец');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 месеца');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('година');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 години');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('година');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 години');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('след няколко секунди');
        expect(moment(0).from(30000), 'suffix').toBe('преди няколко секунди');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('преди няколко секунди');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'след няколко секунди'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'след 5 дена'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Днес в 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Днес в 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Днес в 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Утре в 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Днес в 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Вчера в 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [в] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [в] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [в] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
                case 0:
                case 3:
                case 6:
                    return '[Миналата] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Миналия] dddd [в] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format(makeFormat(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormat(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format(makeFormat(m))
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
            moment([2011, 11, 26]).format('w ww wo'),
            'Dec 26 2011 should be week 1'
        ).toBe('1 01 1-ви');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1-ви');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe('2 02 2-ри');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2-ри');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe('3 03 3-ти');
    });
});
