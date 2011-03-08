$(document).ready(function() {

  module("Date");
  
  test("dateFormat", function() {
	var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
    expect(13);
	equal(dateTest.humanize("dddd, MMMM Do YYYY, h:mm:ss a"), "Sunday, February 14th 2010, 3:25:50 pm");
	equal(dateTest.humanize("ddd, hA"), "Sun, 3PM");
	equal(dateTest.humanize("M Mo MM MMMM MMM"), "2 2nd 02 February Feb");
	equal(dateTest.humanize("YYYY YY"), "2010 10");
	equal(dateTest.humanize("D Do DD"), "14 14th 14");
	equal(dateTest.humanize("d do dd dddd ddd"), "0 0th 00 Sunday Sun");
	equal(dateTest.humanize("DDD DDDo DDDD"), "45 45th 045");
	equal(dateTest.humanize("w wo ww"), "8 8th 08");
	equal(dateTest.humanize("h hh"), "3 03");
	equal(dateTest.humanize("H HH"), "15 15");
	equal(dateTest.humanize("m mm"), "25 25");
	equal(dateTest.humanize("s ss"), "50 50");
	equal(dateTest.humanize("a A"), "pm PM");
  });

});