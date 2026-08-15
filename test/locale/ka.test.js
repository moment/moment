import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ka';

describe('locale:ka', () => {
    setupLocaleTests('ka');

    test('parse', () => {
        var i,
            tests =
                'იანვარი იან_თებერვალი თებ_მარტი მარ_აპრილი აპრ_მაისი მაი_ივნისი ივნ_ივლისი ივლ_აგვისტო აგვ_სექტემბერი სექ_ოქტომბერი ოქტ_ნოემბერი ნოე_დეკემბერი დეკ'.split(
                    '_'
                );

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
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            // the last two are broken until https://github.com/nodejs/node/issues/22518 is fixed
            // equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            // equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'კვირა, თებერვალი მე-14 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'კვი, 3PM'],
                ['M Mo MM MMMM MMM', '2 მე-2 02 თებერვალი თებ'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 მე-14 14'],
                ['d do dddd ddd dd', '0 0 კვირა კვი კვ'],
                ['DDD DDDo DDDD', '45 45-ე 045'],
                ['w wo ww', '7 მე-7 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['წლის DDDo დღე', 'წლის 45-ე დღე'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 თებერვალი 2010'],
                ['LLL', '14 თებერვალი 2010 15:25'],
                ['LLLL', 'კვირა, 14 თებერვალი 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 თებ 2010'],
                ['lll', '14 თებ 2010 15:25'],
                ['llll', 'კვი, 14 თებ 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1-ლი').toBe('1-ლი');
        expect(moment([2011, 0, 2]).format('DDDo'), 'მე-2').toBe('მე-2');
        expect(moment([2011, 0, 3]).format('DDDo'), 'მე-3').toBe('მე-3');
        expect(moment([2011, 0, 4]).format('DDDo'), 'მე-4').toBe('მე-4');
        expect(moment([2011, 0, 5]).format('DDDo'), 'მე-5').toBe('მე-5');
        expect(moment([2011, 0, 6]).format('DDDo'), 'მე-6').toBe('მე-6');
        expect(moment([2011, 0, 7]).format('DDDo'), 'მე-7').toBe('მე-7');
        expect(moment([2011, 0, 8]).format('DDDo'), 'მე-8').toBe('მე-8');
        expect(moment([2011, 0, 9]).format('DDDo'), 'მე-9').toBe('მე-9');
        expect(moment([2011, 0, 10]).format('DDDo'), 'მე-10').toBe('მე-10');

        expect(moment([2011, 0, 11]).format('DDDo'), 'მე-11').toBe('მე-11');
        expect(moment([2011, 0, 12]).format('DDDo'), 'მე-12').toBe('მე-12');
        expect(moment([2011, 0, 13]).format('DDDo'), 'მე-13').toBe('მე-13');
        expect(moment([2011, 0, 14]).format('DDDo'), 'მე-14').toBe('მე-14');
        expect(moment([2011, 0, 15]).format('DDDo'), 'მე-15').toBe('მე-15');
        expect(moment([2011, 0, 16]).format('DDDo'), 'მე-16').toBe('მე-16');
        expect(moment([2011, 0, 17]).format('DDDo'), 'მე-17').toBe('მე-17');
        expect(moment([2011, 0, 18]).format('DDDo'), 'მე-18').toBe('მე-18');
        expect(moment([2011, 0, 19]).format('DDDo'), 'მე-19').toBe('მე-19');
        expect(moment([2011, 0, 20]).format('DDDo'), 'მე-20').toBe('მე-20');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-ე').toBe('21-ე');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-ე').toBe('22-ე');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-ე').toBe('23-ე');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-ე').toBe('24-ე');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-ე').toBe('25-ე');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-ე').toBe('26-ე');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-ე').toBe('27-ე');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-ე').toBe('28-ე');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-ე').toBe('29-ე');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-ე').toBe('30-ე');

        expect(moment('2011 40', 'YYYY DDD').format('DDDo'), 'მე-40').toBe(
            'მე-40'
        );
        expect(moment('2011 50', 'YYYY DDD').format('DDDo'), '50-ე').toBe(
            '50-ე'
        );
        expect(moment('2011 60', 'YYYY DDD').format('DDDo'), 'მე-60').toBe(
            'მე-60'
        );
        expect(moment('2011 100', 'YYYY DDD').format('DDDo'), 'მე-100').toBe(
            'მე-100'
        );
        expect(moment('2011 101', 'YYYY DDD').format('DDDo'), '101-ე').toBe(
            '101-ე'
        );
    });

    test('format month', () => {
        var i,
            expected =
                'იანვარი იან_თებერვალი თებ_მარტი მარ_აპრილი აპრ_მაისი მაი_ივნისი ივნ_ივლისი ივლ_აგვისტო აგვ_სექტემბერი სექ_ოქტომბერი ოქტ_ნოემბერი ნოე_დეკემბერი დეკ'.split(
                    '_'
                );

        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var i,
            expected =
                'კვირა კვი კვ_ორშაბათი ორშ ორ_სამშაბათი სამ სა_ოთხშაბათი ოთხ ოთ_ხუთშაბათი ხუთ ხუ_პარასკევი პარ პა_შაბათი შაბ შა'.split(
                    '_'
                );

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
            '44 წამი  = რამდენიმე წამი'
        ).toBe('რამდენიმე წამი');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 წამი  = წუთი'
        ).toBe('წუთი');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 წამი  = წუთი'
        ).toBe('წუთი');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 წამი  = 2 წუთი'
        ).toBe('2 წუთი');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 წამი  = 44 წუთი'
        ).toBe('44 წუთი');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 წამი  = საათი'
        ).toBe('საათი');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 წამი  = საათი'
        ).toBe('საათი');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 წამი  = 2 საათი'
        ).toBe('2 საათი');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 საათი  = 5 საათი'
        ).toBe('5 საათი');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 საათი = 21 საათი'
        ).toBe('21 საათი');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 საათი = დღე'
        ).toBe('დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 საათი = დღე'
        ).toBe('დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 საათი = 2 დღე'
        ).toBe('2 დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 დღე    = დღე'
        ).toBe('დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 დღე    = 5 დღე'
        ).toBe('5 დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 დღე   = 25 დღე'
        ).toBe('25 დღე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 დღე   = თვე'
        ).toBe('თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 დღე   = თვე'
        ).toBe('თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45 დღე   = თვე'
        ).toBe('თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 დღე   = 2 თვე'
        ).toBe('2 თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 დღე   = 2 თვე'
        ).toBe('2 თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 დღე   = 3 თვე'
        ).toBe('3 თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 თვე    = თვე'
        ).toBe('თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 თვე    = 5 თვე'
        ).toBe('5 თვე');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 დღე  = წელი'
        ).toBe('წელი');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 დღე  = 2 წელი'
        ).toBe('2 წელი');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 წელი   = წელი'
        ).toBe('წელი');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 წელი   = 5 წელი'
        ).toBe('5 წელი');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'ში სუფიქსი').toBe('რამდენიმე წამში');
        expect(moment(0).from(30000), 'წინ სუფიქსი').toBe(
            'რამდენიმე წამის წინ'
        );
    });

    test('now from now', () => {
        expect(moment().fromNow(), 'უნდა აჩვენოს როგორც წარსული').toBe(
            'რამდენიმე წამის წინ'
        );
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'რამდენიმე წამში').toBe(
            'რამდენიმე წამში'
        );
        expect(moment().add({ d: 5 }).fromNow(), '5 დღეში').toBe('5 დღეში');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'დღეს ამავე დროს').toBe('დღეს 12:00-ზე');
        expect(
            moment(a).add({ m: 25 }).calendar(),
            'ახლანდელ დროს დამატებული 25 წუთი'
        ).toBe('დღეს 12:25-ზე');
        expect(
            moment(a).add({ h: 1 }).calendar(),
            'ახლანდელ დროს დამატებული 1 საათი'
        ).toBe('დღეს 13:00-ზე');
        expect(moment(a).add({ d: 1 }).calendar(), 'ხვალ ამავე დროს').toBe(
            'ხვალ 12:00-ზე'
        );
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'ახლანდელ დროს გამოკლებული 1 საათი'
        ).toBe('დღეს 11:00-ზე');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'გუშინ ამავე დროს'
        ).toBe('გუშინ 12:00-ზე');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'დღეს + ' + i + ' დღე ახლანდელ დროს').toBe(
                m.format('[შემდეგ] dddd LT[-ზე]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(m.calendar(), 'დღეს + ' + i + ' დღე დღის დასაწყისში').toBe(
                m.format('[შემდეგ] dddd LT[-ზე]')
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'დღეს + ' + i + ' დღე დღის დასასრულს').toBe(
                m.format('[შემდეგ] dddd LT[-ზე]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'დღეს - ' + i + ' დღე ახლანდელ დროს').toBe(
                m.format('[წინა] dddd LT[-ზე]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(m.calendar(), 'დღეს - ' + i + ' დღე დღის დასაწყისში').toBe(
                m.format('[წინა] dddd LT[-ზე]')
            );
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'დღეს - ' + i + ' დღე დღის დასასრულს').toBe(
                m.format('[წინა] dddd LT[-ზე]')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 კვირის წინ').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), '1 კვირაში').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 კვირის წინ').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), '2 კვირაში').toBe(
            weeksFromNow.format('L')
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2011, 11, 26]).format('w ww wo'),
            'დეკ 26 2011 უნდა იყოს კვირა 1'
        ).toBe('1 01 1-ლი');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'იან  1 2012 უნდა იყოს კვირა 1'
        ).toBe('1 01 1-ლი');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'იან  2 2012 უნდა იყოს კვირა 2'
        ).toBe('2 02 მე-2');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'იან  8 2012 უნდა იყოს კვირა 2'
        ).toBe('2 02 მე-2');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'იან  9 2012 უნდა იყოს კვირა 3'
        ).toBe('3 03 მე-3');
    });
});
