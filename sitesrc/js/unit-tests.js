(function() {

/**************************************************
  Node
 *************************************************/

var moment;
if (typeof window === 'undefined') { moment = require('../../moment');
  module = QUnit.module;
} else {
  moment = window.moment;
}

/**************************************************
  Tests
 *************************************************/


module("create");


test("array", 8, function() {
    ok(moment([2010]).native() instanceof Date, "[2010]");
    ok(moment([2010, 1]).native() instanceof Date, "[2010, 1]");
    ok(moment([2010, 1, 12]).native() instanceof Date, "[2010, 1, 12]");
    ok(moment([2010, 1, 12, 1]).native() instanceof Date, "[2010, 1, 12, 1]");
    ok(moment([2010, 1, 12, 1, 1]).native() instanceof Date, "[2010, 1, 12, 1, 1]");
    ok(moment([2010, 1, 12, 1, 1, 1]).native() instanceof Date, "[2010, 1, 12, 1, 1, 1]");
    ok(moment([2010, 1, 12, 1, 1, 1, 1]).native() instanceof Date, "[2010, 1, 12, 1, 1, 1, 1]");
    deepEqual(moment(new Date(2010, 1, 14, 15, 25, 50, 125)), moment([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
});


test("number", 2, function() {
    ok(moment(1000).native() instanceof Date, "1000");
    ok((moment(1000).valueOf() === 1000), "testing valueOf");
});


test("date", 1, function() {
    ok(moment(new Date()).native() instanceof Date, "new Date()");
});

test("moment", 2, function() {
    ok(moment(moment()).native() instanceof Date, "moment(moment())");
    ok(moment(moment(moment())).native() instanceof Date, "moment(moment(moment()))");
});

test("undefined", 1, function() {
    ok(moment().native() instanceof Date, "undefined");
});


test("string without format", 2, function() {
    ok(moment("Aug 9, 1995").native() instanceof Date, "Aug 9, 1995");
    ok(moment("Mon, 25 Dec 1995 13:30:00 GMT").native() instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
});


test("string with format", 13, function() {
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
            ['YYYY-MM-DDTHH:mm:ss', '2011-11-11T11:11:11'],
            ['MM-DD-YYYY \\M',          '12-02-1999 M']
        ],
        i;
    for (i = 0; i < a.length; i++) {
        equal(moment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("string with array of formats", 3, function() {
    equal(moment('13-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format('MM DD YYYY'), '02 13 1999', 'switching month and day');
    equal(moment('02-13-1999', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 13 1999', 'year last');
    equal(moment('1999-02-13', ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 13 1999', 'year first');
});

test("string with format - years", 2, function() {
    equal(moment('71', 'YY').format('YYYY'), '1971', '71 > 1971');
    equal(moment('69', 'YY').format('YYYY'), '2069', '69 > 2069');
});


module("add and subtract");


test("add and subtract short", 12, function() {
    var a = moment();
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
    equal(a.add({w:1}).date(), 20, 'Add week');
    equal(a.add({M:1}).month(), 10, 'Add month');
    equal(a.add({y:1}).year(), 2012, 'Add year');

    var b = moment([2010, 0, 31]).add({M:1});
    var c = moment([2010, 1, 28]).subtract({M:1});

    equal(b.month(), 1, 'add month, jan 31st to feb 28th');
    equal(b.date(), 28, 'add month, jan 31st to feb 28th');
    equal(c.month(), 0, 'subtract month, feb 28th to jan 28th');
    equal(c.date(), 28, 'subtract month, feb 28th to jan 28th');
});

test("add and subtract long", 8, function() {
    var a = moment();
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
    equal(a.add({weeks:1}).date(), 20, 'Add week');
    equal(a.add({months:1}).month(), 10, 'Add month');
    equal(a.add({years:1}).year(), 2012, 'Add year');
});

test("add and subtract string short", 8, function() {
    var a = moment();
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
    equal(a.add('weeks', 1).date(), 20, 'Add week');
    equal(a.add('months', 1).month(), 10, 'Add month');
    equal(a.add('years', 1).year(), 2012, 'Add year');
});

test("add and subtract string short", 8, function() {
    var a = moment();
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
    equal(a.add('w', 1).date(), 20, 'Add week');
    equal(a.add('M', 1).month(), 10, 'Add month');
    equal(a.add('y', 1).year(), 2012, 'Add year');
});

module("diff");


test("diff", 5, function() {
    equal(moment(1000).diff(0), 1000, "1 second - 0 = 1000");
    equal(moment(1000).diff(500), 500, "1 second - .5 second = -500");
    equal(moment(0).diff(1000), -1000, "0 - 1 second = -1000");
    equal(moment(new Date(1000)).diff(1000), 0, "1 second - 1 second = 0");
    var oneHourDate = new Date(),
    nowDate = new Date();
    oneHourDate.setHours(oneHourDate.getHours() + 1);
    equal(moment(oneHourDate).diff(nowDate), 60 * 60 * 1000, "1 hour from now = 360000");
});

test("diff key after", 9, function() {
    equal(moment([2010]).diff([2011], 'years'), -1, "year diff");
    equal(moment([2010]).diff([2011, 6], 'years', true), -1.5, "year diff, float");
    equal(moment([2010]).diff([2010, 2], 'months'), -2, "month diff");
    equal(moment([2010]).diff([2010, 0, 7], 'weeks'), -1, "week diff");
    equal(moment([2010]).diff([2010, 0, 21], 'weeks'), -3, "week diff");
    equal(moment([2010]).diff([2010, 0, 4], 'days'), -3, "day diff");
    equal(moment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, "hour diff");
    equal(moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, "minute diff");
    equal(moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, "second diff");
});

test("diff key before", 9, function() {
    equal(moment([2011]).diff([2010], 'years'), 1, "year diff");
    equal(moment([2011, 6]).diff([2010], 'years', true), 1.5, "year diff, float");
    equal(moment([2010, 2]).diff([2010], 'months'), 2, "month diff");
    equal(moment([2010, 0, 4]).diff([2010], 'days'), 3, "day diff");
    equal(moment([2010, 0, 7]).diff([2010], 'weeks'), 1, "week diff");
    equal(moment([2010, 0, 21]).diff([2010], 'weeks'), 3, "week diff");
    equal(moment([2010, 0, 1, 4]).diff([2010], 'hours'), 4, "hour diff");
    equal(moment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'), 5, "minute diff");
    equal(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'), 6, "second diff");
});

test("diff overflow", 4, function() {
    equal(moment([2011]).diff([2010], 'months'), 12, "month diff");
    equal(moment([2010, 0, 2]).diff([2010], 'hours'), 24, "hour diff");
    equal(moment([2010, 0, 1, 2]).diff([2010], 'minutes'), 120, "minute diff");
    equal(moment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'), 240, "second diff");
});


module("leap year");


test("leap year", 4, function() {
    equal(moment([2010, 0, 1]).isLeapYear(), false, '2010');
    equal(moment([2100, 0, 1]).isLeapYear(), false, '2100');
    equal(moment([2008, 0, 1]).isLeapYear(), true, '2008');
    equal(moment([2000, 0, 1]).isLeapYear(), true, '2000');
});


module("getters and setters");


test("getters", 7, function() {
    var a = moment([2011, 9, 12, 6, 7, 8]);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
});

test("setters", 7, function() {
    var a = moment();
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

test("setters - falsey values", 1, function() {
    var a = moment();
    // ensure minutes wasn't coincidentally 0 already
    a.minutes(1);
    a.minutes(0);
    equal(a.minutes(), 0, 'falsey value');
});

test("chaining setters", 7, function() {
    var a = moment();
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

});

