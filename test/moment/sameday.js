var moment = require("../../moment");

exports.sameday = {
    "same day" : function(test) {
        test.expect(8);

        test.equal(moment([2012, 6, 17]).isSameDay(moment([2012, 6, 17])), true, 'same day.');
        test.equal(moment([2012, 6, 17, 5, 20, 40]).isSameDay(moment([2012, 6, 17, 11, 23, 22])), true, 'same day different time of day');
        test.equal(moment([2012, 6, 17]).isSameDay(moment([2012, 6, 16])), false, 'previous day');
        test.equal(moment([2012, 6, 17]).isSameDay(moment([2012, 6, 18])), false, 'next day');
        test.equal(moment([2012, 6, 17, 5, 20, 40]).isSameDay(moment([2012, 6, 16, 11, 23, 22])), false, 'previous day different time of day');
        test.equal(moment([2012, 6, 17, 5, 20, 40]).isSameDay(moment([2012, 6, 18, 11, 23, 22])), false, 'next day different time of day');
        test.equal(moment([2012, 6, 17]).isSameDay(moment([2012, 7, 17])), false, 'same year and day, different month');
        test.equal(moment([2012, 6, 17]).isSameDay(moment([2011, 6, 17])), false, 'same day and month, different year');
        test.done();
    }
};
