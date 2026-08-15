import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ml';

describe('locale:ml', () => {
    setupLocaleTests('ml');

    test('parse', () => {
        var tests =
                'ജനുവരി ജനു._ഫെബ്രുവരി ഫെബ്രു._മാർച്ച് മാർ._ഏപ്രിൽ ഏപ്രി._മേയ് മേയ്_ജൂൺ ജൂൺ_ജൂലൈ ജൂലൈ._ഓഗസ്റ്റ് ഓഗ._സെപ്റ്റംബർ സെപ്റ്റ._ഒക്ടോബർ ഒക്ടോ._നവംബർ നവം._ഡിസംബർ ഡിസം.'.split(
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
                    'dddd, Do MMMM YYYY, a h:mm:ss -നു',
                    'ഞായറാഴ്ച, 14 ഫെബ്രുവരി 2010, ഉച്ച കഴിഞ്ഞ് 3:25:50 -നു',
                ],
                ['ddd, a h -നു', 'ഞായർ, ഉച്ച കഴിഞ്ഞ് 3 -നു'],
                ['M Mo MM MMMM MMM', '2 2 02 ഫെബ്രുവരി ഫെബ്രു.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 ഞായറാഴ്ച ഞായർ ഞാ'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '8 8 08'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'ഉച്ച കഴിഞ്ഞ് ഉച്ച കഴിഞ്ഞ്'],
                ['LTS', 'ഉച്ച കഴിഞ്ഞ് 3:25:50 -നു'],
                ['L', '14/02/2010'],
                ['LL', '14 ഫെബ്രുവരി 2010'],
                ['LLL', '14 ഫെബ്രുവരി 2010, ഉച്ച കഴിഞ്ഞ് 3:25 -നു'],
                ['LLLL', 'ഞായറാഴ്ച, 14 ഫെബ്രുവരി 2010, ഉച്ച കഴിഞ്ഞ് 3:25 -നു'],
                ['l', '14/2/2010'],
                ['ll', '14 ഫെബ്രു. 2010'],
                ['lll', '14 ഫെബ്രു. 2010, ഉച്ച കഴിഞ്ഞ് 3:25 -നു'],
                ['llll', 'ഞായർ, 14 ഫെബ്രു. 2010, ഉച്ച കഴിഞ്ഞ് 3:25 -നു'],
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
        expect(moment([2011, 0, 1]).format('DDDo'), '1').toBe('1');
        expect(moment([2011, 0, 2]).format('DDDo'), '2').toBe('2');
        expect(moment([2011, 0, 3]).format('DDDo'), '3').toBe('3');
        expect(moment([2011, 0, 4]).format('DDDo'), '4').toBe('4');
        expect(moment([2011, 0, 5]).format('DDDo'), '5').toBe('5');
        expect(moment([2011, 0, 6]).format('DDDo'), '6').toBe('6');
        expect(moment([2011, 0, 7]).format('DDDo'), '7').toBe('7');
        expect(moment([2011, 0, 8]).format('DDDo'), '8').toBe('8');
        expect(moment([2011, 0, 9]).format('DDDo'), '9').toBe('9');
        expect(moment([2011, 0, 10]).format('DDDo'), '10').toBe('10');

        expect(moment([2011, 0, 11]).format('DDDo'), '11').toBe('11');
        expect(moment([2011, 0, 12]).format('DDDo'), '12').toBe('12');
        expect(moment([2011, 0, 13]).format('DDDo'), '13').toBe('13');
        expect(moment([2011, 0, 14]).format('DDDo'), '14').toBe('14');
        expect(moment([2011, 0, 15]).format('DDDo'), '15').toBe('15');
        expect(moment([2011, 0, 16]).format('DDDo'), '16').toBe('16');
        expect(moment([2011, 0, 17]).format('DDDo'), '17').toBe('17');
        expect(moment([2011, 0, 18]).format('DDDo'), '18').toBe('18');
        expect(moment([2011, 0, 19]).format('DDDo'), '19').toBe('19');
        expect(moment([2011, 0, 20]).format('DDDo'), '20').toBe('20');

        expect(moment([2011, 0, 21]).format('DDDo'), '21').toBe('21');
        expect(moment([2011, 0, 22]).format('DDDo'), '22').toBe('22');
        expect(moment([2011, 0, 23]).format('DDDo'), '23').toBe('23');
        expect(moment([2011, 0, 24]).format('DDDo'), '24').toBe('24');
        expect(moment([2011, 0, 25]).format('DDDo'), '25').toBe('25');
        expect(moment([2011, 0, 26]).format('DDDo'), '26').toBe('26');
        expect(moment([2011, 0, 27]).format('DDDo'), '27').toBe('27');
        expect(moment([2011, 0, 28]).format('DDDo'), '28').toBe('28');
        expect(moment([2011, 0, 29]).format('DDDo'), '29').toBe('29');
        expect(moment([2011, 0, 30]).format('DDDo'), '30').toBe('30');

        expect(moment([2011, 0, 31]).format('DDDo'), '31').toBe('31');
    });

    test('format month', () => {
        var expected =
                'ജനുവരി ജനു._ഫെബ്രുവരി ഫെബ്രു._മാർച്ച് മാർ._ഏപ്രിൽ ഏപ്രി._മേയ് മേയ്_ജൂൺ ജൂൺ_ജൂലൈ ജൂലൈ._ഓഗസ്റ്റ് ഓഗ._സെപ്റ്റംബർ സെപ്റ്റ._ഒക്ടോബർ ഒക്ടോ._നവംബർ നവം._ഡിസംബർ ഡിസം.'.split(
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
                'ഞായറാഴ്ച ഞായർ ഞാ_തിങ്കളാഴ്ച തിങ്കൾ തി_ചൊവ്വാഴ്ച ചൊവ്വ ചൊ_ബുധനാഴ്ച ബുധൻ ബു_വ്യാഴാഴ്ച വ്യാഴം വ്യാ_വെള്ളിയാഴ്ച വെള്ളി വെ_ശനിയാഴ്ച ശനി ശ'.split(
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
        ).toBe('അൽപ നിമിഷങ്ങൾ');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('ഒരു മിനിറ്റ്');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('ഒരു മിനിറ്റ്');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 മിനിറ്റ്');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 മിനിറ്റ്');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('ഒരു മണിക്കൂർ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('ഒരു മണിക്കൂർ');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 മണിക്കൂർ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 മണിക്കൂർ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 മണിക്കൂർ');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('ഒരു ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('ഒരു ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('ഒരു ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 ദിവസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('ഒരു മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('ഒരു മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('ഒരു മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('ഒരു മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 മാസം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('ഒരു വർഷം');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 വർഷം');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('ഒരു വർഷം');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 വർഷം');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('അൽപ നിമിഷങ്ങൾ കഴിഞ്ഞ്');
        expect(moment(0).from(30000), 'suffix').toBe('അൽപ നിമിഷങ്ങൾ മുൻപ്');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'now from now should display as in the past'
        ).toBe('അൽപ നിമിഷങ്ങൾ മുൻപ്');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'അൽപ നിമിഷങ്ങൾ കഴിഞ്ഞ്').toBe(
            'അൽപ നിമിഷങ്ങൾ കഴിഞ്ഞ്'
        );
        expect(moment().add({ d: 5 }).fromNow(), '5 ദിവസം കഴിഞ്ഞ്').toBe(
            '5 ദിവസം കഴിഞ്ഞ്'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'ഇന്ന് ഉച്ച കഴിഞ്ഞ് 12:00 -നു'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'ഇന്ന് ഉച്ച കഴിഞ്ഞ് 12:25 -നു'
        );
        expect(moment(a).add({ h: 3 }).calendar(), 'Now plus 3 hours').toBe(
            'ഇന്ന് ഉച്ച കഴിഞ്ഞ് 3:00 -നു'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('നാളെ ഉച്ച കഴിഞ്ഞ് 12:00 -നു');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('ഇന്ന് രാവിലെ 11:00 -നു');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('ഇന്നലെ ഉച്ച കഴിഞ്ഞ് 12:00 -നു');
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
                m.format('[കഴിഞ്ഞ] dddd[,] LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[കഴിഞ്ഞ] dddd[,] LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[കഴിഞ്ഞ] dddd[,] LT')
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
            'രാത്രി'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            'രാവിലെ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            'ഉച്ച കഴിഞ്ഞ്'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            'വൈകുന്നേരം'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            'വൈകുന്നേരം'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('a'), 'night').toBe(
            'രാത്രി'
        );

        expect(moment([2011, 2, 23, 2, 30]).format('A'), 'before dawn').toBe(
            'രാത്രി'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('A'), 'morning').toBe(
            'രാവിലെ'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('A'), ' during day').toBe(
            'ഉച്ച കഴിഞ്ഞ്'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('A'), 'evening').toBe(
            'വൈകുന്നേരം'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('A'), 'late evening').toBe(
            'വൈകുന്നേരം'
        );
        expect(moment([2011, 2, 23, 21, 20]).format('A'), 'night').toBe(
            'രാത്രി'
        );
    });

    test('weeks year starting sunday formatted', () => {
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 7]).format('w ww wo'),
            'Jan  7 2012 should be week 1'
        ).toBe('1 01 1');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 14]).format('w ww wo'),
            'Jan 14 2012 should be week 2'
        ).toBe('2 02 2');
        expect(
            moment([2012, 0, 15]).format('w ww wo'),
            'Jan 15 2012 should be week 3'
        ).toBe('3 03 3');
    });
});
