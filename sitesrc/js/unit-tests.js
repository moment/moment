(function() {

/**************************************************
  Node
 *************************************************/

var moment;
if (typeof window === 'undefined') {
    moment = require('../../moment');
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

test("string without format - json", 4, function() {
    equal(moment("Date(1325132654000)").valueOf(), 1325132654000, "Date(1325132654000)");
    equal(moment("/Date(1325132654000)/").valueOf(), 1325132654000, "/Date(1325132654000)/");
    equal(moment("/Date(1325132654000+0700)/").valueOf(), 1325132654000, "/Date(1325132654000+0700)/");
    equal(moment("/Date(1325132654000-0700)/").valueOf(), 1325132654000, "/Date(1325132654000-0700)/");
});

test("string with format", 23, function() {
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
            ['MM-DD-YYYY \\M',      '12-02-1999 M'],
            ['ddd MMM DD HH:mm:ss YYYY', 'Tue Apr 07 22:52:51 2009'],
            ['HH:mm:ss',            '12:00:00'],
            ['HH:mm:ss',            '12:30:00'],
            ['HH:mm:ss',            '00:00:00'],
            ['HH:mm:ss',            '00:30:00']
        ],
        i;
    for (i = 0; i < a.length; i++) {
        equal(moment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("string with format (timezone)", 8, function() {
    equal(moment('5 -0700', 'H ZZ').native().getUTCHours(), 12, 'parse hours "5 -0700" ---> "H ZZ"');
    equal(moment('5 -07:00', 'H Z').native().getUTCHours(), 12, 'parse hours "5 -07:00" ---> "H Z"');
    equal(moment('5 -0730', 'H ZZ').native().getUTCMinutes(), 30, 'parse hours "5 -0730" ---> "H ZZ"');
    equal(moment('5 -07:30', 'H Z').native().getUTCMinutes(), 30, 'parse hours "5 -07:30" ---> "H Z"');
    equal(moment('5 +0100', 'H ZZ').native().getUTCHours(), 4, 'parse hours "5 +0100" ---> "H ZZ"');
    equal(moment('5 +01:00', 'H Z').native().getUTCHours(), 4, 'parse hours "5 +01:00" ---> "H Z"');
    equal(moment('5 +0130', 'H ZZ').native().getUTCMinutes(), 30, 'parse hours "5 +0130" ---> "H ZZ"');
    equal(moment('5 +01:30', 'H Z').native().getUTCMinutes(), 30, 'parse hours "5 +01:30" ---> "H Z"');
});

test("string with format (timezone offset)", 3, function() {
    var a = new Date(Date.UTC(2011, 0, 1, 1));
    var b = moment('2011 1 1 0 -01:00', 'YYYY MM DD HH Z');
    equal(a.getHours(), b.hours(), 'date created with utc == parsed string with timezone offset');
    equal(+a, +b, 'date created with utc == parsed string with timezone offset');
    var c = moment('2011 2 1 10 -05:00', 'YYYY MM DD HH Z');
    var d = moment('2011 2 1 8 -07:00', 'YYYY MM DD HH Z');
    equal(c.hours(), d.hours(), '10 am central time == 8 am pacific time');
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

test("implicit cloning", 2, function() {
    var momentA = moment([2011, 10, 10]);
    var momentB = moment(momentA);
    momentA.month(5);
    equal(momentB.month(), 10, "Calling moment() on a moment will create a clone");
    equal(momentA.month(), 5, "Calling moment() on a moment will create a clone");
});

test("explicit cloning", 2, function() {
    var momentA = moment([2011, 10, 10]);
    var momentB = momentA.clone();
    momentA.month(5);
    equal(momentB.month(), 10, "Calling moment() on a moment will create a clone");
    equal(momentA.month(), 5, "Calling moment() on a moment will create a clone");
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
    a.milliseconds(500);

    equal(a.add({ms:50}).milliseconds(), 550, 'Add milliseconds');
    equal(a.add({s:1}).seconds(), 9, 'Add seconds');
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
    a.milliseconds(500);

    equal(a.add({milliseconds:50}).milliseconds(), 550, 'Add milliseconds');
    equal(a.add({seconds:1}).seconds(), 9, 'Add seconds');
    equal(a.add({minutes:1}).minutes(), 8, 'Add minutes');
    equal(a.add({hours:1}).hours(), 7, 'Add hours');
    equal(a.add({days:1}).date(), 13, 'Add date');
    equal(a.add({weeks:1}).date(), 20, 'Add week');
    equal(a.add({months:1}).month(), 10, 'Add month');
    equal(a.add({years:1}).year(), 2012, 'Add year');
});

test("add and subtract string short", 9, function() {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    var b = a.clone();

    equal(a.add('milliseconds', 50).milliseconds(), 550, 'Add milliseconds');
    equal(a.add('seconds', 1).seconds(), 9, 'Add seconds');
    equal(a.add('minutes', 1).minutes(), 8, 'Add minutes');
    equal(a.add('hours', 1).hours(), 7, 'Add hours');
    equal(a.add('days', 1).date(), 13, 'Add date');
    equal(a.add('weeks', 1).date(), 20, 'Add week');
    equal(a.add('months', 1).month(), 10, 'Add month');
    equal(a.add('years', 1).year(), 2012, 'Add year');
    equal(b.add('days', '01').date(), 13, 'Add date');
});

test("add and subtract string short", 8, function() {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    equal(a.add('ms', 50).milliseconds(), 550, 'Add milliseconds');
    equal(a.add('s', 1).seconds(), 9, 'Add seconds');
    equal(a.add('m', 1).minutes(), 8, 'Add minutes');
    equal(a.add('h', 1).hours(), 7, 'Add hours');
    equal(a.add('d', 1).date(), 13, 'Add date');
    equal(a.add('w', 1).date(), 20, 'Add week');
    equal(a.add('M', 1).month(), 10, 'Add month');
    equal(a.add('y', 1).year(), 2012, 'Add year');
});

test("adding across DST", 3, function(){
    var a = moment(new Date(2011, 2, 12, 5, 0, 0));
    var b = moment(new Date(2011, 2, 12, 5, 0, 0));
    var c = moment(new Date(2011, 2, 12, 5, 0, 0));
    var d = moment(new Date(2011, 2, 12, 5, 0, 0));
    a.add('days', 1);
    b.add('hours', 24);
    c.add('months', 1);
    equal(a.hours(), 5, 'adding days over DST difference should result in the same hour');
    if (b.isDST() && !d.isDST()) {
        equal(b.hours(), 6, 'adding hours over DST difference should result in a different hour');
    } else {
        equal(b.hours(), 5, 'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time');
    }
    equal(c.hours(), 5, 'adding months over DST difference should result in the same hour');
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

test("diff month", 1, function() {
    equal(moment([2011, 0, 31]).diff([2011, 2, 1], 'months'), -1, "month diff");
});

test("diff across DST", 2, function() {
    equal(moment([2012, 2, 24]).diff([2012, 2, 10], 'weeks', true), 2, "diff weeks across DST");
    equal(moment([2012, 2, 24]).diff([2012, 2, 10], 'days', true), 14, "diff weeks across DST");
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


test("getters", 8, function() {
    var a = moment([2011, 9, 12, 6, 7, 8, 9]);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
    equal(a.milliseconds(), 9, 'milliseconds');
});

test("setters", 8, function() {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(9);
    equal(a.year(), 2011, 'year');
    equal(a.month(), 9, 'month');
    equal(a.date(), 12, 'date');
    equal(a.day(), 3, 'day');
    equal(a.hours(), 6, 'hour');
    equal(a.minutes(), 7, 'minute');
    equal(a.seconds(), 8, 'second');
    equal(a.milliseconds(), 9, 'milliseconds');
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

test("day setter", 18, function() {
    var a = moment([2011, 0, 15]);
    equal(moment(a).day(0).date(), 9, 'set from saturday to sunday');
    equal(moment(a).day(6).date(), 15, 'set from saturday to saturday');
    equal(moment(a).day(3).date(), 12, 'set from saturday to wednesday');

    a = moment([2011, 0, 9]);
    equal(moment(a).day(0).date(), 9, 'set from sunday to sunday');
    equal(moment(a).day(6).date(), 15, 'set from sunday to saturday');
    equal(moment(a).day(3).date(), 12, 'set from sunday to wednesday');

    a = moment([2011, 0, 12]);
    equal(moment(a).day(0).date(), 9, 'set from wednesday to sunday');
    equal(moment(a).day(6).date(), 15, 'set from wednesday to saturday');
    equal(moment(a).day(3).date(), 12, 'set from wednesday to wednesday');

    equal(moment(a).day(-7).date(), 2, 'set from wednesday to last sunday');
    equal(moment(a).day(-1).date(), 8, 'set from wednesday to last saturday');
    equal(moment(a).day(-4).date(), 5, 'set from wednesday to last wednesday');

    equal(moment(a).day(7).date(), 16, 'set from wednesday to next sunday');
    equal(moment(a).day(13).date(), 22, 'set from wednesday to next saturday');
    equal(moment(a).day(10).date(), 19, 'set from wednesday to next wednesday');

    equal(moment(a).day(14).date(), 23, 'set from wednesday to second next sunday');
    equal(moment(a).day(20).date(), 29, 'set from wednesday to second next saturday');
    equal(moment(a).day(17).date(), 26, 'set from wednesday to second next wednesday');
});


module("format");


test("format YY", 1, function() {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    equal(b.format('YY'), '09', 'YY ---> 09');
});

test("format escape brackets", 5, function() {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    equal(b.format('[day]'), 'day', 'Single bracket');
    equal(b.format('[day] YY [YY]'), 'day 09 YY', 'Double bracket');
    equal(b.format('[YY'), '[09', 'Un-ended bracket');
    equal(b.format('[[YY]]'), '[YY]', 'Double nested brackets');
    equal(b.format('[[]'), '[', 'Escape open bracket');
});

test("format timezone", 4, function() {
    var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    ok(b.format('z').match(/^[A-Z]{3,5}$/), b.format('z') + ' ---> Something like "PST"');
    ok(b.format('zz').match(/^[A-Z]{3,5}$/), b.format('zz') + ' ---> Something like "PST"');
    ok(b.format('Z').match(/^[\+\-]\d\d:\d\d$/), b.format('Z') + ' ---> Something like "+07:30"');
    ok(b.format('ZZ').match(/^[\+\-]\d{4}$/), b.format('ZZ') + ' ---> Something like "+0700"');
});

test("format multiple with zone", 1, function() {
    var b = moment('2012-10-08 -1200', ['YYYY ZZ', 'YYYY-MM-DD ZZ']);
    equals(b.format('YYYY-MM'), '2012-10', 'Parsing multiple formats should not crash with different sized formats');
});

test("isDST", 2, function() {
    var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
        julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
        janIsDst = janOffset < julOffset,
        julIsDst = julOffset < janOffset,
        jan1 = moment([2011]),
        jul1 = moment([2011, 6]);

    if (janIsDst && julIsDst) {
        ok(0, 'January and July cannot both be in DST');
        ok(0, 'January and July cannot both be in DST');
    } else if (janIsDst) {
        ok(jan1.isDST(), 'January 1 is DST');
        ok(!jul1.isDST(), 'July 1 is not DST');
    } else if (julIsDst) {
        ok(!jan1.isDST(), 'January 1 is not DST');
        ok(jul1.isDST(), 'July 1 is DST');
    } else {
        ok(!jan1.isDST(), 'January 1 is not DST');
        ok(!jul1.isDST(), 'July 1 is not DST');
    }
});

test("zone", 3, function() {
    if (moment().zone() > 0) {
        ok(moment().format('ZZ').indexOf('-') > -1, 'When the zone() offset is greater than 0, the ISO offset should be less than zero');
    }
    if (moment().zone() < 0) {
        ok(moment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is less than 0, the ISO offset should be greater than zero');
    }
    if (moment().zone() == 0) {
        ok(moment().format('ZZ').indexOf('+') > -1, 'When the zone() offset is equal to 0, the ISO offset should be positive zero');
    }
    ok(moment().zone() % 30 === 0, 'moment.fn.zone should be a multiple of 30 (was ' + moment().zone() + ')');
    equal(moment().zone(), new Date().getTimezoneOffset(), 'zone should equal getTimezoneOffset');
});

module("sod");

test("sod", 7, function(){
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).sod();
    equal(m.year(), 2011, "keep the year");
    equal(m.month(), 1, "keep the month");
    equal(m.date(), 2, "keep the day");
    equal(m.hours(), 0, "strip out the hours"); 
    equal(m.minutes(), 0, "strip out the minutes"); 
    equal(m.seconds(), 0, "strip out the seconds"); 
    equal(m.milliseconds(), 0, "strip out the milliseconds"); 
});

module("eod");

test("eod", 7, function(){
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).eod();
    equal(m.year(), 2011, "keep the year");
    equal(m.month(), 1, "keep the month");
    equal(m.date(), 2, "keep the day");
    equal(m.hours(), 23, "set the hours"); 
    equal(m.minutes(), 59, "set the minutes"); 
    equal(m.seconds(), 59, "set the seconds"); 
    equal(m.milliseconds(), 999, "set the seconds");
});


})();

