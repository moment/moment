$(document).ready(function() {

  module("Time");

  test("relativetime", function() {
    expect(11);
	equal(_.relativetime(1000 * 30), "less than a minute");
	equal(_.relativetime(1000 * 60), "about a minute");
	equal(_.relativetime(1000 * 60 * 5), "5 minutes");
	equal(_.relativetime(1000 * 60 * 60), "about an hour");
	equal(_.relativetime(1000 * 60 * 60 * 5), "about 5 hours");
	equal(_.relativetime(1000 * 60 * 60 * 24), "a day");
	equal(_.relativetime(1000 * 60 * 60 * 24 * 5), "5 days");
	equal(_.relativetime(1000 * 60 * 60 * 24 * 30), "about a month");
	equal(_.relativetime(1000 * 60 * 60 * 24 * 30 * 5), "5 months");
	equal(_.relativetime(1000 * 60 * 60 * 24 * 30 * 12), "about a year");
	equal(_.relativetime(1000 * 60 * 60 * 24 * 365 * 5), "5 years");
  });
  
  test("msapart", function() {
    expect(5);
	equal(_d.msapart(1000, 0), 1000, "1 second (ms) - 0 = 1000");
	equal(_d.msapart(1000, 500), 500, "1 second (ms) - .5 second (ms) = -500");
	equal(_d.msapart(0, 1000), -1000, "0 - 1 second (ms) = -1000");
	equal(_d.msapart(new Date(1000), 1000), 0, "1 second (date) - 1 second (ms) = 0");
	var oneHourDate = new Date(),
		nowDate = new Date();
	oneHourDate.setHours(oneHourDate.getHours() + 1);
	equal(_d.msapart(oneHourDate, nowDate), 60 * 60 * 1000, "1 hour from now = 360000");
  });
  
  test("fromnow", function() {
    expect(2);
	equal(_d.fromnow(30000, 0), "in less than a minute");
	equal(_d.fromnow(0, 30000), "less than a minute ago");
  });


});
