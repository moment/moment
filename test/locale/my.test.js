import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/my';

describe('locale:my', () => {
    setupLocaleTests('my');

    test('parse', () => {
        var tests =
                'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split(
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
                    'တနင်္ဂနွေ, ဖေဖော်ဝါရီ ၁၄ ၂၀၁၀, ၃:၂၅:၅၀ pm',
                ],
                ['ddd, hA', 'နွေ, ၃PM'],
                ['M Mo MM MMMM MMM', '၂ ၂ ၀၂ ဖေဖော်ဝါရီ ဖေ'],
                ['YYYY YY', '၂၀၁၀ ၁၀'],
                ['D Do DD', '၁၄ ၁၄ ၁၄'],
                ['d do dddd ddd dd', '၀ ၀ တနင်္ဂနွေ နွေ နွေ'],
                ['DDD DDDo DDDD', '၄၅ ၄၅ ၀၄၅'],
                ['w wo ww', '၆ ၆ ၀၆'],
                ['h hh', '၃ ၀၃'],
                ['H HH', '၁၅ ၁၅'],
                ['m mm', '၂၅ ၂၅'],
                ['s ss', '၅၀ ၅၀'],
                ['a A', 'pm PM'],
                ['[နှစ်၏] DDDo [ရက်မြောက်]', 'နှစ်၏ ၄၅ ရက်မြောက်'],
                ['LTS', '၁၅:၂၅:၅၀'],
                ['L', '၁၄/၀၂/၂၀၁၀'],
                ['LL', '၁၄ ဖေဖော်ဝါရီ ၂၀၁၀'],
                ['LLL', '၁၄ ဖေဖော်ဝါရီ ၂၀၁၀ ၁၅:၂၅'],
                ['LLLL', 'တနင်္ဂနွေ ၁၄ ဖေဖော်ဝါရီ ၂၀၁၀ ၁၅:၂၅'],
                ['l', '၁၄/၂/၂၀၁၀'],
                ['ll', '၁၄ ဖေ ၂၀၁၀'],
                ['lll', '၁၄ ဖေ ၂၀၁၀ ၁၅:၂၅'],
                ['llll', 'နွေ ၁၄ ဖေ ၂၀၁၀ ၁၅:၂၅'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '၁').toBe('၁');
        expect(moment([2011, 0, 2]).format('DDDo'), '၂').toBe('၂');
        expect(moment([2011, 0, 3]).format('DDDo'), '၃').toBe('၃');
        expect(moment([2011, 0, 4]).format('DDDo'), '၄').toBe('၄');
        expect(moment([2011, 0, 5]).format('DDDo'), '၅').toBe('၅');
        expect(moment([2011, 0, 6]).format('DDDo'), '၆').toBe('၆');
        expect(moment([2011, 0, 7]).format('DDDo'), '၇').toBe('၇');
        expect(moment([2011, 0, 8]).format('DDDo'), '၈').toBe('၈');
        expect(moment([2011, 0, 9]).format('DDDo'), '၉').toBe('၉');
        expect(moment([2011, 0, 10]).format('DDDo'), '၁၀').toBe('၁၀');

        expect(moment([2011, 0, 11]).format('DDDo'), '၁၁').toBe('၁၁');
        expect(moment([2011, 0, 12]).format('DDDo'), '၁၂').toBe('၁၂');
        expect(moment([2011, 0, 13]).format('DDDo'), '၁၃').toBe('၁၃');
        expect(moment([2011, 0, 14]).format('DDDo'), '၁၄').toBe('၁၄');
        expect(moment([2011, 0, 15]).format('DDDo'), '၁၅').toBe('၁၅');
        expect(moment([2011, 0, 16]).format('DDDo'), '၁၆').toBe('၁၆');
        expect(moment([2011, 0, 17]).format('DDDo'), '၁၇').toBe('၁၇');
        expect(moment([2011, 0, 18]).format('DDDo'), '၁၈').toBe('၁၈');
        expect(moment([2011, 0, 19]).format('DDDo'), '၁၉').toBe('၁၉');
        expect(moment([2011, 0, 20]).format('DDDo'), '၂၀').toBe('၂၀');

        expect(moment([2011, 0, 21]).format('DDDo'), '၂၁').toBe('၂၁');
        expect(moment([2011, 0, 22]).format('DDDo'), '၂၂').toBe('၂၂');
        expect(moment([2011, 0, 23]).format('DDDo'), '၂၃').toBe('၂၃');
        expect(moment([2011, 0, 24]).format('DDDo'), '၂၄').toBe('၂၄');
        expect(moment([2011, 0, 25]).format('DDDo'), '၂၅').toBe('၂၅');
        expect(moment([2011, 0, 26]).format('DDDo'), '၂၆').toBe('၂၆');
        expect(moment([2011, 0, 27]).format('DDDo'), '၂၇').toBe('၂၇');
        expect(moment([2011, 0, 28]).format('DDDo'), '၂၈').toBe('၂၈');
        expect(moment([2011, 0, 29]).format('DDDo'), '၂၉').toBe('၂၉');
        expect(moment([2011, 0, 30]).format('DDDo'), '၃၀').toBe('၃၀');

        expect(moment([2011, 0, 31]).format('DDDo'), '၃၁').toBe('၃၁');
    });

    test('format month', () => {
        var expected =
                'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split(
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
                'တနင်္ဂနွေ နွေ နွေ_တနင်္လာ လာ လာ_အင်္ဂါ ဂါ ဂါ_ဗုဒ္ဓဟူး ဟူး ဟူး_ကြာသပတေး ကြာ ကြာ_သောကြာ သော သော_စနေ နေ နေ'.split(
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
            start.from(
                moment([2007, 1, 28]).add({
                    s: 44,
                }),
                true
            ),
            '၄၄ စက္ကန်. = စက္ကန်.အနည်းငယ်'
        ).toBe('စက္ကန်.အနည်းငယ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    s: 45,
                }),
                true
            ),
            '၄၅ စက္ကန်. = တစ်မိနစ်'
        ).toBe('တစ်မိနစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    s: 89,
                }),
                true
            ),
            '၈၉ စက္ကန်. = တစ်မိနစ်'
        ).toBe('တစ်မိနစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    s: 90,
                }),
                true
            ),
            '၉၀ စက္ကန်. =  ၂ မိနစ်'
        ).toBe('၂ မိနစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    m: 44,
                }),
                true
            ),
            '၄၄ မိနစ် = ၄၄ မိနစ်'
        ).toBe('၄၄ မိနစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    m: 45,
                }),
                true
            ),
            '၄၅ မိနစ် = ၁ နာရီ'
        ).toBe('တစ်နာရီ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    m: 89,
                }),
                true
            ),
            '၈၉ မိနစ် = တစ်နာရီ'
        ).toBe('တစ်နာရီ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    m: 90,
                }),
                true
            ),
            'မိနစ် ၉၀= ၂ နာရီ'
        ).toBe('၂ နာရီ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    h: 5,
                }),
                true
            ),
            '၅ နာရီ= ၅ နာရီ'
        ).toBe('၅ နာရီ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    h: 21,
                }),
                true
            ),
            '၂၁ နာရီ =၂၁ နာရီ'
        ).toBe('၂၁ နာရီ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    h: 22,
                }),
                true
            ),
            '၂၂ နာရီ =တစ်ရက်'
        ).toBe('တစ်ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    h: 35,
                }),
                true
            ),
            '၃၅ နာရီ =တစ်ရက်'
        ).toBe('တစ်ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    h: 36,
                }),
                true
            ),
            '၃၆ နာရီ = ၂ ရက်'
        ).toBe('၂ ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 1,
                }),
                true
            ),
            '၁ ရက်= တစ်ရက်'
        ).toBe('တစ်ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 5,
                }),
                true
            ),
            '၅ ရက် = ၅ ရက်'
        ).toBe('၅ ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 25,
                }),
                true
            ),
            '၂၅ ရက်= ၂၅ ရက်'
        ).toBe('၂၅ ရက်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 26,
                }),
                true
            ),
            '၂၆ ရက် = တစ်လ'
        ).toBe('တစ်လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 30,
                }),
                true
            ),
            'ရက် ၃၀ = တစ်လ'
        ).toBe('တစ်လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 43,
                }),
                true
            ),
            '၄၃ ရက် = တစ်လ'
        ).toBe('တစ်လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 46,
                }),
                true
            ),
            '၄၆ ရက် = ၂ လ'
        ).toBe('၂ လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 74,
                }),
                true
            ),
            '၇၅ ရက်= ၂ လ'
        ).toBe('၂ လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 76,
                }),
                true
            ),
            '၇၆ ရက် = ၃ လ'
        ).toBe('၃ လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    M: 1,
                }),
                true
            ),
            '၁ လ = တစ်လ'
        ).toBe('တစ်လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    M: 5,
                }),
                true
            ),
            '၅ လ = ၅ လ'
        ).toBe('၅ လ');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 345,
                }),
                true
            ),
            '၃၄၅ ရက် = တစ်နှစ်'
        ).toBe('တစ်နှစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    d: 548,
                }),
                true
            ),
            '၅၄၈ ရက် = ၂ နှစ်'
        ).toBe('၂ နှစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    y: 1,
                }),
                true
            ),
            '၁ နှစ် = တစ်နှစ်'
        ).toBe('တစ်နှစ်');
        expect(
            start.from(
                moment([2007, 1, 28]).add({
                    y: 5,
                }),
                true
            ),
            '၅ နှစ် = ၅ နှစ်'
        ).toBe('၅ နှစ်');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe(
            'လာမည့် စက္ကန်.အနည်းငယ် မှာ'
        );
        expect(moment(0).from(30000), 'suffix').toBe(
            'လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က'
        );
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'ယခုမှစပြီး အတိတ်တွင်ဖော်ပြသလိုဖော်ပြမည်'
        ).toBe('လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က');
    });

    test('fromNow', () => {
        expect(
            moment()
                .add({
                    s: 30,
                })
                .fromNow(),
            'လာမည့် စက္ကန်.အနည်းငယ် မှာ'
        ).toBe('လာမည့် စက္ကန်.အနည်းငယ် မှာ');
        expect(
            moment()
                .add({
                    d: 5,
                })
                .fromNow(),
            'လာမည့် ၅ ရက် မှာ'
        ).toBe('လာမည့် ၅ ရက် မှာ');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'ယနေ. ဒီအချိန်').toBe('ယနေ. ၁၂:၀၀ မှာ');
        expect(
            moment(a).add({ m: 25 }).calendar(),
            'ယခုမှ ၂၅ မိနစ်ပေါင်းထည့်'
        ).toBe('ယနေ. ၁၂:၂၅ မှာ');
        expect(
            moment(a).add({ h: 1 }).calendar(),
            'ယခုမှ ၁ နာရီပေါင်းထည့်'
        ).toBe('ယနေ. ၁၃:၀၀ မှာ');
        expect(moment(a).add({ d: 1 }).calendar(), 'မနက်ဖြန် ဒီအချိန်').toBe(
            'မနက်ဖြန် ၁၂:၀၀ မှာ'
        );
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'ယခုမှ ၁ နာရီနှုတ်'
        ).toBe('ယနေ. ၁၁:၀၀ မှာ');
        expect(moment(a).subtract({ d: 1 }).calendar(), 'မနေ.က ဒီအချိန်').toBe(
            'မနေ.က ၁၂:၀၀ မှာ'
        );
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({
                d: i,
            });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd LT [မှာ]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd LT [မှာ]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd LT [မှာ]')
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
                m.format('[ပြီးခဲ့သော] dddd LT [မှာ]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[ပြီးခဲ့သော] dddd LT [မှာ]')
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

        expect(weeksAgo.calendar(), 'လွန်ခဲ့သော ၁ ပတ်က').toBe(
            weeksAgo.format('L')
        );
        expect(weeksFromNow.calendar(), '၁ ပတ်အတွင်း').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({
            w: 2,
        });
        weeksFromNow = moment().add({
            w: 2,
        });

        expect(weeksAgo.calendar(), '၂ ပတ် အရင်က').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), '၂ ပတ် အတွင်း').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('၅၂ ၅၂ ၅၂');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('၁ ၀၁ ၁');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('၁ ၀၁ ၁');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('၂ ၀၂ ၂');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('၂ ၀၂ ၂');
    });
});
