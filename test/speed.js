(function() {

	var date1 = new Date(2010, 2, 6, 15, 25, 50, 125),
		date2 = new Date(1000),
		rt1 = 1000 * 60 * 60 * 24 * 365 * 5,
		rt2 = 1000 * 30;

	JSLitmus.test('Date.humanize => Sunday, February 14th 2010, 3:25:50 pm', function() {
		return date1.humanize("w, l D1 Y, h:m2:s2 a");
	});
	
	JSLitmus.test('Date.humanize => Sun, 3PM', function() {
		return date1.humanize("w1, hA");
	});
	
	JSLitmus.test('_.fromnow(1000 * 30, 0)', function() {
		return _.fromnow(1000, 0);
	});

	JSLitmus.test('_.relativetime(1000 * 30)', function() {
		return _.relativetime(rt2);
	});

	JSLitmus.test('_.relativetime(1000 * 60 * 60 * 24 * 365 * 5)', function() {
		return _.relativetime(rt1);
	});

	JSLitmus.test('_.msapart(1000)', function() {
		return _.msapart(1000);
	});

	JSLitmus.test('_.msapart(date1, date2)', function() {
		return _.msapart(date1, date2);
	});

	JSLitmus.test('_.msapart(date1, 1000)', function() {
		return _.msapart(date1, 1000);
	});

	JSLitmus.test('_.msapart(1000, 1000)', function() {
		return _.msapart(1000, 1000);
	});
	
})();