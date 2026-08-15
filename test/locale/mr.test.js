import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/mr';

describe('locale:mr', () => {
    setupLocaleTests('mr');

    test('parse', () => {
        var tests =
                'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split(
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
                    'dddd, Do MMMM YYYY, a h:mm:ss वाजता',
                    'रविवार, १४ फेब्रुवारी २०१०, दुपारी ३:२५:५० वाजता',
                ],
                ['ddd, a h वाजता', 'रवि, दुपारी ३ वाजता'],
                ['M Mo MM MMMM MMM', '२ २ ०२ फेब्रुवारी फेब्रु.'],
                ['YYYY YY', '२०१० १०'],
                ['D Do DD', '१४ १४ १४'],
                ['d do dddd ddd dd', '० ० रविवार रवि र'],
                ['DDD DDDo DDDD', '४५ ४५ ०४५'],
                ['w wo ww', '८ ८ ०८'],
                ['h hh', '३ ०३'],
                ['H HH', '१५ १५'],
                ['m mm', '२५ २५'],
                ['s ss', '५० ५०'],
                ['a A', 'दुपारी दुपारी'],
                ['LTS', 'दुपारी ३:२५:५० वाजता'],
                ['L', '१४/०२/२०१०'],
                ['LL', '१४ फेब्रुवारी २०१०'],
                ['LLL', '१४ फेब्रुवारी २०१०, दुपारी ३:२५ वाजता'],
                ['LLLL', 'रविवार, १४ फेब्रुवारी २०१०, दुपारी ३:२५ वाजता'],
                ['l', '१४/२/२०१०'],
                ['ll', '१४ फेब्रु. २०१०'],
                ['lll', '१४ फेब्रु. २०१०, दुपारी ३:२५ वाजता'],
                ['llll', 'रवि, १४ फेब्रु. २०१०, दुपारी ३:२५ वाजता'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '१').toBe('१');
        expect(moment([2011, 0, 2]).format('DDDo'), '२').toBe('२');
        expect(moment([2011, 0, 3]).format('DDDo'), '३').toBe('३');
        expect(moment([2011, 0, 4]).format('DDDo'), '४').toBe('४');
        expect(moment([2011, 0, 5]).format('DDDo'), '५').toBe('५');
        expect(moment([2011, 0, 6]).format('DDDo'), '६').toBe('६');
        expect(moment([2011, 0, 7]).format('DDDo'), '७').toBe('७');
        expect(moment([2011, 0, 8]).format('DDDo'), '८').toBe('८');
        expect(moment([2011, 0, 9]).format('DDDo'), '९').toBe('९');
        expect(moment([2011, 0, 10]).format('DDDo'), '१०').toBe('१०');

        expect(moment([2011, 0, 11]).format('DDDo'), '११').toBe('११');
        expect(moment([2011, 0, 12]).format('DDDo'), '१२').toBe('१२');
        expect(moment([2011, 0, 13]).format('DDDo'), '१३').toBe('१३');
        expect(moment([2011, 0, 14]).format('DDDo'), '१४').toBe('१४');
        expect(moment([2011, 0, 15]).format('DDDo'), '१५').toBe('१५');
        expect(moment([2011, 0, 16]).format('DDDo'), '१६').toBe('१६');
        expect(moment([2011, 0, 17]).format('DDDo'), '१७').toBe('१७');
        expect(moment([2011, 0, 18]).format('DDDo'), '१८').toBe('१८');
        expect(moment([2011, 0, 19]).format('DDDo'), '१९').toBe('१९');
        expect(moment([2011, 0, 20]).format('DDDo'), '२०').toBe('२०');

        expect(moment([2011, 0, 21]).format('DDDo'), '२१').toBe('२१');
        expect(moment([2011, 0, 22]).format('DDDo'), '२२').toBe('२२');
        expect(moment([2011, 0, 23]).format('DDDo'), '२३').toBe('२३');
        expect(moment([2011, 0, 24]).format('DDDo'), '२४').toBe('२४');
        expect(moment([2011, 0, 25]).format('DDDo'), '२५').toBe('२५');
        expect(moment([2011, 0, 26]).format('DDDo'), '२६').toBe('२६');
        expect(moment([2011, 0, 27]).format('DDDo'), '२७').toBe('२७');
        expect(moment([2011, 0, 28]).format('DDDo'), '२८').toBe('२८');
        expect(moment([2011, 0, 29]).format('DDDo'), '२९').toBe('२९');
        expect(moment([2011, 0, 30]).format('DDDo'), '३०').toBe('३०');

        expect(moment([2011, 0, 31]).format('DDDo'), '३१').toBe('३१');
    });

    test('format month', () => {
        var expected =
                'जानेवारी जाने._फेब्रुवारी फेब्रु._मार्च मार्च._एप्रिल एप्रि._मे मे._जून जून._जुलै जुलै._ऑगस्ट ऑग._सप्टेंबर सप्टें._ऑक्टोबर ऑक्टो._नोव्हेंबर नोव्हें._डिसेंबर डिसें.'.split(
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
                'रविवार रवि र_सोमवार सोम सो_मंगळवार मंगळ मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श'.split(
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
        ).toBe('काही सेकंद');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('एक मिनिट');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('एक मिनिट');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('२ मिनिटे');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('४४ मिनिटे');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('एक तास');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('एक तास');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('२ तास');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('५ तास');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('२१ तास');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('एक दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('एक दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('२ दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('एक दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('५ दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('२५ दिवस');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('एक महिना');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('एक महिना');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('एक महिना');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('२ महिने');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('२ महिने');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('३ महिने');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('एक महिना');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('५ महिने');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('एक वर्ष');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('२ वर्षे');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('एक वर्ष');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('५ वर्षे');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('काही सेकंदांमध्ये');
        expect(moment(0).from(30000), 'suffix').toBe('काही सेकंदांपूर्वी');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('काही सेकंदांपूर्वी');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'काही सेकंदांमध्ये'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            '५ दिवसांमध्ये'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'आज दुपारी १२:०० वाजता'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'आज दुपारी १२:२५ वाजता'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'आज दुपारी ३:०० वाजता'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('उद्या दुपारी १२:०० वाजता');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('आज सकाळी ११:०० वाजता');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('काल दुपारी १२:०० वाजता');
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
                m.format('[मागील] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[मागील] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[मागील] dddd[,] LT')
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
            'पहाटे'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'सकाळी'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'दुपारी'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'सायंकाळी'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'सायंकाळी'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe(
            'रात्री'
        );

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'पहाटे'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'सकाळी'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'दुपारी'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'सायंकाळी'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'सायंकाळी'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe(
            'रात्री'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('१ ०१ १');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('१ ०१ १');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('२ ०२ २');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('२ ०२ २');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('३ ०३ ३');
    });
});
