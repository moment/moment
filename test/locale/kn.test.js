import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/kn';

describe('locale:kn', () => {
    setupLocaleTests('kn');

    test('parse', () => {
        var tests =
                'ಜನವರಿ ಜನ_ಫೆಬ್ರವರಿ ಫೆಬ್ರ_ಮಾರ್ಚ್ ಮಾರ್ಚ್_ಏಪ್ರಿಲ್ ಏಪ್ರಿಲ್_ಮೇ ಮೇ_ಜೂನ್ ಜೂನ್_ಜುಲೈ ಜುಲೈ_ಆಗಸ್ಟ್ ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬರ್ ಅಕ್ಟೋ_ನವೆಂಬರ್ ನವೆಂ_ಡಿಸೆಂಬರ್ ಡಿಸೆಂ'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }
        // function equalTestStrict(input, mmm, monthIndex) {
        //         moment(input, mmm, true).month(),
        //         monthIndex,
        //         input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1)
        //     );
        // }

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

            // All strict parsing fails only for month 9 (index 8)
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
                    'dddd, Do MMMM YYYY, a h:mm:ss',
                    'ಭಾನುವಾರ, ೧೪ನೇ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫:೫೦',
                ],
                ['ddd, a h ಗಂಟೆ', 'ಭಾನು, ಮಧ್ಯಾಹ್ನ ೩ ಗಂಟೆ'],
                ['M Mo MM MMMM MMM', '೨ ೨ನೇ ೦೨ ಫೆಬ್ರವರಿ ಫೆಬ್ರ'],
                ['YYYY YY', '೨೦೧೦ ೧೦'],
                ['D Do DD', '೧೪ ೧೪ನೇ ೧೪'],
                ['d do dddd ddd dd', '೦ ೦ನೇ ಭಾನುವಾರ ಭಾನು ಭಾ'],
                ['DDD DDDo DDDD', '೪೫ ೪೫ನೇ ೦೪೫'],
                ['w wo ww', '೮ ೮ನೇ ೦೮'],
                ['h hh', '೩ ೦೩'],
                ['H HH', '೧೫ ೧೫'],
                ['m mm', '೨೫ ೨೫'],
                ['s ss', '೫೦ ೫೦'],
                ['a A', 'ಮಧ್ಯಾಹ್ನ ಮಧ್ಯಾಹ್ನ'],
                ['LTS', 'ಮಧ್ಯಾಹ್ನ ೩:೨೫:೫೦'],
                ['L', '೧೪/೦೨/೨೦೧೦'],
                ['LL', '೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦'],
                ['LLL', '೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
                ['LLLL', 'ಭಾನುವಾರ, ೧೪ ಫೆಬ್ರವರಿ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
                ['l', '೧೪/೨/೨೦೧೦'],
                ['ll', '೧೪ ಫೆಬ್ರ ೨೦೧೦'],
                ['lll', '೧೪ ಫೆಬ್ರ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
                ['llll', 'ಭಾನು, ೧೪ ಫೆಬ್ರ ೨೦೧೦, ಮಧ್ಯಾಹ್ನ ೩:೨೫'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '೧ನೇ').toBe('೧ನೇ');
        expect(moment([2011, 0, 2]).format('DDDo'), '೨ನೇ').toBe('೨ನೇ');
        expect(moment([2011, 0, 3]).format('DDDo'), '೩ನೇ').toBe('೩ನೇ');
        expect(moment([2011, 0, 4]).format('DDDo'), '೪ನೇ').toBe('೪ನೇ');
        expect(moment([2011, 0, 5]).format('DDDo'), '೫ನೇ').toBe('೫ನೇ');
        expect(moment([2011, 0, 6]).format('DDDo'), '೬ನೇ').toBe('೬ನೇ');
        expect(moment([2011, 0, 7]).format('DDDo'), '೭ನೇ').toBe('೭ನೇ');
        expect(moment([2011, 0, 8]).format('DDDo'), '೮ನೇ').toBe('೮ನೇ');
        expect(moment([2011, 0, 9]).format('DDDo'), '೯ನೇ').toBe('೯ನೇ');
        expect(moment([2011, 0, 10]).format('DDDo'), '೧೦ನೇ').toBe('೧೦ನೇ');

        expect(moment([2011, 0, 11]).format('DDDo'), '೧೧ನೇ').toBe('೧೧ನೇ');
        expect(moment([2011, 0, 12]).format('DDDo'), '೧೨ನೇ').toBe('೧೨ನೇ');
        expect(moment([2011, 0, 13]).format('DDDo'), '೧೩ನೇ').toBe('೧೩ನೇ');
        expect(moment([2011, 0, 14]).format('DDDo'), '೧೪ನೇ').toBe('೧೪ನೇ');
        expect(moment([2011, 0, 15]).format('DDDo'), '೧೫ನೇ').toBe('೧೫ನೇ');
        expect(moment([2011, 0, 16]).format('DDDo'), '೧೬ನೇ').toBe('೧೬ನೇ');
        expect(moment([2011, 0, 17]).format('DDDo'), '೧೭ನೇ').toBe('೧೭ನೇ');
        expect(moment([2011, 0, 18]).format('DDDo'), '೧೮ನೇ').toBe('೧೮ನೇ');
        expect(moment([2011, 0, 19]).format('DDDo'), '೧೯ನೇ').toBe('೧೯ನೇ');
        expect(moment([2011, 0, 20]).format('DDDo'), '೨೦ನೇ').toBe('೨೦ನೇ');

        expect(moment([2011, 0, 21]).format('DDDo'), '೨೧ನೇ').toBe('೨೧ನೇ');
        expect(moment([2011, 0, 22]).format('DDDo'), '೨೨ನೇ').toBe('೨೨ನೇ');
        expect(moment([2011, 0, 23]).format('DDDo'), '೨೩ನೇ').toBe('೨೩ನೇ');
        expect(moment([2011, 0, 24]).format('DDDo'), '೨೪ನೇ').toBe('೨೪ನೇ');
        expect(moment([2011, 0, 25]).format('DDDo'), '೨೫ನೇ').toBe('೨೫ನೇ');
        expect(moment([2011, 0, 26]).format('DDDo'), '೨೬ನೇ').toBe('೨೬ನೇ');
        expect(moment([2011, 0, 27]).format('DDDo'), '೨೭ನೇ').toBe('೨೭ನೇ');
        expect(moment([2011, 0, 28]).format('DDDo'), '೨೮ನೇ').toBe('೨೮ನೇ');
        expect(moment([2011, 0, 29]).format('DDDo'), '೨೯ನೇ').toBe('೨೯ನೇ');
        expect(moment([2011, 0, 30]).format('DDDo'), '೩೦ನೇ').toBe('೩೦ನೇ');

        expect(moment([2011, 0, 31]).format('DDDo'), '೩೧ನೇ').toBe('೩೧ನೇ');
    });

    test('format month', () => {
        var expected =
                'ಜನವರಿ ಜನ_ಫೆಬ್ರವರಿ ಫೆಬ್ರ_ಮಾರ್ಚ್ ಮಾರ್ಚ್_ಏಪ್ರಿಲ್ ಏಪ್ರಿಲ್_ಮೇ ಮೇ_ಜೂನ್ ಜೂನ್_ಜುಲೈ ಜುಲೈ_ಆಗಸ್ಟ್ ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್ ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋಬರ್ ಅಕ್ಟೋ_ನವೆಂಬರ್ ನವೆಂ_ಡಿಸೆಂಬರ್ ಡಿಸೆಂ'.split(
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
                'ಭಾನುವಾರ ಭಾನು ಭಾ_ಸೋಮವಾರ ಸೋಮ ಸೋ_ಮಂಗಳವಾರ ಮಂಗಳ ಮಂ_ಬುಧವಾರ ಬುಧ ಬು_ಗುರುವಾರ ಗುರು ಗು_ಶುಕ್ರವಾರ ಶುಕ್ರ ಶು_ಶನಿವಾರ ಶನಿ ಶ'.split(
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
        ).toBe('ಕೆಲವು ಕ್ಷಣಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ಒಂದು ನಿಮಿಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ಒಂದು ನಿಮಿಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('೨ ನಿಮಿಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('೪೪ ನಿಮಿಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ಒಂದು ಗಂಟೆ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ಒಂದು ಗಂಟೆ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('೨ ಗಂಟೆ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('೫ ಗಂಟೆ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('೨೧ ಗಂಟೆ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ಒಂದು ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ಒಂದು ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('೨ ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ಒಂದು ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('೫ ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('೨೫ ದಿನ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ಒಂದು ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ಒಂದು ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ಒಂದು ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('೨ ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('೨ ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('೩ ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ಒಂದು ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('೫ ತಿಂಗಳು');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ಒಂದು ವರ್ಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('೨ ವರ್ಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ಒಂದು ವರ್ಷ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('೫ ವರ್ಷ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ');
        expect(moment(0).from(30000), 'suffix').toBe('ಕೆಲವು ಕ್ಷಣಗಳು ಹಿಂದೆ');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ಕೆಲವು ಕ್ಷಣಗಳು ಹಿಂದೆ');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ').toBe(
            'ಕೆಲವು ಕ್ಷಣಗಳು ನಂತರ'
        );
        expect(moment().add({ d: 5 }).fromNow(), '೫ ದಿನ ನಂತರ').toBe(
            '೫ ದಿನ ನಂತರ'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೨:೦೦'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೨:೨೫'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'ಇಂದು ಮಧ್ಯಾಹ್ನ ೩:೦೦'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('ನಾಳೆ ಮಧ್ಯಾಹ್ನ ೧೨:೦೦');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ಇಂದು ಮಧ್ಯಾಹ್ನ ೧೧:೦೦');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ ೧೨:೦೦');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd[,] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[ಕೊನೆಯ] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[ಕೊನೆಯ] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[ಕೊನೆಯ] dddd[,] LT')
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

    test('meridiem', () => {
        expect(moment([2011, 2, 23, 2, 30]).format('a'), 'before dawn').toBe(
            'ರಾತ್ರಿ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'ಬೆಳಿಗ್ಗೆ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'ಮಧ್ಯಾಹ್ನ'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'ಸಂಜೆ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'ಸಂಜೆ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe(
            'ರಾತ್ರಿ'
        );

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'ರಾತ್ರಿ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'ಬೆಳಿಗ್ಗೆ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'ಮಧ್ಯಾಹ್ನ'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'ಸಂಜೆ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'ಸಂಜೆ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe(
            'ರಾತ್ರಿ'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('೧ ೦೧ ೧ನೇ');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('೧ ೦೧ ೧ನೇ');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('೨ ೦೨ ೨ನೇ');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('೨ ೦೨ ೨ನೇ');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('೩ ೦೩ ೩ನೇ');
    });
});
