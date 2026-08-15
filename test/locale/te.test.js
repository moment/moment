import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/te';

describe('locale:te', () => {
    setupLocaleTests('te');

    test('parse', () => {
        var tests =
                'జనవరి జన._ఫిబ్రవరి ఫిబ్ర._మార్చి మార్చి_ఏప్రిల్ ఏప్రి._మే మే_జూన్ జూన్_జులై జులై_ఆగస్టు ఆగ._సెప్టెంబర్ సెప్._అక్టోబర్ అక్టో._నవంబర్ నవ._డిసెంబర్ డిసె.'.split(
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
                    'dddd, Do తేదీ MMMM YYYY, a h:mm:ss',
                    'ఆదివారం, 14వ తేదీ ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25:50',
                ],
                ['ddd, a h గంటలు', 'ఆది, మధ్యాహ్నం 3 గంటలు'],
                ['M Mo నెల MM MMMM MMM', '2 2వ నెల 02 ఫిబ్రవరి ఫిబ్ర.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14వ 14'],
                ['d do dddd ddd dd', '0 0వ ఆదివారం ఆది ఆ'],
                ['DDD DDDo DDDD', '45 45వ 045'],
                ['w wo ww', '8 8వ 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'మధ్యాహ్నం మధ్యాహ్నం'],
                ['LTS', 'మధ్యాహ్నం 3:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 ఫిబ్రవరి 2010'],
                ['LLL', '14 ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25'],
                ['LLLL', 'ఆదివారం, 14 ఫిబ్రవరి 2010, మధ్యాహ్నం 3:25'],
                ['l', '14/2/2010'],
                ['ll', '14 ఫిబ్ర. 2010'],
                ['lll', '14 ఫిబ్ర. 2010, మధ్యాహ్నం 3:25'],
                ['llll', 'ఆది, 14 ఫిబ్ర. 2010, మధ్యాహ్నం 3:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1వ').toBe('1వ');
        expect(moment([2011, 0, 2]).format('DDDo'), '2వ').toBe('2వ');
        expect(moment([2011, 0, 3]).format('DDDo'), '3వ').toBe('3వ');
        expect(moment([2011, 0, 4]).format('DDDo'), '4వ').toBe('4వ');
        expect(moment([2011, 0, 5]).format('DDDo'), '5వ').toBe('5వ');
        expect(moment([2011, 0, 6]).format('DDDo'), '6వ').toBe('6వ');
        expect(moment([2011, 0, 7]).format('DDDo'), '7వ').toBe('7వ');
        expect(moment([2011, 0, 8]).format('DDDo'), '8వ').toBe('8వ');
        expect(moment([2011, 0, 9]).format('DDDo'), '9వ').toBe('9వ');
        expect(moment([2011, 0, 10]).format('DDDo'), '10వ').toBe('10వ');

        expect(moment([2011, 0, 11]).format('DDDo'), '11వ').toBe('11వ');
        expect(moment([2011, 0, 12]).format('DDDo'), '12వ').toBe('12వ');
        expect(moment([2011, 0, 13]).format('DDDo'), '13వ').toBe('13వ');
        expect(moment([2011, 0, 14]).format('DDDo'), '14వ').toBe('14వ');
        expect(moment([2011, 0, 15]).format('DDDo'), '15వ').toBe('15వ');
        expect(moment([2011, 0, 16]).format('DDDo'), '16వ').toBe('16వ');
        expect(moment([2011, 0, 17]).format('DDDo'), '17వ').toBe('17వ');
        expect(moment([2011, 0, 18]).format('DDDo'), '18వ').toBe('18వ');
        expect(moment([2011, 0, 19]).format('DDDo'), '19వ').toBe('19వ');
        expect(moment([2011, 0, 20]).format('DDDo'), '20వ').toBe('20వ');

        expect(moment([2011, 0, 21]).format('DDDo'), '21వ').toBe('21వ');
        expect(moment([2011, 0, 22]).format('DDDo'), '22వ').toBe('22వ');
        expect(moment([2011, 0, 23]).format('DDDo'), '23వ').toBe('23వ');
        expect(moment([2011, 0, 24]).format('DDDo'), '24వ').toBe('24వ');
        expect(moment([2011, 0, 25]).format('DDDo'), '25వ').toBe('25వ');
        expect(moment([2011, 0, 26]).format('DDDo'), '26వ').toBe('26వ');
        expect(moment([2011, 0, 27]).format('DDDo'), '27వ').toBe('27వ');
        expect(moment([2011, 0, 28]).format('DDDo'), '28వ').toBe('28వ');
        expect(moment([2011, 0, 29]).format('DDDo'), '29వ').toBe('29వ');
        expect(moment([2011, 0, 30]).format('DDDo'), '30వ').toBe('30వ');

        expect(moment([2011, 0, 31]).format('DDDo'), '31వ').toBe('31వ');
    });

    test('format month', () => {
        var expected =
                'జనవరి జన._ఫిబ్రవరి ఫిబ్ర._మార్చి మార్చి_ఏప్రిల్ ఏప్రి._మే మే_జూన్ జూన్_జులై జులై_ఆగస్టు ఆగ._సెప్టెంబర్ సెప్._అక్టోబర్ అక్టో._నవంబర్ నవ._డిసెంబర్ డిసె.'.split(
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
                'ఆదివారం ఆది ఆ_సోమవారం సోమ సో_మంగళవారం మంగళ మం_బుధవారం బుధ బు_గురువారం గురు గు_శుక్రవారం శుక్ర శు_శనివారం శని శ'.split(
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
        ).toBe('కొన్ని క్షణాలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ఒక నిమిషం');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ఒక నిమిషం');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 నిమిషాలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 నిమిషాలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ఒక గంట');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ఒక గంట');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 గంటలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 గంటలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 గంటలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ఒక రోజు');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ఒక రోజు');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 రోజులు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ఒక రోజు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 రోజులు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 రోజులు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ఒక నెల');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ఒక నెల');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ఒక నెల');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 నెలలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 నెలలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 నెలలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ఒక నెల');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 నెలలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ఒక సంవత్సరం');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 సంవత్సరాలు');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ఒక సంవత్సరం');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 సంవత్సరాలు');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('కొన్ని క్షణాలు లో');
        expect(moment(0).from(30000), 'suffix').toBe('కొన్ని క్షణాలు క్రితం');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('కొన్ని క్షణాలు క్రితం');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'కొన్ని క్షణాలు లో').toBe(
            'కొన్ని క్షణాలు లో'
        );
        expect(moment().add({ d: 5 }).fromNow(), '5 రోజులు లో').toBe(
            '5 రోజులు లో'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'నేడు మధ్యాహ్నం 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'నేడు మధ్యాహ్నం 12:25'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'నేడు మధ్యాహ్నం 3:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('రేపు మధ్యాహ్నం 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('నేడు మధ్యాహ్నం 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('నిన్న మధ్యాహ్నం 12:00');
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
                m.format('[గత] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[గత] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[గత] dddd[,] LT')
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
            'రాత్రి'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'ఉదయం'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'మధ్యాహ్నం'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'సాయంత్రం'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'సాయంత్రం'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe(
            'రాత్రి'
        );

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'రాత్రి'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'ఉదయం'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'మధ్యాహ్నం'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'సాయంత్రం'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'సాయంత్రం'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe(
            'రాత్రి'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1వ');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1వ');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2వ');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 2వ');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3వ');
    });
});
