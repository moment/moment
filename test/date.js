$(document).ready(function() {

  module("Date");
  
  test("dateFormat", function() {
	var dateTest = new Date(2010, 0, 3, 15, 25, 50, 125);
    expect(9);
	equal(_d.dateFormat('j d S', dateTest), "3 03 rd");
	equal(_d.dateFormat('l D w N', dateTest), "Sunday Sun 0 7");
	equal(_d.dateFormat('z W', dateTest), "2 53");
	equal(_d.dateFormat('n m F M t', dateTest), "1 01 January Jan 31");
	equal(_d.dateFormat('L Y y', dateTest), "0 2010 10");
	equal(_d.dateFormat('a A B', dateTest), "pm PM 017");
	equal(_d.dateFormat('g h G H', dateTest), "3 03 15 15");
	equal(_d.dateFormat('i s U', dateTest), "25 50 1262561150");
	equal(_d.dateFormat('I O P Z', dateTest), "0 -0800 -08:00 -28800");
  });

});