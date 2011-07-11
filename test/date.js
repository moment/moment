$(function() {

    module("Date");
    
    test("_date()", 6, function() {
        ok(_date([2010, 1, 12]).date instanceof Date, "[2010, 1, 12]");
        ok(_date([2010, 1, 12, 1]).date instanceof Date, "[2010, 1, 12, 1]");
        ok(_date().date instanceof Date, "undefined");
        ok(_date("Aug 9, 1995").date instanceof Date, "Aug 9, 1995");
        ok(_date("Mon, 25 Dec 1995 13:30:00 GMT").date instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
        deepEqual(_date(new Date(2010, 1, 14, 15, 25, 50, 125)), _date([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
    });
    
    var stringTests = [
        ['MM-DD-YYYY', '12-02-1999'],
        ['DD-MM-YYYY', '12-02-1999'],
        ['DD/MM/YYYY', '12/02/1999'],
        ['DD_MM_YYYY', '12_02_1999'],
        ['DD:MM:YYYY', '12:02:1999'],
        ['D-M-YY', '2-2-99'],
        ['YY', '99'],
        ['DDD-YYYY', '300-1999'],
        ['DD-MM-YYYY h:m:s', '12-02-1999 2:45:10'],
        ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 am'],
        ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 pm']
    ];
    
    test("_date() with string format", stringTests.length, function() {
        for (var i = 0; i < stringTests.length; i++) {
            equal(_date(stringTests[i][1], stringTests[i][0]).format(stringTests[i][0]), stringTests[i][1]);
        }
    });
    
    test("_date() with string format", 2, function() {
        equal(_date('71', 'YY').format('YYYY'), '1971');
        equal(_date('69', 'YY').format('YYYY'), '2069');
    });
    

    test("_date().format()", 15, function() {
        var dateCache = _date(new Date(2010, 1, 14, 15, 25, 50, 125));
        
        equal(dateCache.format("dddd, MMMM Do YYYY, h:mm:ss a"), "Sunday, February 14th 2010, 3:25:50 pm");
        equal(dateCache.format("ddd, hA"), "Sun, 3PM");
        equal(dateCache.format("M Mo MM MMMM MMM"), "2 2nd 02 February Feb");
        equal(dateCache.format("YYYY YY"), "2010 10");
        equal(dateCache.format("D Do DD"), "14 14th 14");
        equal(dateCache.format("d do dddd ddd"), "0 0th Sunday Sun");
        equal(dateCache.format("DDD DDDo DDDD"), "45 45th 045");
        equal(dateCache.format("w wo ww"), "8 8th 08");
        equal(dateCache.format("h hh"), "3 03");
        equal(dateCache.format("H HH"), "15 15");
        equal(dateCache.format("m mm"), "25 25");
        equal(dateCache.format("s ss"), "50 50");
        equal(dateCache.format("a A"), "pm PM");
        equal(dateCache.format("z zz"), "PST Pacific Standard Time");
        equal(dateCache.format("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45th day of the year");
    });

    test("_date().add() + _date().subtract()", 5, function() {
        equal(_date([2010, 1, 14, 15, 25, 50, 125]).add({ms:200,s:10,m:10,h:2,d:3,M:2,y:3}).format("MMMM Do YYYY, h:mm:ss a"), "April 17th 2013, 5:36:00 pm");
        equal(_date([2010, 0, 31]).format("MMMM Do YYYY"), "January 31st 2010");
        equal(_date([2010, 0, 31]).add({M:1}).format("MMMM Do YYYY"), "February 28th 2010");
        equal(_date([2007, 1, 28]).format("MMMM Do YYYY"), "February 28th 2007");
        equal(_date([2007, 1, 28]).subtract({M:1}).format("MMMM Do YYYY"), "January 28th 2007");
    });


    test("_date().from() -- suffixless", 30, function() {
        var start = _date([2007, 1, 28]);
        equal(start.from(_date([2007, 1, 28]).add({s:44}), true), "seconds");
        equal(start.from(_date([2007, 1, 28]).add({s:45}), true), "a minute");
        equal(start.from(_date([2007, 1, 28]).add({s:89}), true), "a minute");
        equal(start.from(_date([2007, 1, 28]).add({s:90}), true), "2 minutes");
        equal(start.from(_date([2007, 1, 28]).add({m:44}), true), "44 minutes");
        equal(start.from(_date([2007, 1, 28]).add({m:45}), true), "an hour");
        equal(start.from(_date([2007, 1, 28]).add({m:89}), true), "an hour");
        equal(start.from(_date([2007, 1, 28]).add({m:90}), true), "2 hours");
        equal(start.from(_date([2007, 1, 28]).add({h:5}), true), "5 hours");
        equal(start.from(_date([2007, 1, 28]).add({h:21}), true), "21 hours");
        equal(start.from(_date([2007, 1, 28]).add({h:22}), true), "a day");
        equal(start.from(_date([2007, 1, 28]).add({h:35}), true), "a day");
        equal(start.from(_date([2007, 1, 28]).add({h:36}), true), "2 days");
        equal(start.from(_date([2007, 1, 28]).add({d:1}), true), "a day");
        equal(start.from(_date([2007, 1, 28]).add({d:5}), true), "5 days");
        equal(start.from(_date([2007, 1, 28]).add({d:25}), true), "25 days");
        equal(start.from(_date([2007, 1, 28]).add({d:26}), true), "a month");
        equal(start.from(_date([2007, 1, 28]).add({d:30}), true), "a month");
        equal(start.from(_date([2007, 1, 28]).add({d:45}), true), "a month");
        equal(start.from(_date([2007, 1, 28]).add({d:46}), true), "2 months");
        equal(start.from(_date([2007, 1, 28]).add({d:75}), true), "2 months");
        equal(start.from(_date([2007, 1, 28]).add({d:76}), true), "3 months");
        equal(start.from(_date([2007, 1, 28]).add({M:1}), true), "a month");
        equal(start.from(_date([2007, 1, 28]).add({M:5}), true), "5 months");
        equal(start.from(_date([2007, 1, 28]).add({d:344}), true), "11 months");
        equal(start.from(_date([2007, 1, 28]).add({d:345}), true), "a year");
        equal(start.from(_date([2007, 1, 28]).add({d:547}), true), "a year");
        equal(start.from(_date([2007, 1, 28]).add({d:548}), true), "2 years");
        equal(start.from(_date([2007, 1, 28]).add({y:1}), true), "a year");
        equal(start.from(_date([2007, 1, 28]).add({y:5}), true), "5 years");
    });

    test("_date().from() -- asMilliseconds", 5, function() {
        equal(_date(1000).from(0, true, true), 1000, "1 second (ms) - 0 = 1000");
        equal(_date(1000).from(500, false, true), 500, "1 second (ms) - .5 second (ms) = -500");
        equal(_date(0).from(1000, false, true), -1000, "0 - 1 second (ms) = -1000");
        equal(_date(new Date(1000)).from(1000, false, true), 0, "1 second (date) - 1 second (ms) = 0");
        var oneHourDate = new Date(),
        nowDate = new Date();
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        equal(_date(oneHourDate).from(nowDate, false, true), 60 * 60 * 1000, "1 hour from now = 360000");
    });

    test("_date().from() -- with suffix", 2, function() {
        equal(_date(30000).from(0), "in seconds");
        equal(_date(0).from(30000), "seconds ago");
    });
    
    test("_date().fromNow()", 2, function() {
        equal(_date().add({s:30}).fromNow(), "in seconds");
        equal(_date().add({d:5}).fromNow(), "in 5 days");
    });

    test("_date().isLeapYear()", function() {
        expect(4);
        equal(_date([2010, 0, 1]).isLeapYear(), false);
        equal(_date([2100, 0, 1]).isLeapYear(), false);
        equal(_date([2008, 0, 1]).isLeapYear(), true);
        equal(_date([2000, 0, 1]).isLeapYear(), true);
    });
    
    test("underscore mixin", 6, function() {
        ok(_.date([2010, 1, 12]).date instanceof Date, "[2010, 1, 12]");
        ok(_.date([2010, 1, 12, 1]).date instanceof Date, "[2010, 1, 12, 1]");
        ok(_.date().date instanceof Date, "undefined");
        ok(_.date("Aug 9, 1995").date instanceof Date, "Aug 9, 1995");
        ok(_.date("Mon, 25 Dec 1995 13:30:00 GMT").date instanceof Date, "Mon, 25 Dec 1995 13:30:00 GMT");
        deepEqual(_.date(new Date(2010, 1, 14, 15, 25, 50, 125)), _.date([2010, 1, 14, 15, 25, 50, 125]), "constructing with array === constructing with new Date()");
    });
});