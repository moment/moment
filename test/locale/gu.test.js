import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/gu';

describe('locale:gu', () => {
    setupLocaleTests('gu');

    test('parse', () => {
        var tests =
                'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઑગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટ્બર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે..'.split(
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

            // Fails only for month 12 (index 11)
            // equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            // Fails only for month 12 (index 11)
            // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            // Fails only for month 12 (index 11)
            // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, a h:mm:ss વાગ્યે',
                    'રવિવાર, ૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫:૫૦ વાગ્યે',
                ],
                ['ddd, a h વાગ્યે', 'રવિ, બપોર ૩ વાગ્યે'],
                ['M Mo MM MMMM MMM', '૨ ૨ ૦૨ ફેબ્રુઆરી ફેબ્રુ.'],
                ['YYYY YY', '૨૦૧૦ ૧૦'],
                ['D Do DD', '૧૪ ૧૪ ૧૪'],
                ['d do dddd ddd dd', '૦ ૦ રવિવાર રવિ ર'],
                ['DDD DDDo DDDD', '૪૫ ૪૫ ૦૪૫'],
                ['w wo ww', '૮ ૮ ૦૮'],
                ['h hh', '૩ ૦૩'],
                ['H HH', '૧૫ ૧૫'],
                ['m mm', '૨૫ ૨૫'],
                ['s ss', '૫૦ ૫૦'],
                ['a A', 'બપોર બપોર'],
                ['LTS', 'બપોર ૩:૨૫:૫૦ વાગ્યે'],
                ['L', '૧૪/૦૨/૨૦૧૦'],
                ['LL', '૧૪ ફેબ્રુઆરી ૨૦૧૦'],
                ['LLL', '૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
                ['LLLL', 'રવિવાર, ૧૪ ફેબ્રુઆરી ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
                ['l', '૧૪/૨/૨૦૧૦'],
                ['ll', '૧૪ ફેબ્રુ. ૨૦૧૦'],
                ['lll', '૧૪ ફેબ્રુ. ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
                ['llll', 'રવિ, ૧૪ ફેબ્રુ. ૨૦૧૦, બપોર ૩:૨૫ વાગ્યે'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '૧').toBe('૧');
        expect(moment([2011, 0, 2]).format('DDDo'), '૨').toBe('૨');
        expect(moment([2011, 0, 3]).format('DDDo'), '૩').toBe('૩');
        expect(moment([2011, 0, 4]).format('DDDo'), '૪').toBe('૪');
        expect(moment([2011, 0, 5]).format('DDDo'), '૫').toBe('૫');
        expect(moment([2011, 0, 6]).format('DDDo'), '૬').toBe('૬');
        expect(moment([2011, 0, 7]).format('DDDo'), '૭').toBe('૭');
        expect(moment([2011, 0, 8]).format('DDDo'), '૮').toBe('૮');
        expect(moment([2011, 0, 9]).format('DDDo'), '૯').toBe('૯');
        expect(moment([2011, 0, 10]).format('DDDo'), '૧૦').toBe('૧૦');

        expect(moment([2011, 0, 11]).format('DDDo'), '૧૧').toBe('૧૧');
        expect(moment([2011, 0, 12]).format('DDDo'), '૧૨').toBe('૧૨');
        expect(moment([2011, 0, 13]).format('DDDo'), '૧૩').toBe('૧૩');
        expect(moment([2011, 0, 14]).format('DDDo'), '૧૪').toBe('૧૪');
        expect(moment([2011, 0, 15]).format('DDDo'), '૧૫').toBe('૧૫');
        expect(moment([2011, 0, 16]).format('DDDo'), '૧૬').toBe('૧૬');
        expect(moment([2011, 0, 17]).format('DDDo'), '૧૭').toBe('૧૭');
        expect(moment([2011, 0, 18]).format('DDDo'), '૧૮').toBe('૧૮');
        expect(moment([2011, 0, 19]).format('DDDo'), '૧૯').toBe('૧૯');
        expect(moment([2011, 0, 20]).format('DDDo'), '૨૦').toBe('૨૦');

        expect(moment([2011, 0, 21]).format('DDDo'), '૨૧').toBe('૨૧');
        expect(moment([2011, 0, 22]).format('DDDo'), '૨૨').toBe('૨૨');
        expect(moment([2011, 0, 23]).format('DDDo'), '૨૩').toBe('૨૩');
        expect(moment([2011, 0, 24]).format('DDDo'), '૨૪').toBe('૨૪');
        expect(moment([2011, 0, 25]).format('DDDo'), '૨૫').toBe('૨૫');
        expect(moment([2011, 0, 26]).format('DDDo'), '૨૬').toBe('૨૬');
        expect(moment([2011, 0, 27]).format('DDDo'), '૨૭').toBe('૨૭');
        expect(moment([2011, 0, 28]).format('DDDo'), '૨૮').toBe('૨૮');
        expect(moment([2011, 0, 29]).format('DDDo'), '૨૯').toBe('૨૯');
        expect(moment([2011, 0, 30]).format('DDDo'), '૩૦').toBe('૩૦');

        expect(moment([2011, 0, 31]).format('DDDo'), '૩૧').toBe('૩૧');
    });

    test('format month', () => {
        var expected =
                'જાન્યુઆરી જાન્યુ._ફેબ્રુઆરી ફેબ્રુ._માર્ચ માર્ચ_એપ્રિલ એપ્રિ._મે મે_જૂન જૂન_જુલાઈ જુલા._ઑગસ્ટ ઑગ._સપ્ટેમ્બર સપ્ટે._ઑક્ટ્બર ઑક્ટ્._નવેમ્બર નવે._ડિસેમ્બર ડિસે.'.split(
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
                'રવિવાર રવિ ર_સોમવાર સોમ સો_મંગળવાર મંગળ મં_બુધ્વાર બુધ્ બુ_ગુરુવાર ગુરુ ગુ_શુક્રવાર શુક્ર શુ_શનિવાર શનિ શ'.split(
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
        ).toBe('અમુક પળો');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('એક મિનિટ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('એક મિનિટ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('૨ મિનિટ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('૪૪ મિનિટ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('એક કલાક');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('એક કલાક');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('૨ કલાક');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('૫ કલાક');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('૨૧ કલાક');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('એક દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('એક દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('૨ દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('એક દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('૫ દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('૨૫ દિવસ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('એક મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('એક મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('એક મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('૨ મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('૨ મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('૩ મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('એક મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('૫ મહિનો');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('એક વર્ષ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('૨ વર્ષ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('એક વર્ષ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('૫ વર્ષ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('અમુક પળો મા');
        expect(moment(0).from(30000), 'suffix').toBe('અમુક પળો પહેલા');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('અમુક પળો પહેલા');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'અમુક પળો મા').toBe(
            'અમુક પળો મા'
        );
        expect(moment().add({ d: 5 }).fromNow(), '૫ દિવસ મા').toBe('૫ દિવસ મા');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'આજ બપોર ૧૨:૦૦ વાગ્યે'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'આજ બપોર ૧૨:૨૫ વાગ્યે'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hour').toBe(
            'આજ બપોર ૩:૦૦ વાગ્યે'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('કાલે બપોર ૧૨:૦૦ વાગ્યે');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('આજ બપોર ૧૧:૦૦ વાગ્યે');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ગઇકાલે બપોર ૧૨:૦૦ વાગ્યે');
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
                m.format('[પાછલા] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[પાછલા] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[પાછલા] dddd[,] LT')
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
            'રાત'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'સવાર'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'બપોર'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'સાંજ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'સાંજ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe('રાત');

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'રાત'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'સવાર'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'બપોર'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'સાંજ'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'સાંજ'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe('રાત');
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('૧ ૦૧ ૧');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('૧ ૦૧ ૧');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('૨ ૦૨ ૨');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('૨ ૦૨ ૨');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('૩ ૦૩ ૩');
    });
});
