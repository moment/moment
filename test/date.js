$(function() {

    module("Date");

    test("_.formatDate()", 14, function() {
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
        equal(_date.format("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45th day of the year");
    });
    
    test("_.date()", 6, function() {
        ok(_.isDate(_.date([2010, 1, 12])), "[2010, 1, 12]");
        ok(_.isDate(_.date([2010, 1, 12, 1])), "[2010, 1, 12, 1]");
        ok(_.isDate(_.date()), "undefined");
        ok(_.isDate(_.date("Aug 9, 1995")), "Aug 9, 1995");
        ok(_.isDate(_.date("Mon, 25 Dec 1995 13:30:00 GMT")), "Mon, 25 Dec 1995 13:30:00 GMT");
        deepEqual(_.date(new Date(2010, 1, 14, 15, 25, 50, 125)), _.date([2010, 1, 14, 15, 25, 50, 125]), "native date constructor === _.date([]);");
    });

    test("_.addTime() + _.subtractTime()", 5, function() {
        equal(_([2010, 1, 14, 15, 25, 50, 125]).date().add({ms:200,s:10,m:10,h:2,d:3,M:2,y:3}).format("MMMM Do YYYY, h:mm:ss a"), "April 17th 2013, 5:36:00 pm");
        equal(_([2010, 0, 31]).date().format("MMMM Do YYYY"), "January 31st 2010");
        equal(_([2010, 0, 31]).date().add({M:1}).format("MMMM Do YYYY"), "February 28th 2010");
        equal(_([2007, 1, 28]).date().format("MMMM Do YYYY"), "February 28th 2007");
        equal(_([2007, 1, 28]).date().subtract({M:1}).format("MMMM Do YYYY"), "January 28th 2007");
    });


    test("_.relativeTime()", 11, function() {
        equal(_.date().relative(1000 * 30), "less than a minute");
        equal(_.date().relative(1000 * 60), "about a minute");
        equal(_.date().relative(1000 * 60 * 5), "5 minutes");
        equal(_.date().relative(1000 * 60 * 60), "about an hour");
        equal(_.date().relative(1000 * 60 * 60 * 5), "about 5 hours");
        equal(_.date().relative(1000 * 60 * 60 * 24), "a day");
        equal(_.date().relative(1000 * 60 * 60 * 24 * 5), "5 days");
        equal(_.date().relative(1000 * 60 * 60 * 24 * 30), "about a month");
        equal(_.date().relative(1000 * 60 * 60 * 24 * 30 * 5), "5 months");
        equal(_.date().relative(1000 * 60 * 60 * 24 * 30 * 12), "about a year");
        equal(_.date().relative(1000 * 60 * 60 * 24 * 365 * 5), "5 years");
    });

    test("_.msApart()", 5, function() {
        equal(_.date(1000).from(0, true), 1000, "1 second (ms) - 0 = 1000");
        equal(_.date(1000).from(500, true), 500, "1 second (ms) - .5 second (ms) = -500");
        equal(_.date(0).from(1000, true), -1000, "0 - 1 second (ms) = -1000");
        equal(_.date(new Date(1000)).from(1000, true), 0, "1 second (date) - 1 second (ms) = 0");
        var oneHourDate = new Date(),
        nowDate = new Date();
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        equal(_.date(oneHourDate).from(nowDate, true), 60 * 60 * 1000, "1 hour from now = 360000");
    });

    test("_.fromNow()", 2, function() {
        equal(_.date(30000).from(0), "in less than a minute");
        equal(_.date(0).from(30000), "less than a minute ago");
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