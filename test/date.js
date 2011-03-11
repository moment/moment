$(document).ready(function() {

  module("Date");
  
  test("dateFormat", function() {
	var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
    expect(14);
	equal(dateTest.humanize("dddd, MMMM Do YYYY, h:mm:ss a"), "Sunday, February 14th 2010, 3:25:50 pm");
	equal(dateTest.humanize("ddd, hA"), "Sun, 3PM");
	equal(dateTest.humanize("M Mo MM MMMM MMM"), "2 2nd 02 February Feb");
	equal(dateTest.humanize("YYYY YY"), "2010 10");
	equal(dateTest.humanize("D Do DD"), "14 14th 14");
	equal(dateTest.humanize("d do dddd ddd"), "0 0th Sunday Sun");
	equal(dateTest.humanize("DDD DDDo DDDD"), "45 45th 045");
	equal(dateTest.humanize("w wo ww"), "8 8th 08");
	equal(dateTest.humanize("h hh"), "3 03");
	equal(dateTest.humanize("H HH"), "15 15");
	equal(dateTest.humanize("m mm"), "25 25");
	equal(dateTest.humanize("s ss"), "50 50");
	equal(dateTest.humanize("a A"), "pm PM");
	equal(dateTest.humanize("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45th day of the year");
  });
  
  test("add || subtract", function() {
	var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
    expect(7);
	equal(dateTest.humanize("MMMM Do YYYY, h:mm:ss a"), "February 14th 2010, 3:25:50 pm");
    
    dateTest.add({ms:200,s:10,m:10,h:2,d:3,M:2,y:3});
	equal(dateTest.humanize("MMMM Do YYYY, h:mm:ss a"), "April 17th 2013, 5:36:00 pm");
    
    dateTest.add({w:1});
    equal(dateTest.humanize("MMMM Do YYYY, h:mm:ss a"), "April 24th 2013, 5:36:00 pm");
    
	dateTest = new Date(2010, 0, 31);
    equal(dateTest.humanize("MMMM Do YYYY"), "January 31st 2010");
    
    dateTest.add({M:1});
    equal(dateTest.humanize("MMMM Do YYYY"), "February 28th 2010");
    
	dateTest = new Date(2008, 1, 29);
    dateTest.subtract({y:1});
    equal(dateTest.humanize("MMMM Do YYYY"), "February 28th 2007");
    
	dateTest = new Date(2008, 1, 29);
    dateTest.subtract({M:1});
    equal(dateTest.humanize("MMMM Do YYYY"), "January 29th 2008");
  });
  
  test("isleapyear", function() {
    expect(4);
	equal(new Date(2010, 0, 1).isleapyear(), false);
	equal(new Date(2100, 0, 1).isleapyear(), false);
	equal(new Date(2008, 0, 1).isleapyear(), true);
	equal(new Date(2000, 0, 1).isleapyear(), true);
  });
  
  test("isdst", function() {
    expect(2);
	equal(new Date(2010, 0, 1).isdst(), false);
	equal(new Date(2010, 6, 1).isdst(), true);
  });

});