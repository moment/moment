var moment = require('../../moment');

exports.natural_parsing = {
    'today': function(test) {
        test.expect(2);
        test.equal(moment('today').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'today');
        test.equal(moment('tod').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'today');
        test.done();
    },
    'tomorrow': function(test) {
        test.expect(2);
        test.equal(moment('tomorrow').format('MM/DD/YYYY'), moment().add('days', 1).format('MM/DD/YYYY'), 'tomorrow');
        test.equal(moment('tom').format('MM/DD/YYYY'),      moment().add('days', 1).format('MM/DD/YYYY'), 'tom');
        test.done();
    },
    'yesterday': function(test) {
        test.expect(1);
        test.equal(moment('yesterday').format('MM/DD/YYYY'), moment().subtract('days', 1).format('MM/DD/YYYY'), 'yesterday');
        test.done();
    },
    'Apr': function(test) {
        test.expect(1);
        test.equal(moment('Apr').format('MM'), '04', 'Apr');
        test.done();
    },
    '25 Apr': function(test) {
        test.expect(3);
        test.equals(moment('25 Apr').format('MM/DD'),   '04/25', '25 Apr');
        test.equals(moment('25th Apr').format('MM/DD'), '04/25', '25th Apr');
        test.equals(moment('Apr 25th').format('MM/DD'), '04/25', 'Apr 25th');
        test.done();
    },
    '2 days': function(test) {
      test.expect(1);
      test.equals(moment('2 days').format('MM/DD'), moment().add('days', 2).format('MM/DD'), '2 days');
      test.done();
    },
    '3 weeks ago': function(test) {
      test.expect(1);
      test.equals(moment('3 weeks ago').format('MM/DD/YYYY'), moment().subtract('weeks', 3).format('MM/DD/YYYY'), '3 weeks ago');
      test.done();
    },
   'last year': function(test) {
      test.expect(1);
      test.equals(moment('last year').format('MM/DD/YYYY'), moment().subtract('years', 1).format('MM/DD/YYYY'), 'last year');
      test.done();
    }
};

