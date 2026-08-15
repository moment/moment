import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/bn-bd';

describe('locale:bn-bd', () => {
    setupLocaleTests('bn-bd');

    test('parse', () => {
        var tests =
                'জানুয়ারি জানু_ফেব্রুয়ারি ফেব্রু_মার্চ মার্চ_এপ্রিল এপ্রিল_মে মে_জুন জুন_জুলাই জুলাই_আগস্ট আগস্ট_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভে_ডিসেম্বর ডিসে'.split(
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
                    'dddd, Do MMMM YYYY, a h:mm:ss সময়',
                    'রবিবার, ১৪ ফেব্রুয়ারি ২০১০, বিকাল ৩:২৫:৫০ সময়',
                ],
                ['ddd, a h সময়', 'রবি, বিকাল ৩ সময়'],
                ['M Mo MM MMMM MMM', '২ ২ ০২ ফেব্রুয়ারি ফেব্রু'],
                ['YYYY YY', '২০১০ ১০'],
                ['D Do DD', '১৪ ১৪ ১৪'],
                ['d do dddd ddd dd', '০ ০ রবিবার রবি রবি'],
                ['DDD DDDo DDDD', '৪৫ ৪৫ ০৪৫'],
                ['w wo ww', '৮ ৮ ০৮'],
                ['h hh', '৩ ০৩'],
                ['H HH', '১৫ ১৫'],
                ['m mm', '২৫ ২৫'],
                ['s ss', '৫০ ৫০'],
                ['a A', 'বিকাল বিকাল'],
                ['LT', 'বিকাল ৩:২৫ সময়'],
                ['LTS', 'বিকাল ৩:২৫:৫০ সময়'],
                ['L', '১৪/০২/২০১০'],
                ['LL', '১৪ ফেব্রুয়ারি ২০১০'],
                ['LLL', '১৪ ফেব্রুয়ারি ২০১০, বিকাল ৩:২৫ সময়'],
                ['LLLL', 'রবিবার, ১৪ ফেব্রুয়ারি ২০১০, বিকাল ৩:২৫ সময়'],
                ['l', '১৪/২/২০১০'],
                ['ll', '১৪ ফেব্রু ২০১০'],
                ['lll', '১৪ ফেব্রু ২০১০, বিকাল ৩:২৫ সময়'],
                ['llll', 'রবি, ১৪ ফেব্রু ২০১০, বিকাল ৩:২৫ সময়'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '১').toBe('১');
        expect(moment([2011, 0, 2]).format('DDDo'), '২').toBe('২');
        expect(moment([2011, 0, 3]).format('DDDo'), '৩').toBe('৩');
        expect(moment([2011, 0, 4]).format('DDDo'), '৪').toBe('৪');
        expect(moment([2011, 0, 5]).format('DDDo'), '৫').toBe('৫');
        expect(moment([2011, 0, 6]).format('DDDo'), '৬').toBe('৬');
        expect(moment([2011, 0, 7]).format('DDDo'), '৭').toBe('৭');
        expect(moment([2011, 0, 8]).format('DDDo'), '৮').toBe('৮');
        expect(moment([2011, 0, 9]).format('DDDo'), '৯').toBe('৯');
        expect(moment([2011, 0, 10]).format('DDDo'), '১০').toBe('১০');

        expect(moment([2011, 0, 11]).format('DDDo'), '১১').toBe('১১');
        expect(moment([2011, 0, 12]).format('DDDo'), '১২').toBe('১২');
        expect(moment([2011, 0, 13]).format('DDDo'), '১৩').toBe('১৩');
        expect(moment([2011, 0, 14]).format('DDDo'), '১৪').toBe('১৪');
        expect(moment([2011, 0, 15]).format('DDDo'), '১৫').toBe('১৫');
        expect(moment([2011, 0, 16]).format('DDDo'), '১৬').toBe('১৬');
        expect(moment([2011, 0, 17]).format('DDDo'), '১৭').toBe('১৭');
        expect(moment([2011, 0, 18]).format('DDDo'), '১৮').toBe('১৮');
        expect(moment([2011, 0, 19]).format('DDDo'), '১৯').toBe('১৯');
        expect(moment([2011, 0, 20]).format('DDDo'), '২০').toBe('২০');

        expect(moment([2011, 0, 21]).format('DDDo'), '২১').toBe('২১');
        expect(moment([2011, 0, 22]).format('DDDo'), '২২').toBe('২২');
        expect(moment([2011, 0, 23]).format('DDDo'), '২৩').toBe('২৩');
        expect(moment([2011, 0, 24]).format('DDDo'), '২৪').toBe('২৪');
        expect(moment([2011, 0, 25]).format('DDDo'), '২৫').toBe('২৫');
        expect(moment([2011, 0, 26]).format('DDDo'), '২৬').toBe('২৬');
        expect(moment([2011, 0, 27]).format('DDDo'), '২৭').toBe('২৭');
        expect(moment([2011, 0, 28]).format('DDDo'), '२৮').toBe('২৮');
        expect(moment([2011, 0, 29]).format('DDDo'), '২৯').toBe('২৯');
        expect(moment([2011, 0, 30]).format('DDDo'), '৩০').toBe('৩০');

        expect(moment([2011, 0, 31]).format('DDDo'), '৩১').toBe('৩১');
    });

    test('format month', () => {
        var expected =
                'জানুয়ারি জানু_ফেব্রুয়ারি ফেব্রু_মার্চ মার্চ_এপ্রিল এপ্রিল_মে মে_জুন জুন_জুলাই জুলাই_আগস্ট আগস্ট_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভে_ডিসেম্বর ডিসে'.split(
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
                'রবিবার রবি রবি_সোমবার সোম সোম_মঙ্গলবার মঙ্গল মঙ্গল_বুধবার বুধ বুধ_বৃহস্পতিবার বৃহস্পতি বৃহ_শুক্রবার শুক্র শুক্র_শনিবার শনি শনি'.split(
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
        ).toBe('কয়েক সেকেন্ড');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('এক মিনিট');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('এক মিনিট');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('২ মিনিট');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('৪৪ মিনিট');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('এক ঘন্টা');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('এক ঘন্টা');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('২ ঘন্টা');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('৫ ঘন্টা');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('২১ ঘন্টা');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('এক দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('এক দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('২ দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('এক দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('৫ দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('২৫ দিন');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('এক মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('এক মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('২ মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('২ মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('৩ মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('এক মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('৫ মাস');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('এক বছর');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('২ বছর');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('এক বছর');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('৫ বছর');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('কয়েক সেকেন্ড পরে');
        expect(moment(0).from(30000), 'suffix').toBe('কয়েক সেকেন্ড আগে');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('কয়েক সেকেন্ড আগে');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'কয়েক সেকেন্ড পরে').toBe(
            'কয়েক সেকেন্ড পরে'
        );
        expect(moment().add({ d: 5 }).fromNow(), '৫ দিন পরে').toBe('৫ দিন পরে');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'আজ দুপুর ১২:০০ সময়'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'আজ দুপুর ১২:২৫ সময়'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'আজ বিকাল ৩:০০ সময়'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('আগামীকাল দুপুর ১২:০০ সময়');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('আজ সকাল ১১:০০ সময়');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('গতকাল দুপুর ১২:০০ সময়');
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
                m.format('[গত] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[গত] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[গত] dddd[,] LT')
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
        expect(moment([2011, 2, 23, 2, 30]).format('a'), 'Night').toBe('রাত');
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'সকাল'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'Noon').toBe('দুপুর');
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'Afternoon').toBe(
            'বিকাল'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'evening').toBe(
            'সন্ধ্যা'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe('রাত');

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'Night').toBe('রাত');
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'সকাল'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), 'Noon').toBe('দুপুর');
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'Afternoon').toBe(
            'বিকাল'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'evening').toBe(
            'সন্ধ্যা'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe('রাত');
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('১ ০১ ১');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('১ ০১ ১');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('২ ০২ ২');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('২ ০২ ২');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('৩ ০৩ ৩');
    });
});
