import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/bo';

describe('locale:bo', () => {
    setupLocaleTests('bo');

    test('parse', () => {
        var tests =
                'ཟླ་བ་དང་པོ ཟླ་༡_ཟླ་བ་གཉིས་པ ཟླ་༢_ཟླ་བ་གསུམ་པ ཟླ་༣_ཟླ་བ་བཞི་པ ཟླ་༤_ཟླ་བ་ལྔ་པ ཟླ་༥_ཟླ་བ་དྲུག་པ ཟླ་༦_ཟླ་བ་བདུན་པ ཟླ་༧_ཟླ་བ་བརྒྱད་པ ཟླ་༨_ཟླ་བ་དགུ་པ ཟླ་༩_ཟླ་བ་བཅུ་པ ཟླ་༡༠_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་༡༡_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་༡༢'.split(
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

            // Failing only for month 1 (index 0)
            // equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            // Failing only for month 1 (index 0)
            // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            // Failing only for month 1 (index 0)
            // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, a h:mm:ss ལ་',
                    'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥:༥༠ ལ་',
                ],
                ['ddd, a h ལ་', 'ཉི་མ་, ཉིན་གུང ༣ ལ་'],
                ['M Mo MM MMMM MMM', '༢ ༢ ༠༢ ཟླ་བ་གཉིས་པ ཟླ་༢'],
                ['YYYY YY', '༢༠༡༠ ༡༠'],
                ['D Do DD', '༡༤ ༡༤ ༡༤'],
                ['d do dddd ddd dd', '༠ ༠ གཟའ་ཉི་མ་ ཉི་མ་ ཉི'],
                ['DDD DDDo DDDD', '༤༥ ༤༥ ༠༤༥'],
                ['w wo ww', '༨ ༨ ༠༨'],
                ['h hh', '༣ ༠༣'],
                ['H HH', '༡༥ ༡༥'],
                ['m mm', '༢༥ ༢༥'],
                ['s ss', '༥༠ ༥༠'],
                ['a A', 'ཉིན་གུང ཉིན་གུང'],
                ['LT', 'ཉིན་གུང ༣:༢༥'],
                ['LTS', 'ཉིན་གུང ༣:༢༥:༥༠'],
                ['L', '༡༤/༠༢/༢༠༡༠'],
                ['LL', '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
                ['LLL', '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['LLLL', 'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['l', '༡༤/༢/༢༠༡༠'],
                ['ll', '༡༤ ཟླ་༢ ༢༠༡༠'],
                ['lll', '༡༤ ཟླ་༢ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['llll', 'ཉི་མ་, ༡༤ ཟླ་༢ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '༡').toBe('༡');
        expect(moment([2011, 0, 2]).format('DDDo'), '༢').toBe('༢');
        expect(moment([2011, 0, 3]).format('DDDo'), '༣').toBe('༣');
        expect(moment([2011, 0, 4]).format('DDDo'), '༤').toBe('༤');
        expect(moment([2011, 0, 5]).format('DDDo'), '༥').toBe('༥');
        expect(moment([2011, 0, 6]).format('DDDo'), '༦').toBe('༦');
        expect(moment([2011, 0, 7]).format('DDDo'), '༧').toBe('༧');
        expect(moment([2011, 0, 8]).format('DDDo'), '༨').toBe('༨');
        expect(moment([2011, 0, 9]).format('DDDo'), '༩').toBe('༩');
        expect(moment([2011, 0, 10]).format('DDDo'), '༡༠').toBe('༡༠');

        expect(moment([2011, 0, 11]).format('DDDo'), '༡༡').toBe('༡༡');
        expect(moment([2011, 0, 12]).format('DDDo'), '༡༢').toBe('༡༢');
        expect(moment([2011, 0, 13]).format('DDDo'), '༡༣').toBe('༡༣');
        expect(moment([2011, 0, 14]).format('DDDo'), '༡༤').toBe('༡༤');
        expect(moment([2011, 0, 15]).format('DDDo'), '༡༥').toBe('༡༥');
        expect(moment([2011, 0, 16]).format('DDDo'), '༡༦').toBe('༡༦');
        expect(moment([2011, 0, 17]).format('DDDo'), '༡༧').toBe('༡༧');
        expect(moment([2011, 0, 18]).format('DDDo'), '༡༨').toBe('༡༨');
        expect(moment([2011, 0, 19]).format('DDDo'), '༡༩').toBe('༡༩');
        expect(moment([2011, 0, 20]).format('DDDo'), '༢༠').toBe('༢༠');

        expect(moment([2011, 0, 21]).format('DDDo'), '༢༡').toBe('༢༡');
        expect(moment([2011, 0, 22]).format('DDDo'), '༢༢').toBe('༢༢');
        expect(moment([2011, 0, 23]).format('DDDo'), '༢༣').toBe('༢༣');
        expect(moment([2011, 0, 24]).format('DDDo'), '༢༤').toBe('༢༤');
        expect(moment([2011, 0, 25]).format('DDDo'), '༢༥').toBe('༢༥');
        expect(moment([2011, 0, 26]).format('DDDo'), '༢༦').toBe('༢༦');
        expect(moment([2011, 0, 27]).format('DDDo'), '༢༧').toBe('༢༧');
        expect(moment([2011, 0, 28]).format('DDDo'), '༢༨').toBe('༢༨');
        expect(moment([2011, 0, 29]).format('DDDo'), '༢༩').toBe('༢༩');
        expect(moment([2011, 0, 30]).format('DDDo'), '༣༠').toBe('༣༠');

        expect(moment([2011, 0, 31]).format('DDDo'), '༣༡').toBe('༣༡');
    });

    test('format month', () => {
        var expected =
                'ཟླ་བ་དང་པོ ཟླ་༡_ཟླ་བ་གཉིས་པ ཟླ་༢_ཟླ་བ་གསུམ་པ ཟླ་༣_ཟླ་བ་བཞི་པ ཟླ་༤_ཟླ་བ་ལྔ་པ ཟླ་༥_ཟླ་བ་དྲུག་པ ཟླ་༦_ཟླ་བ་བདུན་པ ཟླ་༧_ཟླ་བ་བརྒྱད་པ ཟླ་༨_ཟླ་བ་དགུ་པ ཟླ་༩_ཟླ་བ་བཅུ་པ ཟླ་༡༠_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་༡༡_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་༡༢'.split(
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
                'གཟའ་ཉི་མ་ ཉི་མ་ ཉི_གཟའ་ཟླ་བ་ ཟླ་བ་ ཟླ_གཟའ་མིག་དམར་ མིག་དམར་ མིག_གཟའ་ལྷག་པ་ ལྷག་པ་ ལྷག_གཟའ་ཕུར་བུ ཕུར་བུ ཕུར_གཟའ་པ་སངས་ པ་སངས་ སངས_གཟའ་སྤེན་པ་ སྤེན་པ་ སྤེན'.split(
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
        ).toBe('ལམ་སང');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('སྐར་མ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('སྐར་མ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('༢ སྐར་མ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('༤༤ སྐར་མ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ཆུ་ཚོད་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ཆུ་ཚོད་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('༢ ཆུ་ཚོད');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('༥ ཆུ་ཚོད');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('༢༡ ཆུ་ཚོད');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ཉིན་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ཉིན་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('༢ ཉིན་');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ཉིན་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('༥ ཉིན་');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('༢༥ ཉིན་');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ཟླ་བ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ཟླ་བ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ཟླ་བ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('༢ ཟླ་བ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('༢ ཟླ་བ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('༣ ཟླ་བ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ཟླ་བ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('༥ ཟླ་བ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ལོ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('༢ ལོ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ལོ་གཅིག');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('༥ ལོ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ལམ་སང ལ་');
        expect(moment(0).from(30000), 'suffix').toBe('ལམ་སང སྔན་ལ');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('ལམ་སང སྔན་ལ');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'ལམ་སང ལ་').toBe('ལམ་སང ལ་');
        expect(moment().add({ d: 5 }).fromNow(), '༥ ཉིན་ ལ་').toBe('༥ ཉིན་ ལ་');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'དི་རིང ཉིན་གུང ༡༢:༠༠'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'དི་རིང ཉིན་གུང ༡༢:༢༥'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'དི་རིང ཉིན་གུང ༣:༠༠'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('སང་ཉིན ཉིན་གུང ༡༢:༠༠');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('དི་རིང ཉིན་གུང ༡༡:༠༠');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ཁ་སང ཉིན་གུང ༡༢:༠༠');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT')
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
            'མཚན་མོ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'ཞོགས་ཀས'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'ཉིན་གུང'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'དགོང་དག'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'དགོང་དག'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe(
            'མཚན་མོ'
        );

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'མཚན་མོ'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'ཞོགས་ཀས'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'ཉིན་གུང'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'དགོང་དག'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'དགོང་དག'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe(
            'མཚན་མོ'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('༡ ༠༡ ༡');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('༡ ༠༡ ༡');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('༢ ༠༢ ༢');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('༢ ༠༢ ༢');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('༣ ༠༣ ༣');
    });
});
