import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/uk';

describe('locale:uk', () => {
    setupLocaleTests('uk');

    test('parse', () => {
        var tests =
                'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split(
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
                    'неділя, 14-го лютого 2010, 15:25:50',
                ],
                ['ddd, h A', 'нд, 3 дня'],
                ['M Mo MM MMMM MMM', '2 2-й 02 лютий лют'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-го 14'],
                ['d do dddd ddd dd', '0 0-й неділя нд нд'],
                ['DDD DDDo DDDD', '45 45-й 045'],
                ['w wo ww', '6 6-й 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'дня дня'],
                ['DDDo [день року]', '45-й день року'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 лютого 2010 р.'],
                ['LLL', '14 лютого 2010 р., 15:25'],
                ['LLLL', 'неділя, 14 лютого 2010 р., 15:25'],
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
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'night').toBe('ночі');
        expect(moment([2012, 11, 28, 3, 59]).format('A'), 'night').toBe('ночі');
        expect(moment([2012, 11, 28, 4, 0]).format('A'), 'morning').toBe(
            'ранку'
        );
        expect(moment([2012, 11, 28, 11, 59]).format('A'), 'morning').toBe(
            'ранку'
        );
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 16, 59]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 17, 0]).format('A'), 'evening').toBe(
            'вечора'
        );
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'evening').toBe(
            'вечора'
        );
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1-й').toBe('1-й');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-й').toBe('2-й');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-й').toBe('3-й');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-й').toBe('4-й');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-й').toBe('5-й');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-й').toBe('6-й');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-й').toBe('7-й');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-й').toBe('8-й');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-й').toBe('9-й');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-й').toBe('10-й');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-й').toBe('11-й');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-й').toBe('12-й');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-й').toBe('13-й');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-й').toBe('14-й');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-й').toBe('15-й');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-й').toBe('16-й');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-й').toBe('17-й');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-й').toBe('18-й');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-й').toBe('19-й');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-й').toBe('20-й');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-й').toBe('21-й');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-й').toBe('22-й');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-й').toBe('23-й');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-й').toBe('24-й');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-й').toBe('25-й');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-й').toBe('26-й');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-й').toBe('27-й');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-й').toBe('28-й');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-й').toBe('29-й');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-й').toBe('30-й');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-й').toBe('31-й');
    });

    test('format month', () => {
        var expected =
                'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split(
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
                    'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split(
                        '_'
                    ),
                accusative:
                    'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split(
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

    test('format week', () => {
        var expected =
                'неділя нд нд_понеділок пн пн_вівторок вт вт_середа ср ср_четвер чт чт_пʼятниця пт пт_субота сб сб'.split(
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

    test('friday grammatical forms use U+02BC apostrophe', () => {
        var friday = moment([2011, 0, 7]);
        // Hard-coded expected strings so an incorrect apostrophe in
        // accusative or genitive cannot hide behind locale().weekdays().
        expect(friday.format('dddd'), 'nominative Friday uses U+02BC').toBe(
            'пʼятниця'
        );
        expect(friday.format('[У] dddd'), 'accusative Friday uses U+02BC').toBe(
            'У пʼятницю'
        );
        expect(
            friday.format('[минулої] dddd'),
            'genitive Friday uses U+02BC'
        ).toBe('минулої пʼятниці');
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 seconds = seconds'
        ).toBe('декілька секунд');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('хвилина');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('хвилина');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 хвилини');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 хвилини');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('годину');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('годину');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 години');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 годин');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 година');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 дні');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 днів');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 11 }), true),
            '11 days = 11 days'
        ).toBe('11 днів');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 21 }), true),
            '21 days = 21 days'
        ).toBe('21 день');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 днів');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('місяць');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('місяць');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('місяць');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 місяці');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 місяці');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 місяці');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('місяць');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 місяців');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('рік');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 роки');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('рік');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 років');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('за декілька секунд');
        expect(moment(0).from(30000), 'suffix').toBe('декілька секунд тому');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in seconds').toBe(
            'за декілька секунд'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('за 5 днів');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Сьогодні о 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Сьогодні о 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Сьогодні о 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Завтра о 12:00');
        expect(
            moment(a).subtract({ h: 2 }).calendar(),
            'Now minus 2 hours'
        ).toBe('Сьогодні о 10:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Вчора о 12:00');
        // A special case for Ukrainian since 11 hours have different preposition
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            "same day at 11 o'clock"
        ).toBe('Сьогодні об 11:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[У] dddd [о' + (m.hours() === 11 ? 'б' : '') + '] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[У] dddd [о] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[У] dddd [о] LT')
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
                    return (
                        '[Минулої] dddd [о' +
                        (d.hours() === 11 ? 'б' : '') +
                        '] LT'
                    );
                case 1:
                case 2:
                case 4:
                    return (
                        '[Минулого] dddd [о' +
                        (d.hours() === 11 ? 'б' : '') +
                        '] LT'
                    );
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
            'Dec 26 2011 should be week 52 of 2011'
        ).toBe('52 52 52-й');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52 of 2011'
        ).toBe('52 52 52-й');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1-й');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1-й');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2-й');
    });
});
