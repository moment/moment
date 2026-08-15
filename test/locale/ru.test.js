import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ru';

describe('locale:ru', () => {
    setupLocaleTests('ru');

    test('parse', () => {
        var tests =
                'январь янв._февраль февр._март март_апрель апр._май май_июнь июнь_июль июль_август авг._сентябрь сент._октябрь окт._ноябрь нояб._декабрь дек.'.split(
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

    test('parse exceptional case', () => {
        expect(
            moment('11 Мая 1989', ['DD MMMM YYYY']).format('DD-MM-YYYY')
        ).toBe('11-05-1989');
    });

    test('format', () => {
        var a = [
                [
                    'dddd, Do MMMM YYYY, HH:mm:ss',
                    'воскресенье, 14-го февраля 2010, 15:25:50',
                ],
                ['ddd, h A', 'вс, 3 дня'],
                ['M Mo MM MMMM MMM', '2 2-й 02 февраль февр.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14-го 14'],
                ['d do dddd ddd dd', '0 0-й воскресенье вс вс'],
                ['DDD DDDo DDDD', '45 45-й 045'],
                ['w wo ww', '6 6-я 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'дня дня'],
                ['DDDo [день года]', '45-й день года'],
                ['LT', '15:25'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14 февраля 2010 г.'],
                ['LLL', '14 февраля 2010 г., 15:25'],
                ['LLLL', 'воскресенье, 14 февраля 2010 г., 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14 февр. 2010 г.'],
                ['lll', '14 февр. 2010 г., 15:25'],
                ['llll', 'вс, 14 февр. 2010 г., 15:25'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format meridiem', () => {
        expect(moment([2012, 11, 28, 0, 0]).format('A'), 'night').toBe('ночи');
        expect(moment([2012, 11, 28, 3, 59]).format('A'), 'night').toBe('ночи');
        expect(moment([2012, 11, 28, 4, 0]).format('A'), 'morning').toBe(
            'утра'
        );
        expect(moment([2012, 11, 28, 11, 59]).format('A'), 'morning').toBe(
            'утра'
        );
        expect(moment([2012, 11, 28, 12, 0]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 16, 59]).format('A'), 'afternoon').toBe(
            'дня'
        );
        expect(moment([2012, 11, 28, 17, 0]).format('A'), 'evening').toBe(
            'вечера'
        );
        expect(moment([2012, 11, 28, 23, 59]).format('A'), 'evening').toBe(
            'вечера'
        );
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '1-й').toBe('1-й');
        expect(moment([2011, 0, 2]).format('DDDo'), '2-й').toBe('2-й');
        expect(moment([2011, 0, 3]).format('DDDo'), '3-й').toBe('3-й');
        expect(moment([2011, 0, 4]).format('DDDo'), '4-й').toBe('4-й');
        expect(moment([2011, 0, 5]).format('DDDo'), '5-й').toBe('5-й');
        expect(moment([2011, 0, 6]).format('DDDo'), '6-й').toBe('6-й');
        expect(moment([2011, 0, 7]).format('DDDo'), '7-й').toBe('7-й');
        expect(moment([2011, 0, 8]).format('DDDo'), '8-й').toBe('8-й');
        expect(moment([2011, 0, 9]).format('DDDo'), '9-й').toBe('9-й');
        expect(moment([2011, 0, 10]).format('DDDo'), '10-й').toBe('10-й');

        expect(moment([2011, 0, 11]).format('DDDo'), '11-й').toBe('11-й');
        expect(moment([2011, 0, 12]).format('DDDo'), '12-й').toBe('12-й');
        expect(moment([2011, 0, 13]).format('DDDo'), '13-й').toBe('13-й');
        expect(moment([2011, 0, 14]).format('DDDo'), '14-й').toBe('14-й');
        expect(moment([2011, 0, 15]).format('DDDo'), '15-й').toBe('15-й');
        expect(moment([2011, 0, 16]).format('DDDo'), '16-й').toBe('16-й');
        expect(moment([2011, 0, 17]).format('DDDo'), '17-й').toBe('17-й');
        expect(moment([2011, 0, 18]).format('DDDo'), '18-й').toBe('18-й');
        expect(moment([2011, 0, 19]).format('DDDo'), '19-й').toBe('19-й');
        expect(moment([2011, 0, 20]).format('DDDo'), '20-й').toBe('20-й');

        expect(moment([2011, 0, 21]).format('DDDo'), '21-й').toBe('21-й');
        expect(moment([2011, 0, 22]).format('DDDo'), '22-й').toBe('22-й');
        expect(moment([2011, 0, 23]).format('DDDo'), '23-й').toBe('23-й');
        expect(moment([2011, 0, 24]).format('DDDo'), '24-й').toBe('24-й');
        expect(moment([2011, 0, 25]).format('DDDo'), '25-й').toBe('25-й');
        expect(moment([2011, 0, 26]).format('DDDo'), '26-й').toBe('26-й');
        expect(moment([2011, 0, 27]).format('DDDo'), '27-й').toBe('27-й');
        expect(moment([2011, 0, 28]).format('DDDo'), '28-й').toBe('28-й');
        expect(moment([2011, 0, 29]).format('DDDo'), '29-й').toBe('29-й');
        expect(moment([2011, 0, 30]).format('DDDo'), '30-й').toBe('30-й');

        expect(moment([2011, 0, 31]).format('DDDo'), '31-й').toBe('31-й');
    });

    test('format month', () => {
        var expected =
                'январь янв._февраль февр._март март_апрель апр._май май_июнь июнь_июль июль_август авг._сентябрь сент._октябрь окт._ноябрь нояб._декабрь дек.'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format month case', () => {
        var months = {
                nominative:
                    'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                        '_'
                    ),
                accusative:
                    'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2011, i, 1]).format('D MMMM'),
                '1 ' + months.accusative[i]
            ).toBe('1 ' + months.accusative[i]);
            expect(
                moment([2011, i, 1]).format('MMMM'),
                '1 ' + months.nominative[i]
            ).toBe(months.nominative[i]);
        }
    });

    test('format month short case', () => {
        var monthsShort = {
                nominative:
                    'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
                        '_'
                    ),
                accusative:
                    'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2011, i, 1]).format('D MMM'),
                '1 ' + monthsShort.accusative[i]
            ).toBe('1 ' + monthsShort.accusative[i]);
            expect(
                moment([2011, i, 1]).format('MMM'),
                '1 ' + monthsShort.nominative[i]
            ).toBe(monthsShort.nominative[i]);
        }
    });

    test('format month case with escaped symbols', () => {
        var months = {
                nominative:
                    'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                        '_'
                    ),
                accusative:
                    'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2013, i, 1]).format('D[] MMMM'),
                '1 ' + months.accusative[i]
            ).toBe('1 ' + months.accusative[i]);
            expect(
                moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'),
                '1 <b>' + months.accusative[i] + '</b>'
            ).toBe('<i>1</i> <b>' + months.accusative[i] + '</b>');
            expect(
                moment([2013, i, 1]).format('D[-й день] MMMM'),
                '1-й день ' + months.accusative[i]
            ).toBe('1-й день ' + months.accusative[i]);
            expect(
                moment([2013, i, 1]).format('D, MMMM'),
                '1, ' + months.nominative[i]
            ).toBe('1, ' + months.nominative[i]);
        }
    });

    test('format month short case with escaped symbols', () => {
        var monthsShort = {
                nominative:
                    'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
                        '_'
                    ),
                accusative:
                    'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
                        '_'
                    ),
            },
            i;
        for (i = 0; i < 12; i++) {
            expect(
                moment([2013, i, 1]).format('D[] MMM'),
                '1 ' + monthsShort.accusative[i]
            ).toBe('1 ' + monthsShort.accusative[i]);
            expect(
                moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMM[</b>]'),
                '1 <b>' + monthsShort.accusative[i] + '</b>'
            ).toBe('<i>1</i> <b>' + monthsShort.accusative[i] + '</b>');
            expect(
                moment([2013, i, 1]).format('D[-й день] MMM'),
                '1-й день ' + monthsShort.accusative[i]
            ).toBe('1-й день ' + monthsShort.accusative[i]);
            expect(
                moment([2013, i, 1]).format('D, MMM'),
                '1, ' + monthsShort.nominative[i]
            ).toBe('1, ' + monthsShort.nominative[i]);
        }
    });

    test('format week', () => {
        var expected =
                'воскресенье вс вс_понедельник пн пн_вторник вт вт_среда ср ср_четверг чт чт_пятница пт пт_суббота сб сб'.split(
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
            '44 seconds = seconds'
        ).toBe('несколько секунд');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 seconds = a minute'
        ).toBe('минута');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 seconds = a minute'
        ).toBe('минута');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 seconds = 2 minutes'
        ).toBe('2 минуты');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 31 }), true),
            '31 minutes = 31 minutes'
        ).toBe('31 минута');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 minutes = 44 minutes'
        ).toBe('44 минуты');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 minutes = an hour'
        ).toBe('час');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 minutes = an hour'
        ).toBe('час');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 minutes = 2 hours'
        ).toBe('2 часа');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 hours = 5 hours'
        ).toBe('5 часов');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '21 hours = 21 hours'
        ).toBe('21 час');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '22 hours = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '35 hours = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '36 hours = 2 days'
        ).toBe('2 дня');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '1 day = a day'
        ).toBe('день');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 days = 5 days'
        ).toBe('5 дней');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 11 }), true),
            '11 days = 11 days'
        ).toBe('11 дней');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 21 }), true),
            '21 days = 21 days'
        ).toBe('21 день');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '25 days = 25 days'
        ).toBe('25 дней');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '26 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '30 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '43 days = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 days = 2 months'
        ).toBe('2 месяца');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 days = 2 months'
        ).toBe('2 месяца');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 days = 3 months'
        ).toBe('3 месяца');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '1 month = a month'
        ).toBe('месяц');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 months = 5 months'
        ).toBe('5 месяцев');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '345 days = a year'
        ).toBe('год');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 days = 2 years'
        ).toBe('2 года');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '1 year = a year'
        ).toBe('год');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 years = 5 years'
        ).toBe('5 лет');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('через несколько секунд');
        expect(moment(0).from(30000), 'suffix').toBe('несколько секунд назад');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'in seconds').toBe(
            'через несколько секунд'
        );
        expect(moment().add({ d: 5 }).fromNow(), 'in 5 days').toBe(
            'через 5 дней'
        );
        expect(
            moment().add({ m: 31 }).fromNow(),
            'in 31 minutes = in 31 minutes'
        ).toBe('через 31 минуту');
        expect(
            moment().subtract({ m: 31 }).fromNow(),
            '31 minutes ago = 31 minutes ago'
        ).toBe('31 минуту назад');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Сегодня, в 12:00'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Сегодня, в 12:25'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Сегодня, в 13:00'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Завтра, в 12:00');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Сегодня, в 11:00');
        expect(
            moment(a).subtract({ h: 4 }).calendar(),
            'Now minus 4 hours'
        ).toBe('Сегодня, в 8:00');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Вчера, в 12:00');
    });

    test('calendar next week', () => {
        var i, m, now;

        function makeFormatNext(d) {
            switch (d.day()) {
                case 0:
                    return '[В следующее] dddd, [в] LT';
                case 1:
                case 2:
                case 4:
                    return '[В следующий] dddd, [в] LT';
                case 3:
                case 5:
                case 6:
                    return '[В следующую] dddd, [в] LT';
            }
        }

        function makeFormatThis(d) {
            if (d.day() === 2) {
                return '[Во] dddd, [в] LT';
            } else {
                return '[В] dddd, [в] LT';
            }
        }

        now = moment().startOf('week');
        for (i = 2; i < 7; i++) {
            m = moment(now).add({ d: i });
            expect(m.calendar(now), 'Today + ' + i + ' days current time').toBe(
                m.format(makeFormatThis(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(now),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormatThis(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(now), 'Today + ' + i + ' days end of day').toBe(
                m.format(makeFormatThis(m))
            );
        }

        now = moment().endOf('week');
        for (i = 2; i < 7; i++) {
            m = moment(now).add({ d: i });
            expect(m.calendar(now), 'Today + ' + i + ' days current time').toBe(
                m.format(makeFormatNext(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(now),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormatNext(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(now), 'Today + ' + i + ' days end of day').toBe(
                m.format(makeFormatNext(m))
            );
        }
    });

    test('calendar last week', () => {
        var i, m, now;

        function makeFormatLast(d) {
            switch (d.day()) {
                case 0:
                    return '[В прошлое] dddd, [в] LT';
                case 1:
                case 2:
                case 4:
                    return '[В прошлый] dddd, [в] LT';
                case 3:
                case 5:
                case 6:
                    return '[В прошлую] dddd, [в] LT';
            }
        }

        function makeFormatThis(d) {
            if (d.day() === 2) {
                return '[Во] dddd, [в] LT';
            } else {
                return '[В] dddd, [в] LT';
            }
        }

        now = moment().startOf('week');
        for (i = 2; i < 7; i++) {
            m = moment(now).subtract({ d: i });
            expect(m.calendar(now), 'Today - ' + i + ' days current time').toBe(
                m.format(makeFormatLast(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(now),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormatLast(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(now), 'Today - ' + i + ' days end of day').toBe(
                m.format(makeFormatLast(m))
            );
        }

        now = moment().endOf('week');
        for (i = 2; i < 7; i++) {
            m = moment(now).subtract({ d: i });
            expect(m.calendar(now), 'Today - ' + i + ' days current time').toBe(
                m.format(makeFormatThis(m))
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(now),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format(makeFormatThis(m)));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(now), 'Today - ' + i + ' days end of day').toBe(
                m.format(makeFormatThis(m))
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

    test('weeks year starting monday formatted', () => {
        expect(
            moment([2011, 11, 26]).format('w ww wo'),
            'Dec 26 2011 should be week 52'
        ).toBe('52 52 52-я');
        expect(
            moment([2012, 0, 1]).format('w ww wo'),
            'Jan  1 2012 should be week 52'
        ).toBe('52 52 52-я');
        expect(
            moment([2012, 0, 2]).format('w ww wo'),
            'Jan  2 2012 should be week 1'
        ).toBe('1 01 1-я');
        expect(
            moment([2012, 0, 8]).format('w ww wo'),
            'Jan  8 2012 should be week 1'
        ).toBe('1 01 1-я');
        expect(
            moment([2012, 0, 9]).format('w ww wo'),
            'Jan  9 2012 should be week 2'
        ).toBe('2 02 2-я');
    });
});
