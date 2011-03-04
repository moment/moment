(function() {
	var date1 = new Date(1000),
		date2 = new Date(1000);
	
	JSLitmus.test('_.timeFromNow(1000 * 30, 0)', function() {
		return _.timeFromNow(1000, 0);
	});

	JSLitmus.test('_.timeAsWords(1000 * 30)', function() {
		return _.timeAsWords(1000 * 30);
	});

	JSLitmus.test('_.timeAsWords(1000 * 60 * 60 * 24 * 365 * 5)', function() {
		return _.timeAsWords(1000 * 60 * 60 * 24 * 365 * 5);
	});

	JSLitmus.test('_.timeDiff(1000)', function() {
		return _.timeDiff(1000);
	});

	JSLitmus.test('_.timeDiff(date1, date2)', function() {
		return _.timeDiff(date1, new Date(1000));
	});

	JSLitmus.test('_.timeDiff(date1, 1000)', function() {
		return _.timeDiff(date1, 1000);
	});

	JSLitmus.test('_.timeDiff(1000, 1000)', function() {
		return _.timeDiff(1000, 1000);
	});

	JSLitmus.test('_.dateFormat("LMAO")', function() {
		return _.dateFormat("LMAO");
	});

	JSLitmus.test('_.dateFormat("ABDFGHILMNOPSUWYZadghijlmnstwyz")', function() {
		return _.dateFormat("ABDFGHILMNOPSUWYZadghijlmnstwyz");
	});

})();