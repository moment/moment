(function() {

	var date1 = new Date(2010, 2, 6, 15, 25, 50, 125),
		date2 = new Date(1000);

	JSLitmus.test('_.date(date1)', function() {
		return _.date(date1);
	});
    
	JSLitmus.test('_.date([2010, 2, 6, 15, 25, 50, 125])', function() {
		return _.date([2010, 2, 6, 15, 25, 50, 125]);
	});
    
	JSLitmus.test('_.date(100000)', function() {
		return _.date(100000);
	});
    
	JSLitmus.test('_.date("Mon, 25 Dec 1995 13:30:00 GMT")', function() {
		return _.date("Mon, 25 Dec 1995 13:30:00 GMT");
	});
    
    JSLitmus.test('_.date("12-02-1999 2:45:10", "DD-MM-YYYY h:m:s")', function() {
		return _.date("12-02-1999 2:45:10", "DD-MM-YYYY h:m:s");
	});
    
	JSLitmus.test('_.date()', function() {
		return _.date();
	});
    
})();