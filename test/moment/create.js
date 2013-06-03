var moment = require("../../moment");

exports.create = {
    "array" : function(test) {
        test.expect(8);
        test.ok(moment([2010]).toDate() instanceof Date, "[2010]");
        test.ok(moment([2010, 1]).toDate() instanceof Date, "[2010, 1]");
        test.ok(moment([2010, 1, 12]).toDate() instanceof Date, "[2010, 1, 12]");
        test.ok(moment([2010, 1, 12, 1]).toDate() instanceof Date, "[2010, 1, 12, 1]");
        test.ok(moment([2010, 1, 12, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1]");
        test.ok(moment([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1]");
        test.ok(moment([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1, 1]");
        test.equal(+moment(new Date(2010, 1, 14, 15, 25, 50, 125)), +moment([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
        test.done();
    },

    "array copying": function(test) {
        var importantArray = [2009, 11];
        test.expect(1);
        moment(importantArray);
        test.deepEqual(importantArray, [2009, 11], "initializer should not mutate the original array");
        test.done();
    },

    "multi format array copying": function(test) {
        var importantArray = ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'];
        test.expect(1);
        moment('1999-02-13', importantArray);
        test.deepEqual(importantArray, ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'], "initializer should not mutate the original array");
        test.done();
    },

    "number" : function(test) {
        test.expect(3);
        test.ok(moment(1000).toDate() instanceof Date, "1000");
        test.ok((moment(1000).valueOf() === 1000), "testing valueOf");
        test.ok((moment.utc(1000).valueOf() === 1000), "testing valueOf");
        test.done();
    },

    "unix" : function(test) {
        test.expect(8);
        test.equal(moment.unix(1).valueOf(), 1000, "1 unix timestamp == 1000 Date.valueOf");
        test.equal(moment(1000).unix(), 1, "1000 Date.valueOf == 1 unix timestamp");
        test.equal(moment.unix(1000).valueOf(), 1000000, "1000 unix timestamp == 1000000 Date.valueOf");
        test.equal(moment(1500).unix(), 1, "1500 Date.valueOf == 1 unix timestamp");
        test.equal(moment(1900).unix(), 1, "1900 Date.valueOf == 1 unix timestamp");
        test.equal(moment(2100).unix(), 2, "2100 Date.valueOf == 2 unix timestamp");
        test.equal(moment(1333129333524).unix(), 1333129333, "1333129333524 Date.valueOf == 1333129333 unix timestamp");
        test.equal(moment(1333129333524000).unix(), 1333129333524, "1333129333524000 Date.valueOf == 1333129333524 unix timestamp");
        test.done();
    },

    "date" : function(test) {
        test.expect(1);
        test.ok(moment(new Date()).toDate() instanceof Date, "new Date()");
        test.done();
    },

    "date mutation" : function(test) {
        test.expect(1);
        var a = new Date();
        test.ok(moment(a).toDate() !== a, "the date moment uses should not be the date passed in");
        test.done();
    },

    "moment" : function(test) {
        test.expect(2);
        test.ok(moment(moment()).toDate() instanceof Date, "moment(moment())");
        test.ok(moment(moment(moment())).toDate() instanceof Date, "moment(moment(moment()))");
        test.done();
    },

    "cloning moment should only copy own properties" : function(test) {
        test.expect(2);
        test.ok(!moment().clone().hasOwnProperty('month'), "Should not clone prototype methods");
        test.ok(!moment().clone().hasOwnProperty('_lang'), "Should not clone prototype objects");
        test.done();
    },

    "undefined" : function(test) {
        test.expect(1);
        test.ok(moment().toDate() instanceof Date, "undefined");
        test.done();
    },

    "string without format" : function(test) {
        test.expect(2);
        test.ok(moment("Aug 9, 1995").toDate() instanceof Date, "Aug 9, 1995");
        test.ok(moment("Mon, 25 Dec 1995 13:30:00 GMT").toDate() instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
        test.done();
    },

    "string without format - json" : function(test) {
        test.expect(5);
        test.equal(moment("Date(1325132654000)").valueOf(), 1325132654000, "Date(1325132654000)");
        test.equal(moment("Date(-1325132654000)").valueOf(), -1325132654000, "Date(-1325132654000)");
        test.equal(moment("/Date(1325132654000)/").valueOf(), 1325132654000, "/Date(1325132654000)/");
        test.equal(moment("/Date(1325132654000+0700)/").valueOf(), 1325132654000, "/Date(1325132654000+0700)/");
        test.equal(moment("/Date(1325132654000-0700)/").valueOf(), 1325132654000, "/Date(1325132654000-0700)/");
        test.done();
    },

    "string with format dropped am/pm bug" : function(test) {
        moment.lang('en');
        test.expect(3);

        test.equal(moment('05/1/2012', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
        test.equal(moment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
        test.equal(moment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');

        test.done();
    },

    "empty string with formats" : function(test) {
        test.expect(3);

        test.equal(moment(' ', 'MM').format('YYYY-MM-DD HH:mm:ss'), '0000-01-01 00:00:00', 'should not break if input is an empty string');
        test.equal(moment(' ', 'DD').format('YYYY-MM-DD HH:mm:ss'), '0000-01-01 00:00:00', 'should not break if input is an empty string');
        test.equal(moment(' ', ['MM', "DD"]).format('YYYY-MM-DD HH:mm:ss'), '0000-01-01 00:00:00', 'should not break if input is an empty string');

        test.done();
    },

    "matching am/pm" : function(test) {
        test.expect(13);

        test.equal(moment('2012-09-03T03:00PM',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for PM');
        test.equal(moment('2012-09-03T03:00P.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P.M.');
        test.equal(moment('2012-09-03T03:00P',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P');
        test.equal(moment('2012-09-03T03:00pm',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for pm');
        test.equal(moment('2012-09-03T03:00p.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p.m.');
        test.equal(moment('2012-09-03T03:00p',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p');

        test.equal(moment('2012-09-03T03:00AM',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for AM');
        test.equal(moment('2012-09-03T03:00A.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A.M.');
        test.equal(moment('2012-09-03T03:00A',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A');
        test.equal(moment('2012-09-03T03:00am',   'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for am');
        test.equal(moment('2012-09-03T03:00a.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a.m.');
        test.equal(moment('2012-09-03T03:00a',    'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a');

        test.equal(moment('5:00p.m.March 4 2012', 'h:mmAMMMM D YYYY').format('YYYY-MM-DDThh:mmA'), '2012-03-04T05:00PM', 'am/pm should parse correctly before month names');

        test.done();
    },

    "string with format" : function(test) {
        moment.lang('en');
        var a = [
                ['MM-DD-YYYY',          '12-02-1999'],
                ['DD-MM-YYYY',          '12-02-1999'],
                ['DD/MM/YYYY',          '12/02/1999'],
                ['DD_MM_YYYY',          '12_02_1999'],
                ['DD:MM:YYYY',          '12:02:1999'],
                ['D-M-YY',              '2-2-99'],
                ['YY',                  '99'],
                ['DDD-YYYY',            '300-1999'],
                ['DD-MM-YYYY h:m:s',    '12-02-1999 2:45:10'],
                ['DD-MM-YYYY h:m:s a',  '12-02-1999 2:45:10 am'],
                ['DD-MM-YYYY h:m:s a',  '12-02-1999 2:45:10 pm'],
                ['h:mm a',              '12:00 pm'],
                ['h:mm a',              '12:30 pm'],
                ['h:mm a',              '12:00 am'],
                ['h:mm a',              '12:30 am'],
                ['HH:mm',               '12:00'],
                ['YYYY-MM-DDTHH:mm:ss', '2011-11-11T11:11:11'],
                ['MM-DD-YYYY [M]',      '12-02-1999 M'],
                ['ddd MMM DD HH:mm:ss YYYY', 'Tue Apr 07 22:52:51 2009'],
                ['HH:mm:ss',            '12:00:00'],
                ['HH:mm:ss',            '12:30:00'],
                ['HH:mm:ss',            '00:00:00'],
                ['HH:mm:ss S',          '00:30:00 1'],
                ['HH:mm:ss SS',         '00:30:00 12'],
                ['HH:mm:ss SSS',        '00:30:00 123'],
                ['HH:mm:ss S',          '00:30:00 7'],
                ['HH:mm:ss SS',         '00:30:00 78'],
                ['HH:mm:ss SSS',        '00:30:00 789'],
                ['X.SSS',               '1234567890.123']
            ],
            i;

        test.expect(a.length);
        for (i = 0; i < a.length; i++) {
            test.equal(moment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "unix timestamp format" : function(test) {
        var formats = ['X', 'X.S', 'X.SS', 'X.SSS'];

        test.expect(formats.length * 4);
        for (var i = 0; i < formats.length; i++) {
            var format = formats[i];
            test.equal(moment('1234567890',     format).valueOf(), 1234567890 * 1000,       format + " matches timestamp without milliseconds");
            test.equal(moment('1234567890.1',   format).valueOf(), 1234567890 * 1000 + 100, format + " matches timestamp with deciseconds");
            test.equal(moment('1234567890.12',  format).valueOf(), 1234567890 * 1000 + 120, format + " matches timestamp with centiseconds");
            test.equal(moment('1234567890.123', format).valueOf(), 1234567890 * 1000 + 123, format + " matches timestamp with milliseconds");
        }

        test.done();
    },

    "string with format no separators" : function(test) {
        moment.lang('en');
        var a = [
                ['MMDDYYYY',          '12021999'],
                ['DDMMYYYY',          '12021999'],
                ['YYYYMMDD',          '19991202'],
                ['DDMMMYYYY',         '10Sep2001']
            ],i;

        test.expect(a.length);

        for (i = 0; i < a.length; i++) {
            test.equal(moment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "string with format (timezone)" : function(test) {
        test.expect(8);
        test.equal(moment('5 -0700', 'H ZZ').toDate().getUTCHours(), 12, 'parse hours "5 -0700" ---> "H ZZ"');
        test.equal(moment('5 -07:00', 'H Z').toDate().getUTCHours(), 12, 'parse hours "5 -07:00" ---> "H Z"');
        test.equal(moment('5 -0730', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours "5 -0730" ---> "H ZZ"');
        test.equal(moment('5 -07:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours "5 -07:30" ---> "H Z"');
        test.equal(moment('5 +0100', 'H ZZ').toDate().getUTCHours(), 4, 'parse hours "5 +0100" ---> "H ZZ"');
        test.equal(moment('5 +01:00', 'H Z').toDate().getUTCHours(), 4, 'parse hours "5 +01:00" ---> "H Z"');
        test.equal(moment('5 +0130', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours "5 +0130" ---> "H ZZ"');
        test.equal(moment('5 +01:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours "5 +01:30" ---> "H Z"');
        test.done();
    },

    "string with format (timezone offset)" : function(test) {
        test.expect(4);
        var a = new Date(Date.UTC(2011, 0, 1, 1));
        var b = moment('2011 1 1 0 -01:00', 'YYYY MM DD HH Z');
        test.equal(a.getHours(), b.hours(), 'date created with utc == parsed string with timezone offset');
        test.equal(+a, +b, 'date created with utc == parsed string with timezone offset');
        var c = moment('2011 2 1 10 -05:00', 'YYYY MM DD HH Z');
        var d = moment('2011 2 1 8 -07:00', 'YYYY MM DD HH Z');
        test.equal(c.hours(), d.hours(), '10 am central time == 8 am pacific time');
        var e = moment.utc('Fri, 20 Jul 2012 17:15:00', 'ddd, DD MMM YYYY HH:mm:ss');
        var f = moment.utc('Fri, 20 Jul 2012 10:15:00 -0700', 'ddd, DD MMM YYYY HH:mm:ss ZZ');
        test.equal(e.hours(), f.hours(), 'parse timezone offset in utc');
        test.done();
    },

    "string with array of formats" : function(test) {
        test.expect(14);

        test.equal(moment('11-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format('MM DD YYYY'), '11 02 1999', 'switching month and day');
        test.equal(moment('02-11-1999', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(moment('1999-02-11', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

        test.equal(moment('02-11-1999', ['MM/DD/YYYY', 'YYYY-MM-DD']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(moment('1999-02-11', ['MM/DD/YYYY', 'YYYY-MM-DD']).format('MM DD YYYY'), '02 11 1999', 'year first');
        test.equal(moment('02-11-1999', ['YYYY-MM-DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
        test.equal(moment('1999-02-11', ['YYYY-MM-DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

        test.equal(moment('13-11-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'second must be month');
        test.equal(moment('11-13-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'first must be month');
        test.equal(moment('13-14-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '01 14 2000', 'either can be a month, month first format');
        test.equal(moment('13-14-1999', ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 13 2000', 'either can be a month, day first format');

        test.equal(moment('13-14-98', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YY', 'use two digit year');
        test.equal(moment('13-14-1998', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YYYY', 'use four digit year');

        test.equal(moment('01', ["MM", "DD"])._f, "MM", "Should use first valid format");

        test.done();
    },

    "string with format - years" : function(test) {
        test.expect(4);
        test.equal(moment('67', 'YY').format('YYYY'), '2067', '67 > 2067');
        test.equal(moment('68', 'YY').format('YYYY'), '2068', '68 > 2068');
        test.equal(moment('69', 'YY').format('YYYY'), '1969', '69 > 1969');
        test.equal(moment('70', 'YY').format('YYYY'), '1970', '70 > 1970');
        test.done();
    },

    "implicit cloning" : function(test) {
        test.expect(2);
        var momentA = moment([2011, 10, 10]);
        var momentB = moment(momentA);
        momentA.month(5);
        test.equal(momentB.month(), 10, "Calling moment() on a moment will create a clone");
        test.equal(momentA.month(), 5, "Calling moment() on a moment will create a clone");
        test.done();
    },

    "explicit cloning" : function(test) {
        test.expect(2);
        var momentA = moment([2011, 10, 10]);
        var momentB = momentA.clone();
        momentA.month(5);
        test.equal(momentB.month(), 10, "Calling moment() on a moment will create a clone");
        test.equal(momentA.month(), 5, "Calling moment() on a moment will create a clone");
        test.done();
    },

    "cloning carrying over utc mode" : function(test) {
        test.expect(8);

        test.equal(moment().local().clone()._isUTC, false, "An explicit cloned local moment should have _isUTC == false");
        test.equal(moment().utc().clone()._isUTC, true, "An cloned utc moment should have _isUTC == true");
        test.equal(moment().clone()._isUTC, false, "An explicit cloned local moment should have _isUTC == false");
        test.equal(moment.utc().clone()._isUTC, true, "An explicit cloned utc moment should have _isUTC == true");
        test.equal(moment(moment().local())._isUTC, false, "An implicit cloned local moment should have _isUTC == false");
        test.equal(moment(moment().utc())._isUTC, true, "An implicit cloned utc moment should have _isUTC == true");
        test.equal(moment(moment())._isUTC, false, "An implicit cloned local moment should have _isUTC == false");
        test.equal(moment(moment.utc())._isUTC, true, "An implicit cloned utc moment should have _isUTC == true");

        test.done();
    },

    "parsing iso" : function(test) {
        var offset = moment([2011, 9, 08]).zone();
        var pad = function(input) {
            if (input < 10) {
                return '0' + input;
            }
            return '' + input;
        }
        var hourOffset = (offset > 0) ? Math.floor(offset / 60) : Math.ceil(offset / 60);
        var minOffset = offset - (hourOffset * 60);
        var tz = (offset > 0) ? '-' + pad(hourOffset) + ':' + pad(minOffset) : '+' + pad(-hourOffset) + ':' + pad(-minOffset);
        var tz2 = tz.replace(':', '');
        var formats = [
            ['2011-10-08',                    '2011-10-08T00:00:00.000' + tz],
            ['2011-10-08T18',                 '2011-10-08T18:00:00.000' + tz],
            ['2011-10-08T18:04',              '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08T18:04:20',           '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08T18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08T18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08T18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08T18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08T18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
            ['2011-10-08T18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
            ['2011-10-08T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
            ['2011-10-08 18',                 '2011-10-08T18:00:00.000' + tz],
            ['2011-10-08 18:04',              '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08 18:04:20',           '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08 18:04' + tz,         '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08 18:04:20' + tz,      '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08 18:04' + tz2,        '2011-10-08T18:04:00.000' + tz],
            ['2011-10-08 18:04:20' + tz2,     '2011-10-08T18:04:20.000' + tz],
            ['2011-10-08 18:04:20.1' + tz2,   '2011-10-08T18:04:20.100' + tz],
            ['2011-10-08 18:04:20.11' + tz2,  '2011-10-08T18:04:20.110' + tz],
            ['2011-10-08 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz]
        ];
        test.expect(formats.length);
        for (var i = 0; i < formats.length; i++) {
            test.equal(formats[i][1], moment(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), "moment should be able to parse ISO " + formats[i][0]);
        }
        test.done();
    },

    "parsing iso with T" : function(test) {
        test.expect(9);

        test.equal(moment('2011-10-08T18')._f, "YYYY-MM-DDTHH", "should include 'T' in the format");
        test.equal(moment('2011-10-08T18:20')._f, "YYYY-MM-DDTHH:mm", "should include 'T' in the format");
        test.equal(moment('2011-10-08T18:20:13')._f, "YYYY-MM-DDTHH:mm:ss", "should include 'T' in the format");
        test.equal(moment('2011-10-08T18:20:13.321')._f, "YYYY-MM-DDTHH:mm:ss.S", "should include 'T' in the format");

        test.equal(moment('2011-10-08 18')._f, "YYYY-MM-DD HH", "should not include 'T' in the format");
        test.equal(moment('2011-10-08 18:20')._f, "YYYY-MM-DD HH:mm", "should not include 'T' in the format");
        test.equal(moment('2011-10-08 18:20:13')._f, "YYYY-MM-DD HH:mm:ss", "should not include 'T' in the format");
        test.equal(moment('2011-10-08 18:20:13.321')._f, "YYYY-MM-DD HH:mm:ss.S", "should not include 'T' in the format");

        test.ok(moment("2013-04-23 15:23:47 UTC").isValid(), "including a trailing UTC in the input should work");

        test.done();
    },

    "parsing iso Z timezone" : function(test) {
        var i,
            formats = [
            ['2011-10-08T18:04Z',             '2011-10-08T18:04:00.000+00:00'],
            ['2011-10-08T18:04:20Z',          '2011-10-08T18:04:20.000+00:00'],
            ['2011-10-08T18:04:20.111Z',      '2011-10-08T18:04:20.111+00:00']
        ];
        test.expect(formats.length);
        for (i = 0; i < formats.length; i++) {
            test.equal(moment.utc(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], "moment should be able to parse ISO " + formats[i][0]);
        }
        test.done();
    },

    "parsing iso Z timezone into local" : function(test) {
        test.expect(1);

        var m = moment('2011-10-08T18:04:20.111Z');

        test.equal(m.utc().format('YYYY-MM-DDTHH:mm:ss.SSS'), '2011-10-08T18:04:20.111', "moment should be able to parse ISO 2011-10-08T18:04:20.111Z");

        test.done();
    },

    "null" : function(test) {
        test.expect(3);
        test.equal(moment(''), null, "Calling moment('')");
        test.equal(moment(null), null, "Calling moment(null)");
        test.equal(moment('', 'YYYY-MM-DD'), null, "Calling moment('', 'YYYY-MM-DD')");
        test.done();
    },

    "first century" : function(test) {
        test.expect(9);
        test.equal(moment([0, 0, 1]).format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        test.equal(moment([99, 0, 1]).format("YYYY-MM-DD"), "0099-01-01", "Year AD 99");
        test.equal(moment([999, 0, 1]).format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        test.equal(moment('0 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        test.equal(moment('99 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0099-01-01", "Year AD 99");
        test.equal(moment('999 1 1', 'YYYY MM DD').format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        test.equal(moment('0 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00000-01-01", "Year AD 0");
        test.equal(moment('99 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00099-01-01", "Year AD 99");
        test.equal(moment('999 1 1', 'YYYYY MM DD').format("YYYYY-MM-DD"), "00999-01-01", "Year AD 999");
        test.done();
    },

    "six digit years" : function(test) {
        test.expect(8);
        test.equal(moment([-270000, 0, 1]).format("YYYYY-MM-DD"), "-270000-01-01", "format BC 270,001");
        test.equal(moment([ 270000, 0, 1]).format("YYYYY-MM-DD"), "270000-01-01", "format AD 270,000");
        test.equal(moment("-270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -270000, "parse BC 270,001");
        test.equal(moment("270000-01-01",  "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD 270,000");
        test.equal(moment("+270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD +270,000");
        test.equal(moment.utc("-270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -270000, "parse utc BC 270,001");
        test.equal(moment.utc("270000-01-01",  "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD 270,000");
        test.equal(moment.utc("+270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD +270,000");
        test.done();
    },

    "negative four digit years" : function(test) {
        test.expect(2);
        test.equal(moment("-1000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -1000, "parse BC 1,001");
        test.equal(moment.utc("-1000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -1000, "parse utc BC 1,001");
        test.done();
    },

    "parsing into a language" : function (test) {
        test.expect(2);

        moment.lang('parselang', {
            months : "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShort : "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_")
        });

        moment.lang('en');

        test.equal(moment('2012 seven', 'YYYY MMM', 'parselang').month(), 6, "should be able to parse in a specific language");

        moment.lang('parselang');

        test.equal(moment('2012 july', 'YYYY MMM', 'en').month(), 6, "should be able to parse in a specific language");

        test.done();
    }
};
