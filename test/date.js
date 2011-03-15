$(document).ready(function() {

  module("Date");
  
  test("formatDate", function() {
	var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
    expect(14);
	equal(_.formatDate([2010, 1, 14, 15, 25, 50, 125], "dddd, MMMM Do YYYY, h:mm:ss a"), "Sunday, February 14th 2010, 3:25:50 pm");
	equal(_.formatDate([2010, 1, 14, 15, 25, 50, 125], "ddd, hA"), "Sun, 3PM");
	equal(_.formatDate(dateTest, "M Mo MM MMMM MMM"), "2 2nd 02 February Feb");
	equal(_.formatDate(dateTest, "YYYY YY"), "2010 10");
	equal(_.formatDate(dateTest, "D Do DD"), "14 14th 14");
	equal(_.formatDate(dateTest, "d do dddd ddd"), "0 0th Sunday Sun");
	equal(_.formatDate(dateTest, "DDD DDDo DDDD"), "45 45th 045");
	equal(_.formatDate(dateTest, "w wo ww"), "8 8th 08");
	equal(_.formatDate(dateTest, "h hh"), "3 03");
	equal(_.formatDate(dateTest, "H HH"), "15 15");
	equal(_.formatDate(dateTest, "m mm"), "25 25");
	equal(_.formatDate(dateTest, "s ss"), "50 50");
	equal(_.formatDate(dateTest, "a A"), "pm PM");
	equal(_.formatDate(dateTest, "t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45th day of the year");
  });
  
  test("date", function() {
    expect(6);
	ok(_.isDate(_.date([2010, 1, 12])), "[2010, 1, 12]");
	ok(_.isDate(_.date([2010, 1, 12, 1])), "[2010, 1, 12, 1]");
	ok(_.isDate(_.date()), "undefined");
	ok(_.isDate(_.date("Aug 9, 1995")), "Aug 9, 1995");
	ok(_.isDate(_.date("Mon, 25 Dec 1995 13:30:00 GMT")), "Mon, 25 Dec 1995 13:30:00 GMT");
	deepEqual(_.date(new Date(2010, 1, 14, 15, 25, 50, 125)), _.date([2010, 1, 14, 15, 25, 50, 125]), "native date constructor === _.date([]);");
  });
  
  
  test("addTime + subtractTime", function() {
    expect(5);
	equal(_([2010, 1, 14, 15, 25, 50, 125]).chain().date().addTime({ms:200,s:10,m:10,h:2,d:3,M:2,y:3}).formatDate("MMMM Do YYYY, h:mm:ss a").value(), "April 17th 2013, 5:36:00 pm");
	equal(_([2010, 0, 31]).chain().date().formatDate("MMMM Do YYYY").value(), "January 31st 2010");
	equal(_([2010, 0, 31]).chain().date().addTime({M:1}).formatDate("MMMM Do YYYY").value(), "February 28th 2010");
	equal(_([2007, 1, 28]).chain().date().formatDate("MMMM Do YYYY").value(), "February 28th 2007");
	equal(_([2007, 1, 28]).chain().date().subtractTime({M:1}).formatDate("MMMM Do YYYY").value(), "January 28th 2007");
  });
  
  
  test("relativeTime", function() {
    expect(11);
	equal(_.relativeTime(1000 * 30), "less than a minute");
	equal(_.relativeTime(1000 * 60), "about a minute");
	equal(_.relativeTime(1000 * 60 * 5), "5 minutes");
	equal(_.relativeTime(1000 * 60 * 60), "about an hour");
	equal(_.relativeTime(1000 * 60 * 60 * 5), "about 5 hours");
	equal(_.relativeTime(1000 * 60 * 60 * 24), "a day");
	equal(_.relativeTime(1000 * 60 * 60 * 24 * 5), "5 days");
	equal(_.relativeTime(1000 * 60 * 60 * 24 * 30), "about a month");
	equal(_.relativeTime(1000 * 60 * 60 * 24 * 30 * 5), "5 months");
	equal(_.relativeTime(1000 * 60 * 60 * 24 * 30 * 12), "about a year");
	equal(_.relativeTime(1000 * 60 * 60 * 24 * 365 * 5), "5 years");
  });
  
  test("msApart", function() {
    expect(5);
	equal(_.msApart(1000, 0), 1000, "1 second (ms) - 0 = 1000");
	equal(_.msApart(1000, 500), 500, "1 second (ms) - .5 second (ms) = -500");
	equal(_.msApart(0, 1000), -1000, "0 - 1 second (ms) = -1000");
	equal(_.msApart(new Date(1000), 1000), 0, "1 second (date) - 1 second (ms) = 0");
	var oneHourDate = new Date(),
		nowDate = new Date();
	oneHourDate.setHours(oneHourDate.getHours() + 1);
	equal(_.msApart(oneHourDate, nowDate), 60 * 60 * 1000, "1 hour from now = 360000");
  });
  
  test("fromNow", function() {
    expect(2);
	equal(_.fromNow(30000, 0), "in less than a minute");
	equal(_.fromNow(0, 30000), "less than a minute ago");
  });
  
  test("isLeapYear", function() {
    expect(7);
	equal(_.isLeapYear(2010), false);
	equal(_.isLeapYear(2100), false);
	equal(_.isLeapYear(2008), true);
	equal(_.isLeapYear(2000), true);
	equal(_.isLeapYear([2100, 0, 1]), false);
	equal(_.isLeapYear(new Date(2008, 0, 1)), true);
	equal(_.isLeapYear(new Date(2000, 0, 1)), true);
  });
  
  /*
  test("isdst", function() {
    expect(2);
	equal(new Date(2010, 0, 1).isdst(), false);
	equal(new Date(2010, 6, 1).isdst(), true);
  });*/
});