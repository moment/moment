import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/el';

describe('locale:el', () => {
    setupLocaleTests('el');

    test('parse', () => {
        var i,
            tests =
                'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split(
                    '_'
                );

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

    test('parse meridiem', () => {
        var i,
            b = moment(),
            meridiemTests = [
                // h a patterns, expected hours, isValid
                ['10 πμ', 10, true],
                ['10 μμ', 22, true],
                ['10 π.μ.', 10, true],
                ['10 μ.μ.', 22, true],
                ['10 π', 10, true],
                ['10 μ', 22, true],
                ['10 ΠΜ', 10, true],
                ['10 ΜΜ', 22, true],
                ['10 Π.Μ.', 10, true],
                ['10 Μ.Μ.', 22, true],
                ['10 Π', 10, true],
                ['10 Μ', 22, true],
                ['10 am', 10, false],
                ['10 pm', 10, false],
            ],
            parsed;

        // test that a formatted moment including meridiem string can be parsed back to the same moment
        expect(
            b.isSame(
                moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true),
                'seconds'
            ),
            b.format('h:mm:ss a') +
                ' should be equal to ' +
                moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true).format(
                    'h:mm:ss a'
                )
        ).toBeTruthy();

        // test that a formatted moment having a meridiem string can be parsed with strict flag
        expect(
            moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true).isValid(),
            b.format('h:mm:ss a') + ' should be parsed as valid'
        ).toBeTruthy();

        for (i = 0; i < meridiemTests.length; i++) {
            parsed = moment(meridiemTests[i][0], 'h a', 'el', true);
            expect(
                parsed.isValid(),
                'validity for ' + meridiemTests[i][0]
            ).toBe(meridiemTests[i][2]);
            if (parsed.isValid()) {
                expect(parsed.hours(), 'hours for ' + meridiemTests[i][0]).toBe(
                    meridiemTests[i][1]
                );
            }
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'Κυριακή, Φεβρουάριος 14η 2010, 3:25:50 μμ',
                ],
                [
                    'dddd, D MMMM YYYY, h:mm:ss a',
                    'Κυριακή, 14 Φεβρουαρίου 2010, 3:25:50 μμ',
                ],
                ['ddd, hA', 'Κυρ, 3ΜΜ'],
                ['dddd, MMMM YYYY', 'Κυριακή, Φεβρουάριος 2010'],
                ['M Mo MM MMMM MMM', '2 2η 02 Φεβρουάριος Φεβ'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14η 14'],
                ['d do dddd ddd dd', '0 0η Κυριακή Κυρ Κυ'],
                ['DDD DDDo DDDD', '45 45η 045'],
                ['w wo ww', '6 6η 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'μμ ΜΜ'],
                ['[the] DDDo [day of the year]', 'the 45η day of the year'],
                ['LTS', '3:25:50 ΜΜ'],
                ['L', '14/02/2010'],
                ['LL', '14 Φεβρουαρίου 2010'],
                ['LLL', '14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['LLLL', 'Κυριακή, 14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['l', '14/2/2010'],
                ['ll', '14 Φεβ 2010'],
                ['lll', '14 Φεβ 2010 3:25 ΜΜ'],
                ['llll', 'Κυρ, 14 Φεβ 2010 3:25 ΜΜ'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1η').toBe('1η');
        expect(moment([2011, 0, 2]).format('DDDo'), '2η').toBe('2η');
        expect(moment([2011, 0, 3]).format('DDDo'), '3η').toBe('3η');
        expect(moment([2011, 0, 4]).format('DDDo'), '4η').toBe('4η');
        expect(moment([2011, 0, 5]).format('DDDo'), '5η').toBe('5η');
        expect(moment([2011, 0, 6]).format('DDDo'), '6η').toBe('6η');
        expect(moment([2011, 0, 7]).format('DDDo'), '7η').toBe('7η');
        expect(moment([2011, 0, 8]).format('DDDo'), '8η').toBe('8η');
        expect(moment([2011, 0, 9]).format('DDDo'), '9η').toBe('9η');
        expect(moment([2011, 0, 10]).format('DDDo'), '10η').toBe('10η');

        expect(moment([2011, 0, 11]).format('DDDo'), '11η').toBe('11η');
        expect(moment([2011, 0, 12]).format('DDDo'), '12η').toBe('12η');
        expect(moment([2011, 0, 13]).format('DDDo'), '13η').toBe('13η');
        expect(moment([2011, 0, 14]).format('DDDo'), '14η').toBe('14η');
        expect(moment([2011, 0, 15]).format('DDDo'), '15η').toBe('15η');
        expect(moment([2011, 0, 16]).format('DDDo'), '16η').toBe('16η');
        expect(moment([2011, 0, 17]).format('DDDo'), '17η').toBe('17η');
        expect(moment([2011, 0, 18]).format('DDDo'), '18η').toBe('18η');
        expect(moment([2011, 0, 19]).format('DDDo'), '19η').toBe('19η');
        expect(moment([2011, 0, 20]).format('DDDo'), '20η').toBe('20η');

        expect(moment([2011, 0, 21]).format('DDDo'), '21η').toBe('21η');
        expect(moment([2011, 0, 22]).format('DDDo'), '22η').toBe('22η');
        expect(moment([2011, 0, 23]).format('DDDo'), '23η').toBe('23η');
        expect(moment([2011, 0, 24]).format('DDDo'), '24η').toBe('24η');
        expect(moment([2011, 0, 25]).format('DDDo'), '25η').toBe('25η');
        expect(moment([2011, 0, 26]).format('DDDo'), '26η').toBe('26η');
        expect(moment([2011, 0, 27]).format('DDDo'), '27η').toBe('27η');
        expect(moment([2011, 0, 28]).format('DDDo'), '28η').toBe('28η');
        expect(moment([2011, 0, 29]).format('DDDo'), '29η').toBe('29η');
        expect(moment([2011, 0, 30]).format('DDDo'), '30η').toBe('30η');

        expect(moment([2011, 0, 31]).format('DDDo'), '31η').toBe('31η');
    });

    test('format month', () => {
        var i,
            expected =
                'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split(
                    '_'
                );

        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var i,
            expected =
                'Κυριακή Κυρ Κυ_Δευτέρα Δευ Δε_Τρίτη Τρι Τρ_Τετάρτη Τετ Τε_Πέμπτη Πεμ Πε_Παρασκευή Παρ Πα_Σάββατο Σαβ Σα'.split(
                    '_'
                );

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
        ).toBe('λίγα δευτερόλεπτα');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ένα λεπτό');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ένα λεπτό');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 λεπτά');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 λεπτά');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('μία ώρα');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('μία ώρα');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 ώρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 ώρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 ώρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('μία μέρα');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('μία μέρα');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 μέρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('μία μέρα');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 μέρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 μέρες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ένας μήνας');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ένας μήνας');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ένας μήνας');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 μήνες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 μήνες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 μήνες');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ένας μήνας');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 μήνες');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ένας χρόνος');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 χρόνια');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ένας χρόνος');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 χρόνια');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('σε λίγα δευτερόλεπτα');
        expect(moment(0).from(30000), 'suffix').toBe('λίγα δευτερόλεπτα πριν');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('λίγα δευτερόλεπτα πριν');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'σε λίγα δευτερόλεπτα'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'σε 5 μέρες'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Σήμερα στις 12:00 ΜΜ'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Σήμερα στις 12:25 ΜΜ'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Σήμερα στη 1:00 ΜΜ'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Αύριο στις 12:00 ΜΜ');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Σήμερα στις 11:00 ΠΜ');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Χθες στις 12:00 ΜΜ');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format(
                    'dddd [' + (m.hours() % 12 === 1 ? 'στη' : 'στις') + '] LT'
                )
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [στις] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [στις] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m, dayString;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            dayString =
                m.day() === 6
                    ? '[το προηγούμενο Σάββατο]'
                    : '[την προηγούμενη] dddd';
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format(
                    dayString +
                        ' [' +
                        (m.hours() % 12 === 1 ? 'στη' : 'στις') +
                        '] LT'
                )
            );
            m.hours(1).minutes(30).seconds(0).milliseconds(0);
            expect(m.calendar(), 'Today - ' + i + ' days one o clock').toBe(
                m.format(dayString + ' [στη] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format(dayString + ' [στις] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format(dayString + ' [στις] LT')
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

    test('weeks year starting sunday format', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52η');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1η');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1η');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 2η');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2η');
    });

    test('localeData months calls', () => {
        var jan = moment('2012-01-01');
        expect(
            moment.localeData().months(jan),
            'should return the nominative month name'
        ).toBe('Ιανουάριος');
        expect(
            moment.localeData().months(jan, 'D MMMM'),
            'should return the genitive month name'
        ).toBe('Ιανουαρίου');
    });
});
