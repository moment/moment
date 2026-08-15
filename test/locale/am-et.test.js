import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/am-et';

describe('locale:am-et', () => {
    setupLocaleTests('am-et');

    test('parse', () => {
        var tests =
                'ጃንዩወሪ ጃን_ፌብሩወሪ ፌብ_ማርች ማር_ኤፕሪል ኤፕር_ሜይ ሜይ_ጁን ጁን_ጁላይ ጁላይ_ኦገስት ኦገ_ሴፕቴምበር ሴፕ_ኦክቶበር ኦክቶ_ኖቬምበር ኖቬ_ዲሴምበር ዲሴ'.split(
                    '_'
                ),
            i;

        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'ሀሙስ, ጃንዩወሪ 14ኛ 2010, 3:25:50 ከሰዓት',
                ],
                ['ddd, hA', 'ሀሙ, 3ከሰዓት'],
                ['M Mo MM MMMM MMM', '1 1ኛ 01 ጃንዩወሪ ጃን'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14ኛ 14'],
                ['d do dddd ddd dd', '4 4ኛ ሀሙስ ሀሙ ሀ'],
                ['DDD DDDo DDDD', '14 14ኛ 014'],
                ['w wo ww', '3 3ኛ 03'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ከሰዓት ከሰዓት'],
                ['[ዓመተ] DDDD', 'ዓመተ 014'],
                ['LTS', '3:25:50 ከሰዓት'],
                ['L', '14/01/2010'],
                ['LL', '14 ጃንዩወሪ 2010'],
                ['LLL', '14 ጃንዩወሪ 2010 3:25 ከሰዓት'],
                ['LLLL', 'ሀሙስ, 14 ጃንዩወሪ 2010 3:25 ከሰዓት'],
            ],
            b = moment(new Date(2010, 0, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('calendar', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ዛሬ በ 12:00 ከሰዓት'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('ነገ በ 12:00 ከሰዓት');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ትናንትና በ 12:00 ከሰዓት');
    });

    test('relative time', () => {
        expect(moment(0).from(30000), 'a few seconds ago').toBe(
            'ጥቂት ሰከንዶች በፊት'
        );
        expect(moment(30000).from(0), 'in a few seconds').toBe('ጥቂት ሰከንዶች ውስጥ');
        expect(moment().add({ m: 1 }).fromNow(), 'in a minute').toBe(
            'አንድ ደቂቃ ውስጥ'
        );
        expect(moment().subtract({ m: 1 }).fromNow(), 'a minute ago').toBe(
            'አንድ ደቂቃ በፊት'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1ኛ');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1ኛ');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2ኛ');
    });
});
