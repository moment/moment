import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/hy-am';

describe('locale:hy-am', () => {
    setupLocaleTests('hy-am');

    test('parse', () => {
        var tests =
                'հունվար հնվ_փետրվար փտր_մարտ մրտ_ապրիլ ապր_մայիս մյս_հունիս հնս_հուլիս հլս_օգոստոս օգս_սեպտեմբեր սպտ_հոկտեմբեր հկտ_նոյեմբեր նմբ_դեկտեմբեր դկտ'.split(
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

    test('parse exceptional case', () => {
        expect(
            moment('11 մայիսի 1989', ['DD MMMM YYYY']).format('DD-MM-YYYY')
        ).toBe('11-05-1989');
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, HH:mm:ss',
                    'կիրակի, 14 փետրվարի 2010, 15:25:50',
                ],
                ['ddd, h A', 'կրկ, 3 ցերեկվա'],
                ['M Mo MM MMMM MMM', '2 2 02 փետրվար փտր'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 կիրակի կրկ կրկ'],
                ['DDD DDDo DDDD', '45 45-րդ 045'],
                ['w wo ww', '7 7-րդ 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ցերեկվա ցերեկվա'],
                ['[տարվա] DDDo [օրը]', 'տարվա 45-րդ օրը'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 փետրվարի 2010 թ.'],
                ['LLL', '14 փետրվարի 2010 թ., 15:25'],
                ['LLLL', 'կիրակի, 14 փետրվարի 2010 թ., 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 փտր 2010 թ.'],
                ['lll', '14 փտր 2010 թ., 15:25'],
                ['llll', 'կրկ, 14 փտր 2010 թ., 15:25'],
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
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'night').toBe(
            'գիշերվա'
        );
        expect(moment([2012, 11, 28, 3, 59]).format('A'), 'night').toBe(
            'գիշերվա'
        );
        expect(moment([2012, 11, 28, 4, 0]).format('A'), 'morning').toBe(
            'առավոտվա'
        );
        expect(moment([2012, 11, 28, 11, 59]).format('A'), 'morning').toBe(
            'առավոտվա'
        );
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'afternoon').toBe(
            'ցերեկվա'
        );
        expect(moment([2012, 11, 28, 16, 59]).format('A'), 'afternoon').toBe(
            'ցերեկվա'
        );
        expect(moment([2012, 11, 28, 17, 0]).format('A'), 'evening').toBe(
            'երեկոյան'
        );
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'evening').toBe(
            'երեկոյան'
        );
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1-ին').toBe('1-ին');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-րդ').toBe('2-րդ');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-րդ').toBe('3-րդ');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-րդ').toBe('4-րդ');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-րդ').toBe('5-րդ');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-րդ').toBe('6-րդ');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-րդ').toBe('7-րդ');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-րդ').toBe('8-րդ');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-րդ').toBe('9-րդ');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-րդ').toBe('10-րդ');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-րդ').toBe('11-րդ');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-րդ').toBe('12-րդ');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-րդ').toBe('13-րդ');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-րդ').toBe('14-րդ');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-րդ').toBe('15-րդ');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-րդ').toBe('16-րդ');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-րդ').toBe('17-րդ');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-րդ').toBe('18-րդ');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-րդ').toBe('19-րդ');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-րդ').toBe('20-րդ');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-րդ').toBe('21-րդ');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-րդ').toBe('22-րդ');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-րդ').toBe('23-րդ');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-րդ').toBe('24-րդ');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-րդ').toBe('25-րդ');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-րդ').toBe('26-րդ');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-րդ').toBe('27-րդ');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-րդ').toBe('28-րդ');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-րդ').toBe('29-րդ');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-րդ').toBe('30-րդ');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-րդ').toBe('31-րդ');
    });

    test('format month', () => {
        var expected =
                'հունվար հնվ_փետրվար փտր_մարտ մրտ_ապրիլ ապր_մայիս մյս_հունիս հնս_հուլիս հլս_օգոստոս օգս_սեպտեմբեր սպտ_հոկտեմբեր հկտ_նոյեմբեր նմբ_դեկտեմբեր դկտ'.split(
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
                    'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split(
                        '_'
                    ),
                accusative:
                    'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split(
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

    test('format month short case', () => {
        var monthsShort = {
                nominative:
                    'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split(
                        '_'
                    ),
                accusative:
                    'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2011, i, 1]).format('D MMM'),
                '1 ' + monthsShort.accusative[i]
            ).toBe('1 ' + monthsShort.accusative[i]);
            expect(
                moment([2011, i, 1]).format('MMM'),
                '1 ' + monthsShort.nominative[i]
            ).toBe(monthsShort.nominative[i]);
        }
    });

    test('format month case with escaped symbols', () => {
        var months = {
                nominative:
                    'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split(
                        '_'
                    ),
                accusative:
                    'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split(
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
                moment([2013, i, 1]).format('D[-ին օրը] MMMM'),
                '1-ին օրը ' + months.accusative[i]
            ).toBe('1-ին օրը ' + months.accusative[i]);
            expect(
                moment([2013, i, 1]).format('D, MMMM'),
                '1, ' + months.nominative[i]
            ).toBe('1, ' + months.nominative[i]);
        }
    });

    test('format month short case with escaped symbols', () => {
        var monthsShort = {
                nominative:
                    'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split(
                        '_'
                    ),
                accusative:
                    'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2013, i, 1]).format('D[] MMM'),
                '1 ' + monthsShort.accusative[i]
            ).toBe('1 ' + monthsShort.accusative[i]);
            expect(
                moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMM[</b>]'),
                '1 <b>' + monthsShort.accusative[i] + '</b>'
            ).toBe('<i>1</i> <b>' + monthsShort.accusative[i] + '</b>');
            expect(
                moment([2013, i, 1]).format('D[-ին օրը] MMM'),
                '1-ին օրը ' + monthsShort.accusative[i]
            ).toBe('1-ին օրը ' + monthsShort.accusative[i]);
            expect(
                moment([2013, i, 1]).format('D, MMM'),
                '1, ' + monthsShort.nominative[i]
            ).toBe('1, ' + monthsShort.nominative[i]);
        }
    });

    test('format week', () => {
        var expected =
                'կիրակի կրկ կրկ_երկուշաբթի երկ երկ_երեքշաբթի երք երք_չորեքշաբթի չրք չրք_հինգշաբթի հնգ հնգ_ուրբաթ ուրբ ուրբ_շաբաթ շբթ շբթ'.split(
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
            '44 seconds = seconds'
        ).toBe('մի քանի վայրկյան');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('րոպե');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('րոպե');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 րոպե');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 րոպե');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ժամ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ժամ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 ժամ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 ժամ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 ժամ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 11 }), true),
            '11 days = 11 days'
        ).toBe('11 օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 21 }), true),
            '21 days = 21 days'
        ).toBe('21 օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 օր');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 ամիս');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('տարի');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 տարի');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('տարի');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 տարի');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('մի քանի վայրկյան հետո');
        expect(moment(0).from(30000), 'suffix').toBe('մի քանի վայրկյան առաջ');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in seconds').toBe(
            'մի քանի վայրկյան հետո'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5 օր հետո');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'այսօր 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'այսօր 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'այսօր 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('վաղը 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('այսօր 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('երեկ 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        function makeFormat(d) {
            return 'dddd [օրը ժամը] LT';
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
            return '[անցած] dddd [օրը ժամը] LT';
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
        ).toBe('1 01 1-ին');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1-ին');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe('2 02 2-րդ');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2-րդ');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe('3 03 3-րդ');
    });
});
