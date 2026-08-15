import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/mi';

describe('locale:mi', () => {
    setupLocaleTests('mi');

    test('parse', () => {
        var tests =
                'Kohi-tāte Kohi_Hui-tanguru Hui_Poutū-te-rangi Pou_Paenga-whāwhā Pae_Haratua Hara_Pipiri Pipi_Hōngoingoi Hōngoi_Here-turi-kōkā Here_Mahuru Mahu_Whiringa-ā-nuku Whi-nu_Whiringa-ā-rangi Whi-ra_Hakihea Haki'.split(
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
                    'Rātapu, Hui-tanguru 14º 2010, 3:25:50 pm',
                ],
                ['ddd, hA', 'Ta, 3PM'],
                ['M Mo MM MMMM MMM', '2 2º 02 Hui-tanguru Hui'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14º 14'],
                ['d do dddd ddd dd', '0 0º Rātapu Ta Ta'],
                ['DDD DDDo DDDD', '45 45º 045'],
                ['w wo ww', '6 6º 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45º day of the year'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 Hui-tanguru 2010'],
                ['LLL', '14 Hui-tanguru 2010 i 15:25'],
                ['LLLL', 'Rātapu, 14 Hui-tanguru 2010 i 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 Hui 2010'],
                ['lll', '14 Hui 2010 i 15:25'],
                ['llll', 'Ta, 14 Hui 2010 i 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1º').toBe('1º');
        expect(moment([2011, 0, 2]).format('DDDo'), '2º').toBe('2º');
        expect(moment([2011, 0, 3]).format('DDDo'), '3º').toBe('3º');
        expect(moment([2011, 0, 4]).format('DDDo'), '4º').toBe('4º');
        expect(moment([2011, 0, 5]).format('DDDo'), '5º').toBe('5º');
        expect(moment([2011, 0, 6]).format('DDDo'), '6º').toBe('6º');
        expect(moment([2011, 0, 7]).format('DDDo'), '7º').toBe('7º');
        expect(moment([2011, 0, 8]).format('DDDo'), '8º').toBe('8º');
        expect(moment([2011, 0, 9]).format('DDDo'), '9º').toBe('9º');
        expect(moment([2011, 0, 10]).format('DDDo'), '10º').toBe('10º');

        expect(moment([2011, 0, 11]).format('DDDo'), '11º').toBe('11º');
        expect(moment([2011, 0, 12]).format('DDDo'), '12º').toBe('12º');
        expect(moment([2011, 0, 13]).format('DDDo'), '13º').toBe('13º');
        expect(moment([2011, 0, 14]).format('DDDo'), '14º').toBe('14º');
        expect(moment([2011, 0, 15]).format('DDDo'), '15º').toBe('15º');
        expect(moment([2011, 0, 16]).format('DDDo'), '16º').toBe('16º');
        expect(moment([2011, 0, 17]).format('DDDo'), '17º').toBe('17º');
        expect(moment([2011, 0, 18]).format('DDDo'), '18º').toBe('18º');
        expect(moment([2011, 0, 19]).format('DDDo'), '19º').toBe('19º');
        expect(moment([2011, 0, 20]).format('DDDo'), '20º').toBe('20º');

        expect(moment([2011, 0, 21]).format('DDDo'), '21º').toBe('21º');
        expect(moment([2011, 0, 22]).format('DDDo'), '22º').toBe('22º');
        expect(moment([2011, 0, 23]).format('DDDo'), '23º').toBe('23º');
        expect(moment([2011, 0, 24]).format('DDDo'), '24º').toBe('24º');
        expect(moment([2011, 0, 25]).format('DDDo'), '25º').toBe('25º');
        expect(moment([2011, 0, 26]).format('DDDo'), '26º').toBe('26º');
        expect(moment([2011, 0, 27]).format('DDDo'), '27º').toBe('27º');
        expect(moment([2011, 0, 28]).format('DDDo'), '28º').toBe('28º');
        expect(moment([2011, 0, 29]).format('DDDo'), '29º').toBe('29º');
        expect(moment([2011, 0, 30]).format('DDDo'), '30º').toBe('30º');

        expect(moment([2011, 0, 31]).format('DDDo'), '31º').toBe('31º');
    });

    test('format month', () => {
        var expected =
                'Kohi-tāte Kohi_Hui-tanguru Hui_Poutū-te-rangi Pou_Paenga-whāwhā Pae_Haratua Hara_Pipiri Pipi_Hōngoingoi Hōngoi_Here-turi-kōkā Here_Mahuru Mahu_Whiringa-ā-nuku Whi-nu_Whiringa-ā-rangi Whi-ra_Hakihea Haki'.split(
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
                'Rātapu Ta Ta_Mane Ma Ma_Tūrei Tū Tū_Wenerei We We_Tāite Tāi Tāi_Paraire Pa Pa_Hātarei Hā Hā'.split(
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
        ).toBe('te hēkona ruarua');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('he meneti');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('he meneti');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 meneti');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 meneti');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('te haora');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('te haora');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 haora');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 haora');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 haora');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('he ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('he ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('he ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 ra');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('he marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('he marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('he marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('he marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 marama');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('he tau');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 tau');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('he tau');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 tau');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe(
            'i roto i te hēkona ruarua'
        );
        expect(moment(0).from(30000), 'suffix').toBe('te hēkona ruarua i mua');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('te hēkona ruarua i mua');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'i roto i te hēkona ruarua'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'i roto i 5 ra'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'i teie mahana, i 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'i teie mahana, i 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'i teie mahana, i 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('apopo i 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('i teie mahana, i 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('inanahi i 12:00');
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd [i] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [i] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd [i] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('dddd [whakamutunga i] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('dddd [whakamutunga i] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('dddd [whakamutunga i] LT')
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
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52º');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1º');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1º');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2º');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2º');
    });
});
