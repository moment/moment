$(function() {

    _ = _date;
    
    module("Date");
    
    test("_.date()", 6, function() {
        ok(_.date([2010, 1, 12]).date instanceof Date, "[2010, 1, 12]");
        ok(_.date([2010, 1, 12, 1]).date instanceof Date, "[2010, 1, 12, 1]");
        ok(_.date().date instanceof Date, "undefined");
        ok(_.date("Aug 9, 1995").date instanceof Date, "Aug 9, 1995");
        ok(_.date("Mon, 25 Dec 1995 13:30:00 GMT").date instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
        deepEqual(_.date(new Date(2010, 1, 14, 15, 25, 50, 125)), _.date([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
    });
    
    test("_.now()", 1, function() {
        deepEqual(_.date(), _.now(), "_.now returns wrapped date");
    });

    test("_.date().format()", 15, function() {
        var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
        var _date = _.date(dateTest);
        
        equal(_.date([2010, 1, 14, 15, 25, 50, 125]).format("dddd, MMMM Do YYYY, h:mm:ss a"), "Sunday, February 14th 2010, 3:25:50 pm");
        equal(_date.format("ddd, hA"), "Sun, 3PM");
        equal(_date.format("M Mo MM MMMM MMM"), "2 2nd 02 February Feb");
        equal(_date.format("YYYY YY"), "2010 10");
        equal(_date.format("D Do DD"), "14 14th 14");
        equal(_date.format("d do dddd ddd"), "0 0th Sunday Sun");
        equal(_date.format("DDD DDDo DDDD"), "45 45th 045");
        equal(_date.format("w wo ww"), "8 8th 08");
        equal(_date.format("h hh"), "3 03");
        equal(_date.format("H HH"), "15 15");
        equal(_date.format("m mm"), "25 25");
        equal(_date.format("s ss"), "50 50");
        equal(_date.format("a A"), "pm PM");
        equal(_date.format("z zz"), "PST Pacific Standard Time");
        equal(_date.format("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45th day of the year");
    });

    test("_.date().add() + _.date().subtract()", 5, function() {
        equal(_.date([2010, 1, 14, 15, 25, 50, 125]).add({ms:200,s:10,m:10,h:2,d:3,M:2,y:3}).format("MMMM Do YYYY, h:mm:ss a"), "April 17th 2013, 5:36:00 pm");
        equal(_.date([2010, 0, 31]).format("MMMM Do YYYY"), "January 31st 2010");
        equal(_.date([2010, 0, 31]).add({M:1}).format("MMMM Do YYYY"), "February 28th 2010");
        equal(_.date([2007, 1, 28]).format("MMMM Do YYYY"), "February 28th 2007");
        equal(_.date([2007, 1, 28]).subtract({M:1}).format("MMMM Do YYYY"), "January 28th 2007");
    });


    test("_.date().from() -- suffixless", 11, function() {
        var start = _.date([2007, 1, 28]);
        equal(start.from(_.date([2007, 1, 28]).add({s:30}), true), "seconds");
        equal(start.from(_.date([2007, 1, 28]).add({s:60}), true), "a minute");
        equal(start.from(_.date([2007, 1, 28]).add({m:5}), true), "5 minutes");
        equal(start.from(_.date([2007, 1, 28]).add({h:1}), true), "an hour");
        equal(start.from(_.date([2007, 1, 28]).add({h:5}), true), "5 hours");
        equal(start.from(_.date([2007, 1, 28]).add({d:1}), true), "a day");
        equal(start.from(_.date([2007, 1, 28]).add({d:5}), true), "5 days");
        equal(start.from(_.date([2007, 1, 28]).add({M:1}), true), "a month");
        equal(start.from(_.date([2007, 1, 28]).add({M:5}), true), "5 months");
        equal(start.from(_.date([2007, 1, 28]).add({y:1}), true), "a year");
        equal(start.from(_.date([2007, 1, 28]).add({y:5}), true), "5 years");
    });

    test("_.date().from() -- asMilliseconds", 5, function() {
        equal(_.date(1000).from(0, true, true), 1000, "1 second (ms) - 0 = 1000");
        equal(_.date(1000).from(500, false, true), 500, "1 second (ms) - .5 second (ms) = -500");
        equal(_.date(0).from(1000, false, true), -1000, "0 - 1 second (ms) = -1000");
        equal(_.date(new Date(1000)).from(1000, false, true), 0, "1 second (date) - 1 second (ms) = 0");
        var oneHourDate = new Date(),
        nowDate = new Date();
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        equal(_.date(oneHourDate).from(nowDate, false, true), 60 * 60 * 1000, "1 hour from now = 360000");
    });

    test("_.date().from() -- with suffix", 2, function() {
        equal(_.date(30000).from(0), "in seconds");
        equal(_.date(0).from(30000), "seconds ago");
    });
    
    test("_.date().fromNow()", 2, function() {
        equal(_.now().add({s:30}).fromNow(), "in seconds");
        equal(_.now().add({d:5}).fromNow(), "in 5 days");
    });

    test("_.isLeapYear()", function() {
        expect(7);
        equal(_.isLeapYear(2010), false);
        equal(_.isLeapYear(2100), false);
        equal(_.isLeapYear(2008), true);
        equal(_.isLeapYear(2000), true);
        equal(_.date([2100, 0, 1]).isLeapYear(), false);
        equal(_.date(new Date(2008, 0, 1)).isLeapYear(), true);
        equal(_.date(new Date(2000, 0, 1)).isLeapYear(), true);
    });
});