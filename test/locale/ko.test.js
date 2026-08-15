import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ko';

describe('locale:ko', () => {
    setupLocaleTests('ko');

    test('parse', () => {
        var tests =
                '1월 1월_2월 2월_3월 3월_4월 4월_5월 5월_6월 6월_7월 7월_8월 8월_9월 9월_10월 10월_11월 11월_12월 12월'.split(
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

    test('parse meridiem', () => {
        var elements = [
                {
                    expression: '1981년 9월 8일 오후 2시 30분',
                    inputFormat: 'YYYY[년] M[월] D[일] A h[시] m[분]',
                    outputFormat: 'A',
                    expected: '오후',
                },
                {
                    expression: '1981년 9월 8일 오전 2시 30분',
                    inputFormat: 'YYYY[년] M[월] D[일] A h[시] m[분]',
                    outputFormat: 'A h시',
                    expected: '오전 2시',
                },
                {
                    expression: '14시 30분',
                    inputFormat: 'H[시] m[분]',
                    outputFormat: 'A',
                    expected: '오후',
                },
                {
                    expression: '오후 4시',
                    inputFormat: 'A h[시]',
                    outputFormat: 'H',
                    expected: '16',
                },
            ],
            i,
            l,
            it,
            actual;

        for (i = 0, l = elements.length; i < l; ++i) {
            it = elements[i];
            actual = moment(it.expression, it.inputFormat).format(
                it.outputFormat
            );

            expect(
                actual,
                "'" +
                    it.outputFormat +
                    "' of '" +
                    it.expression +
                    "' must be '" +
                    it.expected +
                    "' but was '" +
                    actual +
                    "'."
            ).toBe(it.expected);
        }
    });

    test('format', () => {
        var a = [
                [
                    'YYYY년 MMMM Do dddd a h:mm:ss',
                    '2010년 2월 14일 일요일 오후 3:25:50',
                ],
                ['ddd A h', '일 오후 3'],
                ['M Mo MM MMMM MMM', '2 2월 02 2월 2월'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14일 14'],
                ['d do dddd ddd dd', '0 0일 일요일 일 일'],
                ['DDD DDDo DDDD', '45 45일 045'],
                ['w wo ww', '8 8주 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', '오후 오후'],
                ['일년 중 DDDo째 되는 날', '일년 중 45일째 되는 날'],
                ['LTS', '오후 3:25:50'],
                ['L', '2010.02.14.'],
                ['LL', '2010년 2월 14일'],
                ['LLL', '2010년 2월 14일 오후 3:25'],
                ['LLLL', '2010년 2월 14일 일요일 오후 3:25'],
                ['l', '2010.02.14.'],
                ['ll', '2010년 2월 14일'],
                ['lll', '2010년 2월 14일 오후 3:25'],
                ['llll', '2010년 2월 14일 일요일 오후 3:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1일').toBe('1일');
        expect(moment([2011, 0, 2]).format('DDDo'), '2일').toBe('2일');
        expect(moment([2011, 0, 3]).format('DDDo'), '3일').toBe('3일');
        expect(moment([2011, 0, 4]).format('DDDo'), '4일').toBe('4일');
        expect(moment([2011, 0, 5]).format('DDDo'), '5일').toBe('5일');
        expect(moment([2011, 0, 6]).format('DDDo'), '6일').toBe('6일');
        expect(moment([2011, 0, 7]).format('DDDo'), '7일').toBe('7일');
        expect(moment([2011, 0, 8]).format('DDDo'), '8일').toBe('8일');
        expect(moment([2011, 0, 9]).format('DDDo'), '9일').toBe('9일');
        expect(moment([2011, 0, 10]).format('DDDo'), '10일').toBe('10일');

        expect(moment([2011, 0, 11]).format('DDDo'), '11일').toBe('11일');
        expect(moment([2011, 0, 12]).format('DDDo'), '12일').toBe('12일');
        expect(moment([2011, 0, 13]).format('DDDo'), '13일').toBe('13일');
        expect(moment([2011, 0, 14]).format('DDDo'), '14일').toBe('14일');
        expect(moment([2011, 0, 15]).format('DDDo'), '15일').toBe('15일');
        expect(moment([2011, 0, 16]).format('DDDo'), '16일').toBe('16일');
        expect(moment([2011, 0, 17]).format('DDDo'), '17일').toBe('17일');
        expect(moment([2011, 0, 18]).format('DDDo'), '18일').toBe('18일');
        expect(moment([2011, 0, 19]).format('DDDo'), '19일').toBe('19일');
        expect(moment([2011, 0, 20]).format('DDDo'), '20일').toBe('20일');

        expect(moment([2011, 0, 21]).format('DDDo'), '21일').toBe('21일');
        expect(moment([2011, 0, 22]).format('DDDo'), '22일').toBe('22일');
        expect(moment([2011, 0, 23]).format('DDDo'), '23일').toBe('23일');
        expect(moment([2011, 0, 24]).format('DDDo'), '24일').toBe('24일');
        expect(moment([2011, 0, 25]).format('DDDo'), '25일').toBe('25일');
        expect(moment([2011, 0, 26]).format('DDDo'), '26일').toBe('26일');
        expect(moment([2011, 0, 27]).format('DDDo'), '27일').toBe('27일');
        expect(moment([2011, 0, 28]).format('DDDo'), '28일').toBe('28일');
        expect(moment([2011, 0, 29]).format('DDDo'), '29일').toBe('29일');
        expect(moment([2011, 0, 30]).format('DDDo'), '30일').toBe('30일');

        expect(moment([2011, 0, 31]).format('DDDo'), '31일').toBe('31일');
    });

    test('format month', () => {
        var expected =
                '1월 1월_2월 2월_3월 3월_4월 4월_5월 5월_6월 6월_7월 7월_8월 8월_9월 9월_10월 10월_11월 11월_12월 12월'.split(
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
                '일요일 일 일_월요일 월 월_화요일 화 화_수요일 수 수_목요일 목 목_금요일 금 금_토요일 토 토'.split(
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
            '44초 = 몇 초'
        ).toBe('몇 초');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45초 = 1분'
        ).toBe('1분');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89초 = 1분'
        ).toBe('1분');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90초 = 2분'
        ).toBe('2분');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44분 = 44분'
        ).toBe('44분');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45분 = 한 시간'
        ).toBe('한 시간');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89분 = 한 시간'
        ).toBe('한 시간');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90분 = 2시간'
        ).toBe('2시간');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5시간 = 5시간'
        ).toBe('5시간');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21시간 = 21시간'
        ).toBe('21시간');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22시간 = 하루'
        ).toBe('하루');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35시간 = 하루'
        ).toBe('하루');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36시간 = 2일'
        ).toBe('2일');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '하루 = 하루'
        ).toBe('하루');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5일 = 5일'
        ).toBe('5일');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25일 = 25일'
        ).toBe('25일');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26일 = 한 달'
        ).toBe('한 달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30일 = 한 달'
        ).toBe('한 달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45일 = 한 달'
        ).toBe('한 달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46일 = 2달'
        ).toBe('2달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75일 = 2달'
        ).toBe('2달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76일 = 3달'
        ).toBe('3달');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1달 = 한 달'
        ).toBe('한 달');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5달 = 5달'
        ).toBe('5달');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345일 = 일 년'
        ).toBe('일 년');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548일 = 2년'
        ).toBe('2년');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '일 년 = 일 년'
        ).toBe('일 년');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5년 = 5년'
        ).toBe('5년');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('몇 초 후');
        expect(moment(0).from(30000), 'suffix').toBe('몇 초 전');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('몇 초 전');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            '몇 초 후'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5일 후');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            '오늘 오후 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            '오늘 오후 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            '오늘 오후 1:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('내일 오후 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('오늘 오전 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('어제 오후 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('지난주 dddd LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('지난주 dddd LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('지난주 dddd LT')
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

    test('weeks year starting sunday format', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1주');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1주');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2주');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 2주');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3주');
    });
});
