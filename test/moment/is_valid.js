var moment = require("../../moment");

exports.is_valid = {
    "array bad month" : function(test) {
        test.expect(2);

        test.equal(moment([2010, -1]).isValid(), false, 'month -1');
        test.equal(moment([2100, 12]).isValid(), false, 'month 12');

        test.done();
    },

    "array good month" : function(test) {
        test.expect(12);

        for (var i = 0; i < 12; i++) {
            test.equal(moment([2010, i]).isValid(), true, 'month ' + i);
        }

        test.done();
    },

    "array bad date" : function(test) {
        test.expect(2);

        test.equal(moment([2010, 0, 0]).isValid(), false, 'date 0');
        test.equal(moment([2100, 0, 32]).isValid(), false, 'date 32');

        test.done();
    },

    "array bad date leap year" : function(test) {
        test.expect(4);

        test.equal(moment([2010, 1, 29]).isValid(), false, '2010 feb 29');
        test.equal(moment([2100, 1, 29]).isValid(), false, '2100 feb 29');
        test.equal(moment([2008, 1, 30]).isValid(), false, '2008 feb 30');
        test.equal(moment([2000, 1, 30]).isValid(), false, '2000 feb 30');
        test.done();
    },

    "string nonsensical" : function(test) {
        test.expect(1);

        test.equal(moment('fail').isValid(), false, 'string "fail"');
        test.done();
    }
};
