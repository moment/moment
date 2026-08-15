import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/sk';

describe('locale:sk', () => {
    setupLocaleTests('sk');

    test('parse', () => {
        var tests =
                'január jan._február feb._marec mar._apríl apr._máj máj_jún jún._júl júl._august aug._september sep._október okt._november nov._december dec.'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, monthIndex) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (monthIndex + 1)
            ).toBe(monthIndex);
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

            // Fails for all months
            // equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            // Fails for all months
            // equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            // Fails for all months
            // equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss',
                    'nedeľa, február 14. 2010, 3:25:50',
                ],
                ['ddd, h', 'ne, 3'],
                ['M Mo MM MMMM MMM', '2 2. 02 február feb'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14. 14'],
                ['d do dddd ddd dd', '0 0. nedeľa ne ne'],
                ['DDD DDDo DDDD', '45 45. 045'],
                ['w wo ww', '6 6. 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['DDDo [deň v roku]', '45. deň v roku'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14. február 2010'],
                ['LLL', '14. február 2010 15:25'],
                ['LLLL', 'nedeľa 14. február 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14. feb 2010'],
                ['lll', '14. feb 2010 15:25'],
                ['llll', 'ne 14. feb 2010 15:25'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1.').toBe('1.');
        expect(moment([2011, 0, 2]).format('DDDo'), '2.').toBe('2.');
        expect(moment([2011, 0, 3]).format('DDDo'), '3.').toBe('3.');
        expect(moment([2011, 0, 4]).format('DDDo'), '4.').toBe('4.');
        expect(moment([2011, 0, 5]).format('DDDo'), '5.').toBe('5.');
        expect(moment([2011, 0, 6]).format('DDDo'), '6.').toBe('6.');
        expect(moment([2011, 0, 7]).format('DDDo'), '7.').toBe('7.');
        expect(moment([2011, 0, 8]).format('DDDo'), '8.').toBe('8.');
        expect(moment([2011, 0, 9]).format('DDDo'), '9.').toBe('9.');
        expect(moment([2011, 0, 10]).format('DDDo'), '10.').toBe('10.');

        expect(moment([2011, 0, 11]).format('DDDo'), '11.').toBe('11.');
        expect(moment([2011, 0, 12]).format('DDDo'), '12.').toBe('12.');
        expect(moment([2011, 0, 13]).format('DDDo'), '13.').toBe('13.');
        expect(moment([2011, 0, 14]).format('DDDo'), '14.').toBe('14.');
        expect(moment([2011, 0, 15]).format('DDDo'), '15.').toBe('15.');
        expect(moment([2011, 0, 16]).format('DDDo'), '16.').toBe('16.');
        expect(moment([2011, 0, 17]).format('DDDo'), '17.').toBe('17.');
        expect(moment([2011, 0, 18]).format('DDDo'), '18.').toBe('18.');
        expect(moment([2011, 0, 19]).format('DDDo'), '19.').toBe('19.');
        expect(moment([2011, 0, 20]).format('DDDo'), '20.').toBe('20.');

        expect(moment([2011, 0, 21]).format('DDDo'), '21.').toBe('21.');
        expect(moment([2011, 0, 22]).format('DDDo'), '22.').toBe('22.');
        expect(moment([2011, 0, 23]).format('DDDo'), '23.').toBe('23.');
        expect(moment([2011, 0, 24]).format('DDDo'), '24.').toBe('24.');
        expect(moment([2011, 0, 25]).format('DDDo'), '25.').toBe('25.');
        expect(moment([2011, 0, 26]).format('DDDo'), '26.').toBe('26.');
        expect(moment([2011, 0, 27]).format('DDDo'), '27.').toBe('27.');
        expect(moment([2011, 0, 28]).format('DDDo'), '28.').toBe('28.');
        expect(moment([2011, 0, 29]).format('DDDo'), '29.').toBe('29.');
        expect(moment([2011, 0, 30]).format('DDDo'), '30.').toBe('30.');

        expect(moment([2011, 0, 31]).format('DDDo'), '31.').toBe('31.');
    });

    test('format month', () => {
        var expected =
                'január jan_február feb_marec mar_apríl apr_máj máj_jún jún_júl júl_august aug_september sep_október okt_november nov_december dec'.split(
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
                'nedeľa ne ne_pondelok po po_utorok ut ut_streda st st_štvrtok št št_piatok pi pi_sobota so so'.split(
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
        ).toBe('pár sekúnd');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('minúta');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('minúta');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 minúty');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 minút');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('hodina');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('hodina');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 hodiny');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 hodín');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 hodín');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('deň');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('deň');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 dni');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('deň');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 dní');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 dní');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('mesiac');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('mesiac');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('mesiac');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 mesiace');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 mesiace');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 mesiace');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('mesiac');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 mesiacov');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('rok');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 roky');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('rok');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 rokov');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('za pár sekúnd');
        expect(moment(0).from(30000), 'suffix').toBe('pred pár sekundami');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('pred pár sekundami');
    });

    test('fromNow (future)', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in a few seconds').toBe(
            'za pár sekúnd'
        );
        expect(moment().add({ m: 1 }).fromNow(), 'in a minute').toBe(
            'za minútu'
        );
        expect(moment().add({ m: 3 }).fromNow(), 'in 3 minutes').toBe(
            'za 3 minúty'
        );
        expect(moment().add({ m: 10 }).fromNow(), 'in 10 minutes').toBe(
            'za 10 minút'
        );
        expect(moment().add({ h: 1 }).fromNow(), 'in an hour').toBe(
            'za hodinu'
        );
        expect(moment().add({ h: 3 }).fromNow(), 'in 3 hours').toBe(
            'za 3 hodiny'
        );
        expect(moment().add({ h: 10 }).fromNow(), 'in 10 hours').toBe(
            'za 10 hodín'
        );
        expect(moment().add({ d: 1 }).fromNow(), 'in a day').toBe('za deň');
        expect(moment().add({ d: 3 }).fromNow(), 'in 3 days').toBe('za 3 dni');
        expect(moment().add({ d: 10 }).fromNow(), 'in 10 days').toBe(
            'za 10 dní'
        );
        expect(moment().add({ M: 1 }).fromNow(), 'in a month').toBe(
            'za mesiac'
        );
        expect(moment().add({ M: 3 }).fromNow(), 'in 3 months').toBe(
            'za 3 mesiace'
        );
        expect(moment().add({ M: 10 }).fromNow(), 'in 10 months').toBe(
            'za 10 mesiacov'
        );
        expect(moment().add({ y: 1 }).fromNow(), 'in a year').toBe('za rok');
        expect(moment().add({ y: 3 }).fromNow(), 'in 3 years').toBe(
            'za 3 roky'
        );
        expect(moment().add({ y: 10 }).fromNow(), 'in 10 years').toBe(
            'za 10 rokov'
        );
    });

    test('fromNow (past)', () => {
        expect(
            moment().subtract({ s: 30 }).fromNow(),
            'a few seconds ago'
        ).toBe('pred pár sekundami');
        expect(moment().subtract({ m: 1 }).fromNow(), 'a minute ago').toBe(
            'pred minútou'
        );
        expect(moment().subtract({ m: 3 }).fromNow(), '3 minutes ago').toBe(
            'pred 3 minútami'
        );
        expect(moment().subtract({ m: 10 }).fromNow(), '10 minutes ago').toBe(
            'pred 10 minútami'
        );
        expect(moment().subtract({ h: 1 }).fromNow(), 'an hour ago').toBe(
            'pred hodinou'
        );
        expect(moment().subtract({ h: 3 }).fromNow(), '3 hours ago').toBe(
            'pred 3 hodinami'
        );
        expect(moment().subtract({ h: 10 }).fromNow(), '10 hours ago').toBe(
            'pred 10 hodinami'
        );
        expect(moment().subtract({ d: 1 }).fromNow(), 'a day ago').toBe(
            'pred dňom'
        );
        expect(moment().subtract({ d: 3 }).fromNow(), '3 days ago').toBe(
            'pred 3 dňami'
        );
        expect(moment().subtract({ d: 10 }).fromNow(), '10 days ago').toBe(
            'pred 10 dňami'
        );
        expect(moment().subtract({ M: 1 }).fromNow(), 'a month ago').toBe(
            'pred mesiacom'
        );
        expect(moment().subtract({ M: 3 }).fromNow(), '3 months ago').toBe(
            'pred 3 mesiacmi'
        );
        expect(moment().subtract({ M: 10 }).fromNow(), '10 months ago').toBe(
            'pred 10 mesiacmi'
        );
        expect(moment().subtract({ y: 1 }).fromNow(), 'a year ago').toBe(
            'pred rokom'
        );
        expect(moment().subtract({ y: 3 }).fromNow(), '3 years ago').toBe(
            'pred 3 rokmi'
        );
        expect(moment().subtract({ y: 10 }).fromNow(), '10 years ago').toBe(
            'pred 10 rokmi'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'dnes o 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'dnes o 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'dnes o 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('zajtra o 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('dnes o 11:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('včera o 12:00');
    });

    test('calendar next week', () => {
        var i, m, nextDay;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            nextDay = '';
            switch (m.day()) {
                case 0:
                    nextDay = 'v nedeľu';
                    break;
                case 1:
                    nextDay = 'v pondelok';
                    break;
                case 2:
                    nextDay = 'v utorok';
                    break;
                case 3:
                    nextDay = 'v stredu';
                    break;
                case 4:
                    nextDay = 'vo štvrtok';
                    break;
                case 5:
                    nextDay = 'v piatok';
                    break;
                case 6:
                    nextDay = 'v sobotu';
                    break;
            }
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('[' + nextDay + '] [o] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('[' + nextDay + '] [o] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('[' + nextDay + '] [o] LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m, lastDay;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            lastDay = '';
            switch (m.day()) {
                case 0:
                    lastDay = 'minulú nedeľu';
                    break;
                case 1:
                    lastDay = 'minulý pondelok';
                    break;
                case 2:
                    lastDay = 'minulý utorok';
                    break;
                case 3:
                    lastDay = 'minulú stredu';
                    break;
                case 4:
                    lastDay = 'minulý štvrtok';
                    break;
                case 5:
                    lastDay = 'minulý piatok';
                    break;
                case 6:
                    lastDay = 'minulú sobotu';
                    break;
            }
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[' + lastDay + '] [o] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[' + lastDay + '] [o] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[' + lastDay + '] [o] LT')
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

    test('humanize duration', () => {
        expect(
            moment.duration(1, 'minutes').humanize(),
            'a minute (future)'
        ).toBe('minúta');
        expect(
            moment.duration(1, 'minutes').humanize(true),
            'in a minute'
        ).toBe('za minútu');
        expect(
            moment.duration(-1, 'minutes').humanize(),
            'a minute (past)'
        ).toBe('minúta');
        expect(
            moment.duration(-1, 'minutes').humanize(true),
            'a minute ago'
        ).toBe('pred minútou');
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52.');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1.');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2.');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 2'
        ).toBe('2 02 2.');
    });
});
