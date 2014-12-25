var moment = require('../../moment');

exports.duration = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'object instantiation' : function (test) {
        var d = moment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        test.expect(8);
        test.equal(d.years(),        2,  'years');
        test.equal(d.months(),       3,  'months');
        test.equal(d.weeks(),        2,  'weeks');
        test.equal(d.days(),         15, 'days'); // two weeks + 1 day
        test.equal(d.hours(),        8,  'hours');
        test.equal(d.minutes(),      9,  'minutes');
        test.equal(d.seconds(),      20, 'seconds');
        test.equal(d.milliseconds(), 12, 'milliseconds');
        test.done();
    },

    'object instantiation with strings' : function (test) {
        var d = moment.duration({
            years: '2',
            months: '3',
            weeks: '2',
            days: '1',
            hours: '8',
            minutes: '9',
            seconds: '20',
            milliseconds: '12'
        });

        test.expect(8);
        test.equal(d.years(),        2,  'years');
        test.equal(d.months(),       3,  'months');
        test.equal(d.weeks(),        2,  'weeks');
        test.equal(d.days(),         15, 'days'); // two weeks + 1 day
        test.equal(d.hours(),        8,  'hours');
        test.equal(d.minutes(),      9,  'minutes');
        test.equal(d.seconds(),      20, 'seconds');
        test.equal(d.milliseconds(), 12, 'milliseconds');
        test.done();
    },

    'milliseconds instantiation' : function (test) {
        test.expect(1);
        test.equal(moment.duration(72).milliseconds(), 72, 'milliseconds');
        test.done();
    },

    'instantiation by type' : function (test) {
        test.expect(16);
        test.equal(moment.duration(1, 'years').years(),                 1, 'years');
        test.equal(moment.duration(1, 'y').years(),                     1, 'y');
        test.equal(moment.duration(2, 'months').months(),               2, 'months');
        test.equal(moment.duration(2, 'M').months(),                    2, 'M');
        test.equal(moment.duration(3, 'weeks').weeks(),                 3, 'weeks');
        test.equal(moment.duration(3, 'w').weeks(),                     3, 'weeks');
        test.equal(moment.duration(4, 'days').days(),                   4, 'days');
        test.equal(moment.duration(4, 'd').days(),                      4, 'd');
        test.equal(moment.duration(5, 'hours').hours(),                 5, 'hours');
        test.equal(moment.duration(5, 'h').hours(),                     5, 'h');
        test.equal(moment.duration(6, 'minutes').minutes(),             6, 'minutes');
        test.equal(moment.duration(6, 'm').minutes(),                   6, 'm');
        test.equal(moment.duration(7, 'seconds').seconds(),             7, 'seconds');
        test.equal(moment.duration(7, 's').seconds(),                   7, 's');
        test.equal(moment.duration(8, 'milliseconds').milliseconds(),   8, 'milliseconds');
        test.equal(moment.duration(8, 'ms').milliseconds(),             8, 'ms');
        test.done();
    },

    'shortcuts' : function (test) {
        test.expect(8);
        test.equal(moment.duration({y: 1}).years(),         1, 'years = y');
        test.equal(moment.duration({M: 2}).months(),        2, 'months = M');
        test.equal(moment.duration({w: 3}).weeks(),         3, 'weeks = w');
        test.equal(moment.duration({d: 4}).days(),          4, 'days = d');
        test.equal(moment.duration({h: 5}).hours(),         5, 'hours = h');
        test.equal(moment.duration({m: 6}).minutes(),       6, 'minutes = m');
        test.equal(moment.duration({s: 7}).seconds(),       7, 'seconds = s');
        test.equal(moment.duration({ms: 8}).milliseconds(), 8, 'milliseconds = ms');
        test.done();
    },

    'generic getter' : function (test) {
        test.expect(24);
        test.equal(moment.duration(1, 'years').get('years'),                1, 'years');
        test.equal(moment.duration(1, 'years').get('year'),                 1, 'years = year');
        test.equal(moment.duration(1, 'years').get('y'),                    1, 'years = y');
        test.equal(moment.duration(2, 'months').get('months'),              2, 'months');
        test.equal(moment.duration(2, 'months').get('month'),               2, 'months = month');
        test.equal(moment.duration(2, 'months').get('M'),                   2, 'months = M');
        test.equal(moment.duration(3, 'weeks').get('weeks'),                3, 'weeks');
        test.equal(moment.duration(3, 'weeks').get('week'),                 3, 'weeks = week');
        test.equal(moment.duration(3, 'weeks').get('w'),                    3, 'weeks = w');
        test.equal(moment.duration(4, 'days').get('days'),                  4, 'days');
        test.equal(moment.duration(4, 'days').get('day'),                   4, 'days = day');
        test.equal(moment.duration(4, 'days').get('d'),                     4, 'days = d');
        test.equal(moment.duration(5, 'hours').get('hours'),                5, 'hours');
        test.equal(moment.duration(5, 'hours').get('hour'),                 5, 'hours = hour');
        test.equal(moment.duration(5, 'hours').get('h'),                    5, 'hours = h');
        test.equal(moment.duration(6, 'minutes').get('minutes'),            6, 'minutes');
        test.equal(moment.duration(6, 'minutes').get('minute'),             6, 'minutes = minute');
        test.equal(moment.duration(6, 'minutes').get('m'),                  6, 'minutes = m');
        test.equal(moment.duration(7, 'seconds').get('seconds'),            7, 'seconds');
        test.equal(moment.duration(7, 'seconds').get('second'),             7, 'seconds = second');
        test.equal(moment.duration(7, 'seconds').get('s'),                  7, 'seconds = s');
        test.equal(moment.duration(8, 'milliseconds').get('milliseconds'),  8, 'milliseconds');
        test.equal(moment.duration(8, 'milliseconds').get('millisecond'),   8, 'milliseconds = millisecond');
        test.equal(moment.duration(8, 'milliseconds').get('ms'),            8, 'milliseconds = ms');
        test.done();
    },

    'instantiation from another duration' : function (test) {
        var simple = moment.duration(1234),
            lengthy = moment.duration(60 * 60 * 24 * 360 * 1e3),
            complicated = moment.duration({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            }),
            modified = moment.duration(1, 'day').add(moment.duration(1, 'day'));

        test.expect(4);
        test.deepEqual(moment.duration(simple), simple, 'simple clones are equal');
        test.deepEqual(moment.duration(lengthy), lengthy, 'lengthy clones are equal');
        test.deepEqual(moment.duration(complicated), complicated, 'complicated clones are equal');
        test.deepEqual(moment.duration(modified), modified, 'cloning modified duration works');
        test.done();
    },

    'instantiation from 24-hour time zero' : function (test) {
        test.expect(6);
        test.equal(moment.duration('00:00').years(), 0, '0 years');
        test.equal(moment.duration('00:00').days(), 0, '0 days');
        test.equal(moment.duration('00:00').hours(), 0, '0 hours');
        test.equal(moment.duration('00:00').minutes(), 0, '0 minutes');
        test.equal(moment.duration('00:00').seconds(), 0, '0 seconds');
        test.equal(moment.duration('00:00').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instantiation from 24-hour time <24 hours' : function (test) {
        test.expect(6);
        test.equal(moment.duration('06:45').years(), 0, '0 years');
        test.equal(moment.duration('06:45').days(), 0, '0 days');
        test.equal(moment.duration('06:45').hours(), 6, '6 hours');
        test.equal(moment.duration('06:45').minutes(), 45, '45 minutes');
        test.equal(moment.duration('06:45').seconds(), 0, '0 seconds');
        test.equal(moment.duration('06:45').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instantiation from 24-hour time >24 hours' : function (test) {
        test.expect(6);
        test.equal(moment.duration('26:45').years(), 0, '0 years');
        test.equal(moment.duration('26:45').days(), 1, '0 days');
        test.equal(moment.duration('26:45').hours(), 2, '2 hours');
        test.equal(moment.duration('26:45').minutes(), 45, '45 minutes');
        test.equal(moment.duration('26:45').seconds(), 0, '0 seconds');
        test.equal(moment.duration('26:45').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan zero' : function (test) {
        test.expect(6);
        test.equal(moment.duration('00:00:00').years(), 0, '0 years');
        test.equal(moment.duration('00:00:00').days(), 0, '0 days');
        test.equal(moment.duration('00:00:00').hours(), 0, '0 hours');
        test.equal(moment.duration('00:00:00').minutes(), 0, '0 minutes');
        test.equal(moment.duration('00:00:00').seconds(), 0, '0 seconds');
        test.equal(moment.duration('00:00:00').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan with days' : function (test) {
        test.expect(6);
        test.equal(moment.duration('1.02:03:04.9999999').years(), 0, '0 years');
        test.equal(moment.duration('1.02:03:04.9999999').days(), 1, '1 day');
        test.equal(moment.duration('1.02:03:04.9999999').hours(), 2, '2 hours');
        test.equal(moment.duration('1.02:03:04.9999999').minutes(), 3, '3 minutes');
        test.equal(moment.duration('1.02:03:04.9999999').seconds(), 4, '4 seconds');
        test.equal(moment.duration('1.02:03:04.9999999').milliseconds(), 999, '999 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan without days' : function (test) {
        test.expect(10);
        test.equal(moment.duration('01:02:03.9999999').years(), 0, '0 years');
        test.equal(moment.duration('01:02:03.9999999').days(), 0, '0 days');
        test.equal(moment.duration('01:02:03.9999999').hours(), 1, '1 hour');
        test.equal(moment.duration('01:02:03.9999999').minutes(), 2, '2 minutes');
        test.equal(moment.duration('01:02:03.9999999').seconds(), 3, '3 seconds');
        test.equal(moment.duration('01:02:03.9999999').milliseconds(), 999, '999 milliseconds');

        test.equal(moment.duration('23:59:59.9999999').days(), 0, '0 days');
        test.equal(moment.duration('23:59:59.9999999').hours(), 23, '23 hours');

        test.equal(moment.duration('500:59:59.9999999').days(), 20, '500 hours overflows to 20 days');
        test.equal(moment.duration('500:59:59.9999999').hours(), 20, '500 hours overflows to 20 hours');
        test.done();
    },

    'instatiation from serialized C# TimeSpan without days or milliseconds' : function (test) {
        test.expect(6);
        test.equal(moment.duration('01:02:03').years(), 0, '0 years');
        test.equal(moment.duration('01:02:03').days(), 0, '0 days');
        test.equal(moment.duration('01:02:03').hours(), 1, '1 hour');
        test.equal(moment.duration('01:02:03').minutes(), 2, '2 minutes');
        test.equal(moment.duration('01:02:03').seconds(), 3, '3 seconds');
        test.equal(moment.duration('01:02:03').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan without milliseconds' : function (test) {
        test.expect(6);
        test.equal(moment.duration('1.02:03:04').years(), 0, '0 years');
        test.equal(moment.duration('1.02:03:04').days(), 1, '1 day');
        test.equal(moment.duration('1.02:03:04').hours(), 2, '2 hours');
        test.equal(moment.duration('1.02:03:04').minutes(), 3, '3 minutes');
        test.equal(moment.duration('1.02:03:04').seconds(), 4, '4 seconds');
        test.equal(moment.duration('1.02:03:04').milliseconds(), 0, '0 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan maxValue' : function (test) {
        var d = moment.duration('10675199.02:48:05.4775807');

        test.equal(d.years(), 29227, '29227 years');
        test.equal(d.months(), 8, '8 months');
        test.equal(d.days(), 17, '17 day');  // this should be 13

        test.equal(d.hours(), 2, '2 hours');
        test.equal(d.minutes(), 48, '48 minutes');
        test.equal(d.seconds(), 5, '5 seconds');
        test.equal(d.milliseconds(), 477, '477 milliseconds');
        test.done();
    },

    'instatiation from serialized C# TimeSpan minValue' : function (test) {
        var d = moment.duration('-10675199.02:48:05.4775808');

        test.equal(d.years(), -29227, '29653 years');
        test.equal(d.months(), -8, '8 day');
        test.equal(d.days(), -17, '17 day'); // this should be 13

        test.equal(d.hours(), -2, '2 hours');
        test.equal(d.minutes(), -48, '48 minutes');
        test.equal(d.seconds(), -5, '5 seconds');
        test.equal(d.milliseconds(), -477, '477 milliseconds');
        test.done();
    },

    'instantiation from ISO 8601 duration' : function (test) {
        test.expect(7);
        test.equal(moment.duration('P1Y2M3DT4H5M6S').asSeconds(), moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).asSeconds(), 'all fields');
        test.equal(moment.duration('P1M').asSeconds(), moment.duration({M: 1}).asSeconds(), 'single month field');
        test.equal(moment.duration('PT1M').asSeconds(), moment.duration({m: 1}).asSeconds(), 'single minute field');
        test.equal(moment.duration('P1MT2H').asSeconds(), moment.duration({M: 1, h: 2}).asSeconds(), 'random fields missing');
        test.equal(moment.duration('-P60D').asSeconds(), moment.duration({d: -60}).asSeconds(), 'negative days');
        test.equal(moment.duration('PT0.5S').asSeconds(), moment.duration({s: 0.5}).asSeconds(), 'fractional seconds');
        test.equal(moment.duration('PT0,5S').asSeconds(), moment.duration({s: 0.5}).asSeconds(), 'fractional seconds (comma)');
        test.done();
    },

    'serialization to ISO 8601 duration strings' : function (test) {
        test.expect(6);
        test.equal(moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).toISOString(), 'P1Y2M3DT4H5M6S', 'all fields');
        test.equal(moment.duration({M: -1}).toISOString(), '-P1M', 'one month ago');
        test.equal(moment.duration({m: -1}).toISOString(), '-PT1M', 'one minute ago');
        test.equal(moment.duration({s: -0.5}).toISOString(), '-PT0.5S', 'one half second ago');
        test.equal(moment.duration({y: -0.5, M: 1}).toISOString(), '-P5M', 'a month after half a year ago');
        test.equal(moment.duration({}).toISOString(), 'P0D', 'zero duration');
        test.done();
    },

    'toString acts as toISOString' : function (test) {
        test.expect(6);
        test.equal(moment.duration({y: 1, M: 2, d: 3, h: 4, m: 5, s: 6}).toString(), 'P1Y2M3DT4H5M6S', 'all fields');
        test.equal(moment.duration({M: -1}).toString(), '-P1M', 'one month ago');
        test.equal(moment.duration({m: -1}).toString(), '-PT1M', 'one minute ago');
        test.equal(moment.duration({s: -0.5}).toString(), '-PT0.5S', 'one half second ago');
        test.equal(moment.duration({y: -0.5, M: 1}).toString(), '-P5M', 'a month after half a year ago');
        test.equal(moment.duration({}).toString(), 'P0D', 'zero duration');
        test.done();
    },

    'toIsoString deprecation' : function (test) {
        test.equal(moment.duration({}).toIsoString(), moment.duration({}).toISOString(), 'toIsoString delegates to toISOString');
        test.done();
    },

    '`isodate` (python) test cases' : function (test) {
        test.expect(24);
        test.equal(moment.duration('P18Y9M4DT11H9M8S').asSeconds(), moment.duration({y: 18, M: 9, d: 4, h: 11, m: 9, s: 8}).asSeconds(), 'python isodate 1');
        test.equal(moment.duration('P2W').asSeconds(), moment.duration({w: 2}).asSeconds(), 'python isodate 2');
        test.equal(moment.duration('P3Y6M4DT12H30M5S').asSeconds(), moment.duration({y: 3, M: 6, d: 4, h: 12, m: 30, s: 5}).asSeconds(), 'python isodate 3');
        test.equal(moment.duration('P23DT23H').asSeconds(), moment.duration({d: 23, h: 23}).asSeconds(), 'python isodate 4');
        test.equal(moment.duration('P4Y').asSeconds(), moment.duration({y: 4}).asSeconds(), 'python isodate 5');
        test.equal(moment.duration('P1M').asSeconds(), moment.duration({M: 1}).asSeconds(), 'python isodate 6');
        test.equal(moment.duration('PT1M').asSeconds(), moment.duration({m: 1}).asSeconds(), 'python isodate 7');
        test.equal(moment.duration('P0.5Y').asSeconds(), moment.duration({y: 0.5}).asSeconds(), 'python isodate 8');
        test.equal(moment.duration('PT36H').asSeconds(), moment.duration({h: 36}).asSeconds(), 'python isodate 9');
        test.equal(moment.duration('P1DT12H').asSeconds(), moment.duration({d: 1, h: 12}).asSeconds(), 'python isodate 10');
        test.equal(moment.duration('-P2W').asSeconds(), moment.duration({w: -2}).asSeconds(), 'python isodate 11');
        test.equal(moment.duration('-P2.2W').asSeconds(), moment.duration({w: -2.2}).asSeconds(), 'python isodate 12');
        test.equal(moment.duration('P1DT2H3M4S').asSeconds(), moment.duration({d: 1, h: 2, m: 3, s: 4}).asSeconds(), 'python isodate 13');
        test.equal(moment.duration('P1DT2H3M').asSeconds(), moment.duration({d: 1, h: 2, m: 3}).asSeconds(), 'python isodate 14');
        test.equal(moment.duration('P1DT2H').asSeconds(), moment.duration({d: 1, h: 2}).asSeconds(), 'python isodate 15');
        test.equal(moment.duration('PT2H').asSeconds(), moment.duration({h: 2}).asSeconds(), 'python isodate 16');
        test.equal(moment.duration('PT2.3H').asSeconds(), moment.duration({h: 2.3}).asSeconds(), 'python isodate 17');
        test.equal(moment.duration('PT2H3M4S').asSeconds(), moment.duration({h: 2, m: 3, s: 4}).asSeconds(), 'python isodate 18');
        test.equal(moment.duration('PT3M4S').asSeconds(), moment.duration({m: 3, s: 4}).asSeconds(), 'python isodate 19');
        test.equal(moment.duration('PT22S').asSeconds(), moment.duration({s: 22}).asSeconds(), 'python isodate 20');
        test.equal(moment.duration('PT22.22S').asSeconds(), moment.duration({s: 22.22}).asSeconds(), 'python isodate 21');
        test.equal(moment.duration('-P2Y').asSeconds(), moment.duration({y: -2}).asSeconds(), 'python isodate 22');
        test.equal(moment.duration('-P3Y6M4DT12H30M5S').asSeconds(), moment.duration({y: -3, M: -6, d: -4, h: -12, m: -30, s: -5}).asSeconds(), 'python isodate 23');
        test.equal(moment.duration('-P1DT2H3M4S').asSeconds(), moment.duration({d: -1, h: -2, m: -3, s: -4}).asSeconds(), 'python isodate 24');
        test.done();
    },

    'ISO 8601 misuse cases' : function (test) {
        test.expect(8);
        test.equal(moment.duration('P').asSeconds(), 0, 'lonely P');
        test.equal(moment.duration('PT').asSeconds(), 0, 'just P and T');
        test.equal(moment.duration('P1H').asSeconds(), 0, 'missing T');
        test.equal(moment.duration('P1D1Y').asSeconds(), 0, 'out of order');
        test.equal(moment.duration('PT.5S').asSeconds(), 0.5, 'accept no leading zero for decimal');
        test.equal(moment.duration('PT1,S').asSeconds(), 1, 'accept trailing decimal separator');
        test.equal(moment.duration('PT1M0,,5S').asSeconds(), 60, 'extra decimal separators are ignored as 0');
        test.equal(moment.duration('P-1DS').asSeconds(), 0, 'wrong position of negative');
        test.done();
    },

    'humanize' : function (test) {
        test.expect(32);
        moment.locale('en');
        test.equal(moment.duration({seconds: 44}).humanize(),  'a few seconds', '44 seconds = a few seconds');
        test.equal(moment.duration({seconds: 45}).humanize(),  'a minute',      '45 seconds = a minute');
        test.equal(moment.duration({seconds: 89}).humanize(),  'a minute',      '89 seconds = a minute');
        test.equal(moment.duration({seconds: 90}).humanize(),  '2 minutes',     '90 seconds = 2 minutes');
        test.equal(moment.duration({minutes: 44}).humanize(),  '44 minutes',    '44 minutes = 44 minutes');
        test.equal(moment.duration({minutes: 45}).humanize(),  'an hour',       '45 minutes = an hour');
        test.equal(moment.duration({minutes: 89}).humanize(),  'an hour',       '89 minutes = an hour');
        test.equal(moment.duration({minutes: 90}).humanize(),  '2 hours',       '90 minutes = 2 hours');
        test.equal(moment.duration({hours: 5}).humanize(),     '5 hours',       '5 hours = 5 hours');
        test.equal(moment.duration({hours: 21}).humanize(),    '21 hours',      '21 hours = 21 hours');
        test.equal(moment.duration({hours: 22}).humanize(),    'a day',         '22 hours = a day');
        test.equal(moment.duration({hours: 35}).humanize(),    'a day',         '35 hours = a day');
        test.equal(moment.duration({hours: 36}).humanize(),    '2 days',        '36 hours = 2 days');
        test.equal(moment.duration({days: 1}).humanize(),      'a day',         '1 day = a day');
        test.equal(moment.duration({days: 5}).humanize(),      '5 days',        '5 days = 5 days');
        test.equal(moment.duration({weeks: 1}).humanize(),     '7 days',        '1 week = 7 days');
        test.equal(moment.duration({days: 25}).humanize(),     '25 days',       '25 days = 25 days');
        test.equal(moment.duration({days: 26}).humanize(),     'a month',       '26 days = a month');
        test.equal(moment.duration({days: 30}).humanize(),     'a month',       '30 days = a month');
        test.equal(moment.duration({days: 45}).humanize(),     'a month',       '45 days = a month');
        test.equal(moment.duration({days: 46}).humanize(),     '2 months',      '46 days = 2 months');
        test.equal(moment.duration({days: 74}).humanize(),     '2 months',      '74 days = 2 months');
        test.equal(moment.duration({days: 77}).humanize(),     '3 months',      '77 days = 3 months');
        test.equal(moment.duration({months: 1}).humanize(),    'a month',       '1 month = a month');
        test.equal(moment.duration({months: 5}).humanize(),    '5 months',      '5 months = 5 months');
        test.equal(moment.duration({days: 344}).humanize(),    'a year',        '344 days = a year');
        test.equal(moment.duration({days: 345}).humanize(),    'a year',        '345 days = a year');
        test.equal(moment.duration({days: 547}).humanize(),    'a year',        '547 days = a year');
        test.equal(moment.duration({days: 548}).humanize(),    '2 years',       '548 days = 2 years');
        test.equal(moment.duration({years: 1}).humanize(),     'a year',        '1 year = a year');
        test.equal(moment.duration({years: 5}).humanize(),     '5 years',       '5 years = 5 years');
        test.equal(moment.duration(7200000).humanize(),        '2 hours',       '7200000 = 2 minutes');
        test.done();
    },

    'humanize duration with suffix' : function (test) {
        test.expect(2);
        moment.locale('en');
        test.equal(moment.duration({seconds:  44}).humanize(true),  'in a few seconds', '44 seconds = a few seconds');
        test.equal(moment.duration({seconds: -44}).humanize(true),  'a few seconds ago', '44 seconds = a few seconds');
        test.done();
    },

    'bubble value up' : function (test) {
        test.expect(5);
        test.equal(moment.duration({milliseconds: 61001}).milliseconds(), 1, '61001 milliseconds has 1 millisecond left over');
        test.equal(moment.duration({milliseconds: 61001}).seconds(),      1, '61001 milliseconds has 1 second left over');
        test.equal(moment.duration({milliseconds: 61001}).minutes(),      1, '61001 milliseconds has 1 minute left over');

        test.equal(moment.duration({minutes: 350}).minutes(), 50, '350 minutes has 50 minutes left over');
        test.equal(moment.duration({minutes: 350}).hours(),   5,  '350 minutes has 5 hours left over');
        test.done();
    },

    'clipping' : function (test) {
        test.expect(18);
        test.equal(moment.duration({months: 11}).months(), 11, '11 months is 11 months');
        test.equal(moment.duration({months: 11}).years(),  0,  '11 months makes no year');
        test.equal(moment.duration({months: 12}).months(), 0,  '12 months is 0 months left over');
        test.equal(moment.duration({months: 12}).years(),  1,  '12 months makes 1 year');
        test.equal(moment.duration({months: 13}).months(), 1,  '13 months is 1 month left over');
        test.equal(moment.duration({months: 13}).years(),  1,  '13 months makes 1 year');

        test.equal(moment.duration({days: 29}).days(),   29, '29 days is 29 days');
        test.equal(moment.duration({days: 29}).months(), 0,  '29 days makes no month');
        test.equal(moment.duration({days: 30}).days(),   0,  '30 days is 0 days left over');
        test.equal(moment.duration({days: 30}).months(), 1,  '30 days is a month');
        test.equal(moment.duration({days: 31}).days(),   1,  '31 days is 1 day left over');
        test.equal(moment.duration({days: 31}).months(), 1,  '31 days is a month');

        test.equal(moment.duration({hours: 23}).hours(), 23, '23 hours is 23 hours');
        test.equal(moment.duration({hours: 23}).days(),  0,  '23 hours makes no day');
        test.equal(moment.duration({hours: 24}).hours(), 0,  '24 hours is 0 hours left over');
        test.equal(moment.duration({hours: 24}).days(),  1,  '24 hours makes 1 day');
        test.equal(moment.duration({hours: 25}).hours(), 1,  '25 hours is 1 hour left over');
        test.equal(moment.duration({hours: 25}).days(),  1,  '25 hours makes 1 day');
        test.done();
    },

    'effective equivalency' : function (test) {
        test.expect(7);
        test.deepEqual(moment.duration({seconds: 1})._data,  moment.duration({milliseconds: 1000})._data, '1 second is the same as 1000 milliseconds');
        test.deepEqual(moment.duration({seconds: 60})._data, moment.duration({minutes: 1})._data,         '1 minute is the same as 60 seconds');
        test.deepEqual(moment.duration({minutes: 60})._data, moment.duration({hours: 1})._data,           '1 hour is the same as 60 minutes');
        test.deepEqual(moment.duration({hours: 24})._data,   moment.duration({days: 1})._data,            '1 day is the same as 24 hours');
        test.deepEqual(moment.duration({days: 7})._data,     moment.duration({weeks: 1})._data,           '1 week is the same as 7 days');
        test.deepEqual(moment.duration({days: 30})._data,    moment.duration({months: 1})._data,          '1 month is the same as 30 days');
        test.deepEqual(moment.duration({months: 12})._data,  moment.duration({years: 1})._data,           '1 years is the same as 12 months');
        test.done();
    },

    'asGetters' : function (test) {
        // 400 years have exactly 146097 days
        test.expect(84);

        // years
        test.equal(moment.duration(1, 'year').asYears(),            1,           '1 year as years');
        test.equal(moment.duration(1, 'year').asMonths(),           12,          '1 year as months');
        test.equal(moment.duration(400, 'year').asMonths(),         4800,        '400 years as months');
        test.equal(moment.duration(1, 'year').asWeeks().toFixed(3), 52.143,      '1 year as weeks');
        test.equal(moment.duration(1, 'year').asDays(),             365,         '1 year as days');
        test.equal(moment.duration(2, 'year').asDays(),             730,         '2 years as days');
        test.equal(moment.duration(3, 'year').asDays(),             1096,        '3 years as days');
        test.equal(moment.duration(4, 'year').asDays(),             1461,        '4 years as days');
        test.equal(moment.duration(400, 'year').asDays(),           146097,      '400 years as days');
        test.equal(moment.duration(1, 'year').asHours(),            8760,        '1 year as hours');
        test.equal(moment.duration(1, 'year').asMinutes(),          525600,      '1 year as minutes');
        test.equal(moment.duration(1, 'year').asSeconds(),          31536000,    '1 year as seconds');
        test.equal(moment.duration(1, 'year').asMilliseconds(),     31536000000, '1 year as milliseconds');

        // months
        test.equal(moment.duration(1, 'month').asYears().toFixed(4), 0.0833,     '1 month as years');
        test.equal(moment.duration(1, 'month').asMonths(),           1,          '1 month as months');
        test.equal(moment.duration(1, 'month').asWeeks().toFixed(3), 4.286,      '1 month as weeks');
        test.equal(moment.duration(1, 'month').asDays(),             30,         '1 month as days');
        test.equal(moment.duration(2, 'month').asDays(),             61,         '2 months as days');
        test.equal(moment.duration(3, 'month').asDays(),             91,         '3 months as days');
        test.equal(moment.duration(4, 'month').asDays(),             122,        '4 months as days');
        test.equal(moment.duration(5, 'month').asDays(),             152,        '5 months as days');
        test.equal(moment.duration(6, 'month').asDays(),             183,        '6 months as days');
        test.equal(moment.duration(7, 'month').asDays(),             213,        '7 months as days');
        test.equal(moment.duration(8, 'month').asDays(),             243,        '8 months as days');
        test.equal(moment.duration(9, 'month').asDays(),             274,        '9 months as days');
        test.equal(moment.duration(10, 'month').asDays(),            304,        '10 months as days');
        test.equal(moment.duration(11, 'month').asDays(),            335,        '11 months as days');
        test.equal(moment.duration(12, 'month').asDays(),            365,        '12 months as days');
        test.equal(moment.duration(24, 'month').asDays(),            730,        '24 months as days');
        test.equal(moment.duration(36, 'month').asDays(),            1096,       '36 months as days');
        test.equal(moment.duration(48, 'month').asDays(),            1461,       '48 months as days');
        test.equal(moment.duration(4800, 'month').asDays(),          146097,     '4800 months as days');
        test.equal(moment.duration(1, 'month').asHours(),            720,        '1 month as hours');
        test.equal(moment.duration(1, 'month').asMinutes(),          43200,      '1 month as minutes');
        test.equal(moment.duration(1, 'month').asSeconds(),          2592000,    '1 month as seconds');
        test.equal(moment.duration(1, 'month').asMilliseconds(),     2592000000, '1 month as milliseconds');

        // weeks
        test.equal(moment.duration(1, 'week').asYears().toFixed(4),  0.0192,    '1 week as years');
        test.equal(moment.duration(1, 'week').asMonths().toFixed(3), 0.230,     '1 week as months');
        test.equal(moment.duration(1, 'week').asWeeks(),             1,         '1 week as weeks');
        test.equal(moment.duration(1, 'week').asDays(),              7,         '1 week as days');
        test.equal(moment.duration(1, 'week').asHours(),             168,       '1 week as hours');
        test.equal(moment.duration(1, 'week').asMinutes(),           10080,     '1 week as minutes');
        test.equal(moment.duration(1, 'week').asSeconds(),           604800,    '1 week as seconds');
        test.equal(moment.duration(1, 'week').asMilliseconds(),      604800000, '1 week as milliseconds');

        // days
        test.equal(moment.duration(1, 'day').asYears().toFixed(4),  0.0027,   '1 day as years');
        test.equal(moment.duration(1, 'day').asMonths().toFixed(3), 0.033,    '1 day as months');
        test.equal(moment.duration(1, 'day').asWeeks().toFixed(3),  0.143,    '1 day as weeks');
        test.equal(moment.duration(1, 'day').asDays(),              1,        '1 day as days');
        test.equal(moment.duration(1, 'day').asHours(),             24,       '1 day as hours');
        test.equal(moment.duration(1, 'day').asMinutes(),           1440,     '1 day as minutes');
        test.equal(moment.duration(1, 'day').asSeconds(),           86400,    '1 day as seconds');
        test.equal(moment.duration(1, 'day').asMilliseconds(),      86400000, '1 day as milliseconds');

        // hours
        test.equal(moment.duration(1, 'hour').asYears().toFixed(6),  0.000114, '1 hour as years');
        test.equal(moment.duration(1, 'hour').asMonths().toFixed(5), 0.00137,  '1 hour as months');
        test.equal(moment.duration(1, 'hour').asWeeks().toFixed(5),  0.00595,  '1 hour as weeks');
        test.equal(moment.duration(1, 'hour').asDays().toFixed(4),   0.0417,   '1 hour as days');
        test.equal(moment.duration(1, 'hour').asHours(),             1,        '1 hour as hours');
        test.equal(moment.duration(1, 'hour').asMinutes(),           60,       '1 hour as minutes');
        test.equal(moment.duration(1, 'hour').asSeconds(),           3600,     '1 hour as seconds');
        test.equal(moment.duration(1, 'hour').asMilliseconds(),      3600000,  '1 hour as milliseconds');

        // minutes
        test.equal(moment.duration(1, 'minute').asYears().toFixed(8),  0.00000190, '1 minute as years');
        test.equal(moment.duration(1, 'minute').asMonths().toFixed(7), 0.0000228,  '1 minute as months');
        test.equal(moment.duration(1, 'minute').asWeeks().toFixed(7),  0.0000992,  '1 minute as weeks');
        test.equal(moment.duration(1, 'minute').asDays().toFixed(6),   0.000694,   '1 minute as days');
        test.equal(moment.duration(1, 'minute').asHours().toFixed(4),  0.0167,     '1 minute as hours');
        test.equal(moment.duration(1, 'minute').asMinutes(),           1,          '1 minute as minutes');
        test.equal(moment.duration(1, 'minute').asSeconds(),           60,         '1 minute as seconds');
        test.equal(moment.duration(1, 'minute').asMilliseconds(),      60000,      '1 minute as milliseconds');

        // seconds
        test.equal(moment.duration(1, 'second').asYears().toFixed(10),  0.0000000317, '1 second as years');
        test.equal(moment.duration(1, 'second').asMonths().toFixed(9),  0.000000380,  '1 second as months');
        test.equal(moment.duration(1, 'second').asWeeks().toFixed(8),   0.00000165,   '1 second as weeks');
        test.equal(moment.duration(1, 'second').asDays().toFixed(7),    0.0000116,    '1 second as days');
        test.equal(moment.duration(1, 'second').asHours().toFixed(6),   0.000278,     '1 second as hours');
        test.equal(moment.duration(1, 'second').asMinutes().toFixed(4), 0.0167,       '1 second as minutes');
        test.equal(moment.duration(1, 'second').asSeconds(),            1,            '1 second as seconds');
        test.equal(moment.duration(1, 'second').asMilliseconds(),       1000,         '1 second as milliseconds');

        // milliseconds
        test.equal(moment.duration(1, 'millisecond').asYears().toFixed(13),  0.0000000000317, '1 millisecond as years');
        test.equal(moment.duration(1, 'millisecond').asMonths().toFixed(12), 0.000000000380,  '1 millisecond as months');
        test.equal(moment.duration(1, 'millisecond').asWeeks().toFixed(11),  0.00000000165,   '1 millisecond as weeks');
        test.equal(moment.duration(1, 'millisecond').asDays().toFixed(10),   0.0000000116,    '1 millisecond as days');
        test.equal(moment.duration(1, 'millisecond').asHours().toFixed(9),   0.000000278,     '1 millisecond as hours');
        test.equal(moment.duration(1, 'millisecond').asMinutes().toFixed(7), 0.0000167,       '1 millisecond as minutes');
        test.equal(moment.duration(1, 'millisecond').asSeconds(),            0.001,           '1 millisecond as seconds');
        test.equal(moment.duration(1, 'millisecond').asMilliseconds(),       1,               '1 millisecond as milliseconds');

        test.done();
    },

    'as getters for small units' : function (test) {
        var dS = moment.duration(1, 'milliseconds'),
            ds = moment.duration(3, 'seconds'),
            dm = moment.duration(13, 'minutes');

        test.expect(6);
        // Tests for issue #1867.
        // Floating point errors for small duration units were introduced in version 2.8.0.
        test.equal(dS.as('milliseconds'), 1, 'as("milliseconds")');
        test.equal(dS.asMilliseconds(),   1, 'asMilliseconds()');
        test.equal(ds.as('seconds'),      3, 'as("seconds")');
        test.equal(ds.asSeconds(),        3, 'asSeconds()');
        test.equal(dm.as('minutes'),      13, 'as("minutes")');
        test.equal(dm.asMinutes(),        13, 'asMinutes()');
        test.done();
    },

    'isDuration' : function (test) {
        test.expect(3);
        test.ok(moment.isDuration(moment.duration(12345678)), 'correctly says true');
        test.ok(!moment.isDuration(moment()), 'moment object is not a duration');
        test.ok(!moment.isDuration({milliseconds: 1}), 'plain object is not a duration');
        test.done();
    },

    'add' : function (test) {
        test.expect(4);

        var d = moment.duration({months: 4, weeks: 3, days: 2});
        // for some reason, d._data._months does not get updated; use d._months instead.
        test.equal(d.add(1, 'month')._months, 5, 'Add months');
        test.equal(d.add(5, 'days')._days, 28, 'Add days');
        test.equal(d.add(10000)._milliseconds, 10000, 'Add milliseconds');
        test.equal(d.add({h: 23, m: 59})._milliseconds, 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 10000, 'Add hour:minute');

        test.done();
    },

    'add and bubble' : function (test) {
        test.expect(4);

        test.equal(moment.duration(1, 'second').add(1000, 'milliseconds').seconds(), 2, 'Adding milliseconds should bubble up to seconds');
        test.equal(moment.duration(1, 'minute').add(60, 'second').minutes(), 2, 'Adding seconds should bubble up to minutes');
        test.equal(moment.duration(1, 'hour').add(60, 'minutes').hours(), 2, 'Adding minutes should bubble up to hours');
        test.equal(moment.duration(1, 'day').add(24, 'hours').days(), 2, 'Adding hours should bubble up to days');

        test.done();
    },

    'subtract and bubble' : function (test) {
        test.expect(4);

        test.equal(moment.duration(2, 'second').subtract(1000, 'milliseconds').seconds(), 1, 'Subtracting milliseconds should bubble up to seconds');
        test.equal(moment.duration(2, 'minute').subtract(60, 'second').minutes(), 1, 'Subtracting seconds should bubble up to minutes');
        test.equal(moment.duration(2, 'hour').subtract(60, 'minutes').hours(), 1, 'Subtracting minutes should bubble up to hours');
        test.equal(moment.duration(2, 'day').subtract(24, 'hours').days(), 1, 'Subtracting hours should bubble up to days');

        test.done();
    },

    'subtract' : function (test) {
        test.expect(4);

        var d = moment.duration({months: 2, weeks: 2, days: 0, hours: 5});
        // for some reason, d._data._months does not get updated; use d._months instead.
        test.equal(d.subtract(1, 'months')._months, 1, 'Subtract months');
        test.equal(d.subtract(14, 'days')._days, 0, 'Subtract days');
        test.equal(d.subtract(10000)._milliseconds, 5 * 60 * 60 * 1000 - 10000, 'Subtract milliseconds');
        test.equal(d.subtract({h: 1, m: 59})._milliseconds, 3 * 60 * 60 * 1000 + 1 * 60 * 1000 - 10000, 'Subtract hour:minute');

        test.done();
    },

    'JSON.stringify duration' : function (test) {
        var d = moment.duration(1024, 'h');

        test.expect(1);
        test.equal(JSON.stringify(d), '"' + d.toISOString() + '"', 'JSON.stringify on duration should return ISO string');
        test.done();
    }

};
