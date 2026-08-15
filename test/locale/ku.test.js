import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ku';

describe('locale:ku', () => {
    setupLocaleTests('ku');

    var months = [
        'کانونی دووەم',
        'شوبات',
        'ئازار',
        'نیسان',
        'ئایار',
        'حوزەیران',
        'تەمموز',
        'ئاب',
        'ئەیلوول',
        'تشرینی یەكەم',
        'تشرینی دووەم',
        'كانونی یەکەم',
    ];

    test('parse', () => {
        var tests = months,
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input +
                    ' should be month ' +
                    (i + 1) +
                    ' instead is month ' +
                    moment(input, mmm).month()
            ).toBe(i);
        }
        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'یه‌كشه‌ممه‌، شوبات ١٤ ٢٠١٠، ٣:٢٥:٥٠ ئێواره‌',
                ],
                ['ddd, hA', 'یه‌كشه‌م، ٣ئێواره‌'],
                ['M Mo MM MMMM MMM', '٢ ٢ ٠٢ شوبات شوبات'],
                ['YYYY YY', '٢٠١٠ ١٠'],
                ['D Do DD', '١٤ ١٤ ١٤'],
                ['d do dddd ddd dd', '٠ ٠ یه‌كشه‌ممه‌ یه‌كشه‌م ی'],
                ['DDD DDDo DDDD', '٤٥ ٤٥ ٠٤٥'],
                ['w wo ww', '٨ ٨ ٠٨'],
                ['h hh', '٣ ٠٣'],
                ['H HH', '١٥ ١٥'],
                ['m mm', '٢٥ ٢٥'],
                ['s ss', '٥٠ ٥٠'],
                ['a A', 'ئێواره‌ ئێواره‌'],
                ['[the] DDDo [day of the year]', 'the ٤٥ day of the year'],
                ['LTS', '١٥:٢٥:٥٠'],
                ['L', '١٤/٠٢/٢٠١٠'],
                ['LL', '١٤ شوبات ٢٠١٠'],
                ['LLL', '١٤ شوبات ٢٠١٠ ١٥:٢٥'],
                ['LLLL', 'یه‌كشه‌ممه‌، ١٤ شوبات ٢٠١٠ ١٥:٢٥'],
                ['l', '١٤/٢/٢٠١٠'],
                ['ll', '١٤ شوبات ٢٠١٠'],
                ['lll', '١٤ شوبات ٢٠١٠ ١٥:٢٥'],
                ['llll', 'یه‌كشه‌م، ١٤ شوبات ٢٠١٠ ١٥:٢٥'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1').toBe('١');
        expect(moment([2011, 0, 2]).format('DDDo'), '2').toBe('٢');
        expect(moment([2011, 0, 3]).format('DDDo'), '3').toBe('٣');
        expect(moment([2011, 0, 4]).format('DDDo'), '4').toBe('٤');
        expect(moment([2011, 0, 5]).format('DDDo'), '5').toBe('٥');
        expect(moment([2011, 0, 6]).format('DDDo'), '6').toBe('٦');
        expect(moment([2011, 0, 7]).format('DDDo'), '7').toBe('٧');
        expect(moment([2011, 0, 8]).format('DDDo'), '8').toBe('٨');
        expect(moment([2011, 0, 9]).format('DDDo'), '9').toBe('٩');
        expect(moment([2011, 0, 10]).format('DDDo'), '10').toBe('١٠');

        expect(moment([2011, 0, 11]).format('DDDo'), '11').toBe('١١');
        expect(moment([2011, 0, 12]).format('DDDo'), '12').toBe('١٢');
        expect(moment([2011, 0, 13]).format('DDDo'), '13').toBe('١٣');
        expect(moment([2011, 0, 14]).format('DDDo'), '14').toBe('١٤');
        expect(moment([2011, 0, 15]).format('DDDo'), '15').toBe('١٥');
        expect(moment([2011, 0, 16]).format('DDDo'), '16').toBe('١٦');
        expect(moment([2011, 0, 17]).format('DDDo'), '17').toBe('١٧');
        expect(moment([2011, 0, 18]).format('DDDo'), '18').toBe('١٨');
        expect(moment([2011, 0, 19]).format('DDDo'), '19').toBe('١٩');
        expect(moment([2011, 0, 20]).format('DDDo'), '20').toBe('٢٠');

        expect(moment([2011, 0, 21]).format('DDDo'), '21').toBe('٢١');
        expect(moment([2011, 0, 22]).format('DDDo'), '22').toBe('٢٢');
        expect(moment([2011, 0, 23]).format('DDDo'), '23').toBe('٢٣');
        expect(moment([2011, 0, 24]).format('DDDo'), '24').toBe('٢٤');
        expect(moment([2011, 0, 25]).format('DDDo'), '25').toBe('٢٥');
        expect(moment([2011, 0, 26]).format('DDDo'), '26').toBe('٢٦');
        expect(moment([2011, 0, 27]).format('DDDo'), '27').toBe('٢٧');
        expect(moment([2011, 0, 28]).format('DDDo'), '28').toBe('٢٨');
        expect(moment([2011, 0, 29]).format('DDDo'), '29').toBe('٢٩');
        expect(moment([2011, 0, 30]).format('DDDo'), '30').toBe('٣٠');
        expect(moment([2011, 0, 31]).format('DDDo'), '31').toBe('٣١');
    });
    //ok
    test('format month', () => {
        var expected = months,
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM'), expected[i]).toBe(
                expected[i]
            );
            expect(moment([2011, i, 1]).format('MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'یه‌كشه‌ممه‌ یه‌كشه‌م ی_دووشه‌ممه‌ دووشه‌م د_سێشه‌ممه‌ سێشه‌م س_چوارشه‌ممه‌ چوارشه‌م چ_پێنجشه‌ممه‌ پێنجشه‌م پ_هه‌ینی هه‌ینی ه_شه‌ممه‌ شه‌ممه‌ ش'.split(
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
        ).toBe('چه‌ند چركه‌یه‌ك');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('یه‌ك خوله‌ك');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('یه‌ك خوله‌ك');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('٢ خوله‌ك');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('٤٤ خوله‌ك');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('یه‌ك كاتژمێر');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('یه‌ك كاتژمێر');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('٢ كاتژمێر');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('٥ كاتژمێر');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('٢١ كاتژمێر');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('یه‌ك ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('یه‌ك ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('٢ ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('یه‌ك ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('٥ ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('٢٥ ڕۆژ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('یه‌ك مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('یه‌ك مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('یه‌ك مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('٢ مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('٢ مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('٣ مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('یه‌ك مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('٥ مانگ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('یه‌ك ساڵ');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('٢ ساڵ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('یه‌ك ساڵ');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('٥ ساڵ');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('له‌ چه‌ند چركه‌یه‌ك');
        expect(moment(0).from(30000), 'suffix').toBe('چه‌ند چركه‌یه‌ك');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('چه‌ند چركه‌یه‌ك');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'له‌ چه‌ند چركه‌یه‌ك'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('له‌ ٥ ڕۆژ');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ئه‌مرۆ كاتژمێر ١٢:٠٠'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ئه‌مرۆ كاتژمێر ١٢:٢٥'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'ئه‌مرۆ كاتژمێر ١٣:٠٠'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('به‌یانی كاتژمێر ١٢:٠٠');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ئه‌مرۆ كاتژمێر ١١:٠٠');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('دوێنێ كاتژمێر ١٢:٠٠');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [كاتژمێر] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [كاتژمێر] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [كاتژمێر] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [كاتژمێر] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [كاتژمێر] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [كاتژمێر] LT')
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
            moment([2011, 11, 31]).format('w ww wo'),
            'Dec 31 2011 should be week 1'
        ).toBe('١ ٠١ ١');
        expect(
            moment([2012, 0, 6]).format('w ww wo'),
            'Jan  6 2012 should be week 1'
        ).toBe('١ ٠١ ١');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 2'
        ).toBe('٢ ٠٢ ٢');
        expect(
            moment([2012, 0, 13]).format('w ww wo'),
            'Jan 13 2012 should be week 2'
        ).toBe('٢ ٠٢ ٢');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 3'
        ).toBe('٣ ٠٣ ٣');
    });

    // locale-specific
    test('ku strict mode parsing works', () => {
        var m, formattedDate;
        m = moment().locale('ku');
        formattedDate = m.format('l');
        expect(
            moment.utc(formattedDate, 'l', 'ku', false).isValid(),
            'Non-strict parsing works'
        ).toBe(true);
        expect(
            moment.utc(formattedDate, 'l', 'ku', true).isValid(),
            'Strict parsing must work'
        ).toBe(true);
    });
});
