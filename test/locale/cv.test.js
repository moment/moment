import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/cv';

describe('locale:cv', () => {
    setupLocaleTests('cv');

    test('parse', () => {
        var tests =
                'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split(
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
                    'вырсарникун, нарӑс 14-мӗш 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'выр, 3PM'],
                ['M Mo MM MMMM MMM', '2 2-мӗш 02 нарӑс нар'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-мӗш 14'],
                ['d do dddd ddd dd', '0 0-мӗш вырсарникун выр вр'],
                ['DDD DDDo DDDD', '45 45-мӗш 045'],
                ['w wo ww', '7 7-мӗш 07'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['Ҫулӑн DDDo кунӗ', 'Ҫулӑн 45-мӗш кунӗ'],
                ['LTS', '15:25:50'],
                ['L', '14-02-2010'],
                ['LL', '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ'],
                ['LLL', '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
                ['LLLL', 'вырсарникун, 2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
                ['l', '14-2-2010'],
                ['ll', '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ'],
                ['lll', '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25'],
                ['llll', 'выр, 2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1-мӗш').toBe('1-мӗш');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-мӗш').toBe('2-мӗш');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-мӗш').toBe('3-мӗш');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-мӗш').toBe('4-мӗш');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-мӗш').toBe('5-мӗш');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-мӗш').toBe('6-мӗш');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-мӗш').toBe('7-мӗш');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-мӗш').toBe('8-мӗш');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-мӗш').toBe('9-мӗш');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-мӗш').toBe('10-мӗш');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-мӗш').toBe('11-мӗш');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-мӗш').toBe('12-мӗш');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-мӗш').toBe('13-мӗш');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-мӗш').toBe('14-мӗш');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-мӗш').toBe('15-мӗш');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-мӗш').toBe('16-мӗш');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-мӗш').toBe('17-мӗш');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-мӗш').toBe('18-мӗш');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-мӗш').toBe('19-мӗш');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-мӗш').toBe('20-мӗш');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-мӗш').toBe('21-мӗш');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-мӗш').toBe('22-мӗш');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-мӗш').toBe('23-мӗш');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-мӗш').toBe('24-мӗш');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-мӗш').toBe('25-мӗш');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-мӗш').toBe('26-мӗш');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-мӗш').toBe('27-мӗш');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-мӗш').toBe('28-мӗш');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-мӗш').toBe('29-мӗш');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-мӗш').toBe('30-мӗш');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-мӗш').toBe('31-мӗш');
    });

    test('format month', () => {
        var expected =
                'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split(
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
                'вырсарникун выр вр_тунтикун тун тн_ытларикун ытл ыт_юнкун юн юн_кӗҫнерникун кӗҫ кҫ_эрнекун эрн эр_шӑматкун шӑм шм'.split(
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
            '44 sekunder = a few seconds'
        ).toBe('пӗр-ик ҫеккунт');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('пӗр минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('пӗр минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 минут');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('пӗр сехет');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('пӗр сехет');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 сехет');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 сехет');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 сехет');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('пӗр кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('пӗр кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('пӗр кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 кун');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('пӗр уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('пӗр уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('пӗр уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('пӗр уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 уйӑх');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('пӗр ҫул');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 ҫул');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('пӗр ҫул');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 ҫул');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('пӗр-ик ҫеккунтран');
        expect(moment(0).from(30000), 'suffix').toBe('пӗр-ик ҫеккунт каялла');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('пӗр-ик ҫеккунт каялла');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'пӗр-ик ҫеккунтран'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe('5 кунран');
        expect(
            moment().add({ h: 2 }).fromNow(),
            'in 2 hours, the right suffix!'
        ).toBe('2 сехетрен');
        expect(
            moment().add({ y: 3 }).fromNow(),
            'in 3 years, the right suffix!'
        ).toBe('3 ҫултан');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);
        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Паян 12:00 сехетре'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Паян 12:25 сехетре'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Паян 13:00 сехетре'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Ыран 12:00 сехетре');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Паян 11:00 сехетре');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Ӗнер 12:00 сехетре');
    });

    test('calendar next week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[Ҫитес] dddd LT [сехетре]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[Ҫитес] dddd LT [сехетре]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[Ҫитес] dddd LT [сехетре]')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[Иртнӗ] dddd LT [сехетре]')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[Иртнӗ] dddd LT [сехетре]'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[Иртнӗ] dddd LT [сехетре]')
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

    // Monday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2011, 11, 26]).format('w ww wo'),
            'Dec 26 2011 should be week 1'
        ).toBe('1 01 1-мӗш');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1-мӗш');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 2'
        ).toBe('2 02 2-мӗш');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2-мӗш');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 3'
        ).toBe('3 03 3-мӗш');
    });
});
