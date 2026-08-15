import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/km';

describe('locale:km', () => {
    setupLocaleTests('km');

    test('parse', () => {
        var tests =
                'មករា មករា_កុម្ភៈ កុម្ភៈ_មីនា មីនា_មេសា មេសា_ឧសភា ឧសភា_មិថុនា មិថុនា_កក្កដា កក្កដា_សីហា សីហា_កញ្ញា កញ្ញា_តុលា តុលា_វិច្ឆិកា វិច្ឆិកា_ធ្នូ ធ្នូ'.split(
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
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'អាទិត្យ, កុម្ភៈ ទី១៤ ២០១០, ៣:២៥:៥០ ល្ងាច',
                ],
                ['ddd, hA', 'អា, ៣ល្ងាច'],
                ['M Mo MM MMMM MMM', '២ ទី២ ០២ កុម្ភៈ កុម្ភៈ'],
                ['YYYY YY', '២០១០ ១០'],
                ['D Do DD', '១៤ ទី១៤ ១៤'],
                ['d do dddd ddd dd', '០ ទី០ អាទិត្យ អា អា'],
                ['DDD DDDo DDDD', '៤៥ ទី៤៥ ០៤៥'],
                ['w wo ww', '៦ ទី៦ ០៦'],
                ['h hh', '៣ ០៣'],
                ['H HH', '១៥ ១៥'],
                ['m mm', '២៥ ២៥'],
                ['s ss', '៥០ ៥០'],
                ['a A', 'ល្ងាច ល្ងាច'],
                ['[the] DDDo [day of the year]', 'the ទី៤៥ day of the year'],
                ['LTS', '១៥:២៥:៥០'],
                ['L', '១៤/០២/២០១០'],
                ['LL', '១៤ កុម្ភៈ ២០១០'],
                ['LLL', '១៤ កុម្ភៈ ២០១០ ១៥:២៥'],
                ['LLLL', 'អាទិត្យ, ១៤ កុម្ភៈ ២០១០ ១៥:២៥'],
                ['l', '១៤/២/២០១០'],
                ['ll', '១៤ កុម្ភៈ ២០១០'],
                ['lll', '១៤ កុម្ភៈ ២០១០ ១៥:២៥'],
                ['llll', 'អា, ១៤ កុម្ភៈ ២០១០ ១៥:២៥'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1st').toBe('ទី១');
        expect(moment([2011, 0, 2]).format('DDDo'), '2nd').toBe('ទី២');
        expect(moment([2011, 0, 3]).format('DDDo'), '3rd').toBe('ទី៣');
        expect(moment([2011, 0, 4]).format('DDDo'), '4th').toBe('ទី៤');
        expect(moment([2011, 0, 5]).format('DDDo'), '5th').toBe('ទី៥');
        expect(moment([2011, 0, 6]).format('DDDo'), '6th').toBe('ទី៦');
        expect(moment([2011, 0, 7]).format('DDDo'), '7th').toBe('ទី៧');
        expect(moment([2011, 0, 8]).format('DDDo'), '8th').toBe('ទី៨');
        expect(moment([2011, 0, 9]).format('DDDo'), '9th').toBe('ទី៩');
        expect(moment([2011, 0, 10]).format('DDDo'), '10th').toBe('ទី១០');

        expect(moment([2011, 0, 11]).format('DDDo'), '11st').toBe('ទី១១');
        expect(moment([2011, 0, 12]).format('DDDo'), '12nd').toBe('ទី១២');
        expect(moment([2011, 0, 13]).format('DDDo'), '13rd').toBe('ទី១៣');
        expect(moment([2011, 0, 14]).format('DDDo'), '14th').toBe('ទី១៤');
        expect(moment([2011, 0, 15]).format('DDDo'), '15th').toBe('ទី១៥');
        expect(moment([2011, 0, 16]).format('DDDo'), '16th').toBe('ទី១៦');
        expect(moment([2011, 0, 17]).format('DDDo'), '17th').toBe('ទី១៧');
        expect(moment([2011, 0, 18]).format('DDDo'), '18th').toBe('ទី១៨');
        expect(moment([2011, 0, 19]).format('DDDo'), '19th').toBe('ទី១៩');
        expect(moment([2011, 0, 20]).format('DDDo'), '20th').toBe('ទី២០');

        expect(moment([2011, 0, 21]).format('DDDo'), '21st').toBe('ទី២១');
        expect(moment([2011, 0, 22]).format('DDDo'), '22nd').toBe('ទី២២');
        expect(moment([2011, 0, 23]).format('DDDo'), '23rd').toBe('ទី២៣');
        expect(moment([2011, 0, 24]).format('DDDo'), '24th').toBe('ទី២៤');
        expect(moment([2011, 0, 25]).format('DDDo'), '25th').toBe('ទី២៥');
        expect(moment([2011, 0, 26]).format('DDDo'), '26th').toBe('ទី២៦');
        expect(moment([2011, 0, 27]).format('DDDo'), '27th').toBe('ទី២៧');
        expect(moment([2011, 0, 28]).format('DDDo'), '28th').toBe('ទី២៨');
        expect(moment([2011, 0, 29]).format('DDDo'), '29th').toBe('ទី២៩');
        expect(moment([2011, 0, 30]).format('DDDo'), '30th').toBe('ទី៣០');

        expect(moment([2011, 0, 31]).format('DDDo'), '31st').toBe('ទី៣១');
    });

    test('format month', () => {
        var expected =
                'មករា មករា_កុម្ភៈ កុម្ភៈ_មីនា មីនា_មេសា មេសា_ឧសភា ឧសភា_មិថុនា មិថុនា_កក្កដា កក្កដា_សីហា សីហា_កញ្ញា កញ្ញា_តុលា តុលា_វិច្ឆិកា វិច្ឆិកា_ធ្នូ ធ្នូ'.split(
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
                'អាទិត្យ អា អា_ច័ន្ទ ច ច_អង្គារ អ អ_ពុធ ព ព_ព្រហស្បតិ៍ ព្រ ព្រ_សុក្រ សុ សុ_សៅរ៍ ស ស'.split(
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
            '44 seconds = ប៉ុន្មានវិនាទី'
        ).toBe('ប៉ុន្មានវិនាទី');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = មួយនាទី'
        ).toBe('មួយនាទី');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = មួយនាទី'
        ).toBe('មួយនាទី');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 នាទី'
        ).toBe('២ នាទី');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 នាទី'
        ).toBe('៤៤ នាទី');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = មួយម៉ោង'
        ).toBe('មួយម៉ោង');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = មួយម៉ោង'
        ).toBe('មួយម៉ោង');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 ម៉ោង'
        ).toBe('២ ម៉ោង');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 ម៉ោង'
        ).toBe('៥ ម៉ោង');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 ម៉ោង'
        ).toBe('២១ ម៉ោង');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = មួយថ្ងៃ'
        ).toBe('មួយថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = មួយថ្ងៃ'
        ).toBe('មួយថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 ថ្ងៃ'
        ).toBe('២ ថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = មួយថ្ងៃ'
        ).toBe('មួយថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 ថ្ងៃ'
        ).toBe('៥ ថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 ថ្ងៃ'
        ).toBe('២៥ ថ្ងៃ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = មួយខែ'
        ).toBe('មួយខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = មួយខែ'
        ).toBe('មួយខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = មួយខែ'
        ).toBe('មួយខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 ខែ'
        ).toBe('២ ខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 ខែ'
        ).toBe('២ ខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 ខែ'
        ).toBe('៣ ខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = មួយខែ'
        ).toBe('មួយខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 ខែ'
        ).toBe('៥ ខែ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = មួយឆ្នាំ'
        ).toBe('មួយឆ្នាំ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 ឆ្នាំ'
        ).toBe('២ ឆ្នាំ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = មួយឆ្នាំ'
        ).toBe('មួយឆ្នាំ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 ឆ្នាំ'
        ).toBe('៥ ឆ្នាំ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ប៉ុន្មានវិនាទីទៀត');
        expect(moment(0).from(30000), 'suffix').toBe('ប៉ុន្មានវិនាទីមុន');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ប៉ុន្មានវិនាទីមុន');
    });

    test('fromNow', () => {
        expect(
            moment()
                .add({
                    s: 30,
                })
                .fromNow(),
            'in a few seconds'
        ).toBe('ប៉ុន្មានវិនាទីទៀត');
        expect(
            moment()
                .add({
                    d: 5,
                })
                .fromNow(),
            'in 5 days'
        ).toBe('៥ ថ្ងៃទៀត');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ថ្ងៃនេះ ម៉ោង ១២:០០'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ថ្ងៃនេះ ម៉ោង ១២:២៥'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'ថ្ងៃនេះ ម៉ោង ១៣:០០'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('ស្អែក ម៉ោង ១២:០០');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ថ្ងៃនេះ ម៉ោង ១១:០០');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ម្សិលមិញ ម៉ោង ១២:០០');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({
                d: i,
            });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [ម៉ោង] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [ម៉ោង] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [ម៉ោង] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({
                d: i,
            });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({
                w: 1,
            }),
            weeksFromNow = moment().add({
                w: 1,
            });

        expect(weeksAgo.calendar(), '1 week ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 1 week').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({
            w: 2,
        });
        weeksFromNow = moment().add({
            w: 2,
        });

        expect(weeksAgo.calendar(), '2 weeks ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 2 weeks').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('៥២ ៥២ ទី៥២');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('១ ០១ ទី១');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('១ ០១ ទី១');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('២ ០២ ទី២');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('២ ០២ ទី២');
    });
});
