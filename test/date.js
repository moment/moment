$(document).ready(function() {

  module("Date");
  
  test("dateFormat", function() {
	var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
    expect(13);
	equal(dateTest.humanize("w, l D1 Y, h:m2:s2 a"), "Sunday, February 14th 2010, 3:25:50 pm");
	equal(dateTest.humanize("w1, hA"), "Sun, 3PM");
	equal(dateTest.humanize("L L1 L2 L3 l l1"), "2 2nd 02 02nd February Feb");
	equal(dateTest.humanize("Y Y1"), "2010 10");
	equal(dateTest.humanize("D D1 D2 D3"), "14 14th 14 14th");
	equal(dateTest.humanize("W W1 W2 W3 w w1"), "0 0th 00 00th Sunday Sun");
	equal(dateTest.humanize("d d1 d2 d3"), "45 45th 045 045th");
	equal(dateTest.humanize("K K1 K2 K3"), "8 8th 08 08th");
	equal(dateTest.humanize("h h1 h2 h3"), "3 3rd 03 03rd");
	equal(dateTest.humanize("H H1 H2 H3"), "15 15th 15 15th");
	equal(dateTest.humanize("m m1 m2 m3"), "25 25th 25 25th");
	equal(dateTest.humanize("s s1 s2 s3"), "50 50th 50 50th");
	equal(dateTest.humanize("a A"), "pm PM");
  });

});