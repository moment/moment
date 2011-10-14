/**************************************************
  Node
 *************************************************/

var _date, _;
if (typeof window === 'undefined') {
    _date = require('../underscore.date.js');
    module = QUnit.module;
    _ = { date : _date };
}


/**************************************************
  Tests
 *************************************************/
 

module("create");


test("array", 8, function() {
    ok(_date([2010])._d instanceof Date, "[2010]");
    ok(_date([2010, 1])._d instanceof Date, "[2010, 1]");
    ok(_date([2010, 1, 12])._d instanceof Date, "[2010, 1, 12]");
    ok(_date([2010, 1, 12, 1])._d instanceof Date, "[2010, 1, 12, 1]");
    ok(_date([2010, 1, 12, 1, 1])._d instanceof Date, "[2010, 1, 12, 1, 1]");
    ok(_date([2010, 1, 12, 1, 1, 1])._d instanceof Date, "[2010, 1, 12, 1, 1, 1]");
    ok(_date([2010, 1, 12, 1, 1, 1, 1])._d instanceof Date, "[2010, 1, 12, 1, 1, 1, 1]");
    deepEqual(_date(new Date(2010, 1, 14, 15, 25, 50, 125)), _date([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
});


test("number", 2, function() {
    ok(_date(1000)._d instanceof Date, "1000");
    ok((_date(1000).valueOf() === 1000), "testing valueOf");
});


test("date", 1, function() {
    ok(_date(new Date())._d instanceof Date, "new Date()");
});

test("_date", 2, function() {
    ok(_date(_date())._d instanceof Date, "_date(_date())");
    ok(_date(_date(_date()))._d instanceof Date, "_date(_date(_date()))");
});

test("undefined", 1, function() {
    ok(_date()._d instanceof Date, "undefined");
});


test("string without format", 2, function() {
    ok(_date("Aug 9, 1995")._d instanceof Date, "Aug 9, 1995");
    ok(_date("Mon, 25 Dec 1995 13:30:00 GMT")._d instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
});


test("string with format", 11, function() {
    var a = [
            ['MM-DD-YYYY',         '12-02-1999'],
            ['DD-MM-YYYY',         '12-02-1999'],
            ['DD/MM/YYYY',         '12/02/1999'],
            ['DD_MM_YYYY',         '12_02_1999'],
            ['DD:MM:YYYY',         '12:02:1999'],
            ['D-M-YY',             '2-2-99'],
            ['YY',                 '99'],
            ['DDD-YYYY',           '300-1999'],
            ['DD-MM-YYYY h:m:s',   '12-02-1999 2:45:10'],
            ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 am'],
            ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 pm']
        ],
        i;
    for (i = 0; i < a.length; i++) {
        equal(_date(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("string with array of formats", 3, function() {
    equal(_date('13-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format('MM DD YYYY'), '02 13 1999', 'switching month and day');
    equal(_date('02-13-1999', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 13 1999', 'year last');
    equal(_date('1999-02-13', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 13 1999', 'year first');
});

test("string with format - years", 2, function() {
    equal(_date('71', 'YY').format('YYYY'), '1971', '71 > 1971');
    equal(_date('69', 'YY').format('YYYY'), '2069', '69 > 2069');
});


module("add and subtract");


test("add and subtract short", 11, function() {
    var a = _date();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);

    equal(a.add({ms:1000}).seconds(), 9, 'Add milliseconds');
    equal(a.add({s:1}).seconds(), 10, 'Add seconds');
    equal(a.add({m:1}).minutes(), 8, 'Add minutes');
    equal(a.add({h:1}).hours(), 7, 'Add hours');
    equal(a.add({d:1}).date(), 13, 'Add date');
    equal(a.add({M:1}).month(), 10, 'Add month');
    equal(a.add({y:1}).year(), 2012, 'Add year');

    var b = _date([2010, 0, 31]).add({M:1});
    var c = _date([2010, 1, 28]).subtract({M:1});

    equal(b.month(), 1, 'add month, jan 31st to feb 28th');
    equal(b.date(), 28, 'add month, jan 31st to feb 28th');
    equal(c.month(), 0, 'subtract month, feb 28th to jan 28th');
    equal(c.date(), 28, 'subtract month, feb 28th to jan 28th');
});

test("add and subtract long", 7, function() {
    var a = _date();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);

    equal(a.add({milliseconds:1000}).seconds(), 9, 'Add milliseconds');
    equal(a.add({seconds:1}).seconds(), 10, 'Add seconds');
    equal(a.add({minutes:1}).minutes(), 8, 'Add minutes');
    equal(a.add({hours:1}).hours(), 7, 'Add hours');
    equal(a.add({days:1}).date(), 13, 'Add date');
    equal(a.add({months:1}).month(), 10, 'Add month');
    equal(a.add({years:1}).year(), 2012, 'Add year');
});

test("add and subtract string short", 7, function() {
    var a = _date();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);

    equal(a.add('milliseconds', 1000).seconds(), 9, 'Add milliseconds');
    equal(a.add('seconds', 1).seconds(), 10, 'Add seconds');
    equal(a.add('minutes', 1).minutes(), 8, 'Add minutes');
    equal(a.add('hours', 1).hours(), 7, 'Add hours');
    equal(a.add('days', 1).date(), 13, 'Add date');
    equal(a.add('months', 1).month(), 10, 'Add month');
    equal(a.add('years', 1).year(), 2012, 'Add year');
});

test("add and subtract string short", 7, function() {
    var a = _date();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);

    equal(a.add('ms', 1000).seconds(), 9, 'Add milliseconds');
    equal(a.add('s', 1).seconds(), 10, 'Add seconds');
    equal(a.add('m', 1).minutes(), 8, 'Add minutes');
    equal(a.add('h', 1).hours(), 7, 'Add hours');
    equal(a.add('d', 1).date(), 13, 'Add date');
    equal(a.add('M', 1).month(), 10, 'Add month');
    equal(a.add('y', 1).year(), 2012, 'Add year');
});

module("diff");


test("diff", 5, function() {
    equal(_date(1000).diff(0), 1000, "1 second - 0 = 1000");
    equal(_date(1000).diff(500), 500, "1 second - .5 second = -500");
    equal(_date(0).diff(1000), -1000, "0 - 1 second = -1000");
    equal(_date(new Date(1000)).diff(1000), 0, "1 second - 1 second = 0");
    var oneHourDate = new Date(),
    nowDate = new Date();
    oneHourDate.setHours(oneHourDate.getHours() + 1);
    equal(_date(oneHourDate).diff(nowDate), 60 * 60 * 1000, "1 hour from now = 360000");
});


module("leap year");


test("leap year", 4, function() {
    equal(_date([2010, 0, 1]).isLeapYear(), false, '2010');
    equal(_date([2100, 0, 1]).isLeapYear(), false, '2100');
    equal(_date([2008, 0, 1]).isLeapYear(), true, '2008');
    equal(_date([2000, 0, 1]).isLeapYear(), true, '2000');
});


module("getters and setters");


test("getters", 7, function() {
    var a = _date([2011, 9, 12, 6, 7, 8]);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
});

test("setters", 7, function() {
    var a = _date();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
});

test("chaining setters", 7, function() {
    var a = _date();
    a.year(2011)
     .month(9)
     .date(12)
     .hours(6)
     .minutes(7)
     .seconds(8);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
});


module("underscore mixin");


test("underscore mixin", 6, function() {
    ok(_.date([2010, 1, 12])._d instanceof Date, "[2010, 1, 12]");
    ok(_.date([2010, 1, 12, 1])._d instanceof Date, "[2010, 1, 12, 1]");
    ok(_.date()._d instanceof Date, "undefined");
    ok(_.date("Aug 9, 1995")._d instanceof Date, "Aug 9, 1995");
    ok(_.date("Mon, 25 Dec 1995 13:30:00 GMT")._d instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
    deepEqual(_.date(new Date(2010, 1, 14, 15, 25, 50, 125)), _.date([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
});

