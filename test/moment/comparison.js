var moment = require("../../moment");

exports.comparison = {
    "is past" : function(test) {
      test.expect(5);
      test.ok(moment().subtract('hours', 1).isPast(), "An hour ago is in the past");
      test.ok(moment([2000, 1]).isPast(), "Feb 2000 is in the past");
      test.ok(!moment().isPast(), "Now is not the past");
      test.ok(!moment().add('hours', 1).isPast(), "An hour from now is not in the past");
      test.ok(!moment([2100, 1]).isPast(), "Feb 2100 is not in the past");
      test.done();
    },

    "is future" : function(test) {
        test.expect(5);
        test.ok(moment().add('hours', 1).isFuture(), "An hour from now is in the future");
        test.ok(moment([2100, 1]).isFuture(), "Feb 2100 is in the future");
        test.ok(!moment().isFuture(), "Now is not the future");
        test.ok(!moment().subtract('hours', 1).isFuture(), "An hour ago is not in the future");
        test.ok(!moment([2000, 1]).isFuture(), "Feb 2000 is not in the future");
        test.done();
    }
};
