import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/be';

describe('locale:be', () => {
    setupLocaleTests('be');

    test('parse', () => {
        var tests =
                'студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж'.split(
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
                    'dddd, Do MMMM YYYY, HH:mm:ss',
                    'нядзеля, 14-га лютага 2010, 15:25:50',
                ],
                ['ddd, h A', 'нд, 3 дня'],
                ['M Mo MM MMMM MMM', '2 2-і 02 люты лют'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-га 14'],
                ['d do dddd ddd dd', '0 0-ы нядзеля нд нд'],
                ['DDD DDDo DDDD', '45 45-ы 045'],
                ['w wo ww', '7 7-ы 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'дня дня'],
                ['DDDo [дзень года]', '45-ы дзень года'],
                ['LT', '15:25'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 лютага 2010 г.'],
                ['LLL', '14 лютага 2010 г., 15:25'],
                ['LLLL', 'нядзеля, 14 лютага 2010 г., 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 лют 2010 г.'],
                ['lll', '14 лют 2010 г., 15:25'],
                ['llll', 'нд, 14 лют 2010 г., 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format meridiem', () => {
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'night').toBe('ночы');
        expect(moment([2012, 11, 28, 3, 59]).format('A'), 'night').toBe('ночы');
        expect(moment([2012, 11, 28, 4, 0]).format('A'), 'morning').toBe(
            'раніцы'
        );
        expect(moment([2012, 11, 28, 11, 59]).format('A'), 'morning').toBe(
            'раніцы'
        );
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 16, 59]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 17, 0]).format('A'), 'evening').toBe(
            'вечара'
        );
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'evening').toBe(
            'вечара'
        );
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1-ы').toBe('1-ы');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-і').toBe('2-і');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-і').toBe('3-і');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-ы').toBe('4-ы');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-ы').toBe('5-ы');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-ы').toBe('6-ы');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-ы').toBe('7-ы');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-ы').toBe('8-ы');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-ы').toBe('9-ы');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-ы').toBe('10-ы');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-ы').toBe('11-ы');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-ы').toBe('12-ы');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-ы').toBe('13-ы');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-ы').toBe('14-ы');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-ы').toBe('15-ы');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-ы').toBe('16-ы');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-ы').toBe('17-ы');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-ы').toBe('18-ы');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-ы').toBe('19-ы');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-ы').toBe('20-ы');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-ы').toBe('21-ы');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-і').toBe('22-і');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-і').toBe('23-і');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-ы').toBe('24-ы');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-ы').toBe('25-ы');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-ы').toBe('26-ы');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-ы').toBe('27-ы');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-ы').toBe('28-ы');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-ы').toBe('29-ы');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-ы').toBe('30-ы');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-ы').toBe('31-ы');
    });

    test('format month', () => {
        var expected =
                'студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format month case', () => {
        var months = {
                nominative:
                    'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split(
                        '_'
                    ),
                accusative:
                    'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2011, i, 1]).format('D MMMM'),
                '1 ' + months.accusative[i]
            ).toBe('1 ' + months.accusative[i]);
            expect(
                moment([2011, i, 1]).format('MMMM'),
                '1 ' + months.nominative[i]
            ).toBe(months.nominative[i]);
        }
    });

    test('format month case with escaped symbols', () => {
        var months = {
                nominative:
                    'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split(
                        '_'
                    ),
                accusative:
                    'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2013, i, 1]).format('D[] MMMM'),
                '1 ' + months.accusative[i]
            ).toBe('1 ' + months.accusative[i]);
            expect(
                moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'),
                '1 <b>' + months.accusative[i] + '</b>'
            ).toBe('<i>1</i> <b>' + months.accusative[i] + '</b>');
            expect(
                moment([2013, i, 1]).format('D[-ы дзень] MMMM'),
                '1-ы дзень ' + months.accusative[i]
            ).toBe('1-ы дзень ' + months.accusative[i]);
            expect(
                moment([2013, i, 1]).format('D, MMMM'),
                '1, ' + months.nominative[i]
            ).toBe('1, ' + months.nominative[i]);
        }
    });

    test('format week', () => {
        var expected =
                'нядзеля нд нд_панядзелак пн пн_аўторак ат ат_серада ср ср_чацвер чц чц_пятніца пт пт_субота сб сб'.split(
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
        ).toBe('некалькі секунд');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('хвіліна');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('хвіліна');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 хвіліны');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 31 }), true),
            '31 minutes = 31 minutes'
        ).toBe('31 хвіліна');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 хвіліны');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('гадзіна');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('гадзіна');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 гадзіны');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 гадзін');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 гадзіна');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('дзень');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('дзень');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 дні');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('дзень');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 дзён');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 11 }), true),
            '11 days = 11 days'
        ).toBe('11 дзён');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 21 }), true),
            '21 days = 21 days'
        ).toBe('21 дзень');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 дзён');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 месяцы');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 месяцы');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 месяцы');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 месяцаў');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('год');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 гады');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('год');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 гадоў');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('праз некалькі секунд');
        expect(moment(0).from(30000), 'suffix').toBe('некалькі секунд таму');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'праз некалькі секунд'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'праз 5 дзён'
        );
        expect(
            moment().add({ m: 31 }).fromNow(),
            'in 31 minutes = in 31 minutes'
        ).toBe('праз 31 хвіліну');
        expect(
            moment().subtract({ m: 31 }).fromNow(),
            '31 minutes ago = 31 minutes ago'
        ).toBe('31 хвіліну таму');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Сёння ў 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Сёння ў 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Сёння ў 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Заўтра ў 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Сёння ў 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Учора ў 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        function makeFormat(d) {
            return '[У] dddd [ў] LT';
        }

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format(makeFormat(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormat(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format(makeFormat(m))
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return '[У мінулую] dddd [ў] LT';
                case 1:
                case 2:
                case 4:
                    return '[У мінулы] dddd [ў] LT';
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
        ).toBe('1 01 1-ы');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1-ы');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe('2 02 2-і');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2-і');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe('3 03 3-і');
    });

    test('calendar should format', () => {
        expect(
            moment('2018-04-13').calendar(moment('2018-04-16')),
            'calendar should handle day of week'
        ).toBe('У мінулую пятніцу ў 00:00');
    });
});
