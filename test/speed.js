var date = new Date(),
    new_date = _date();

JSLitmus.test('create from date', function() {
    return _date(date);
});

JSLitmus.test('create from _date', function() {
    return _date(new_date);
});

JSLitmus.test('create from undefined', function() {
    return _date();
});

JSLitmus.test('create from number', function() {
    return _date(100000);
});

JSLitmus.test('create from string', function() {
    return _date("Mon, 25 Dec 1995 13:30:00 GMT");
});

JSLitmus.test('create from array', function() {
    return _date([2010, 2, 6, 15, 25, 50, 125]);
});

JSLitmus.test('create from string with format', function() {
    return _date("12-02-1999 2:45:10", "DD-MM-YYYY h:m:s");
});
