var moment = require('../../moment');

exports.isValid = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'array order' : function (test) {
        test.expect(1);
        var expected = [2014, 11, 26, 11, 46, 58, 17];
        test.deepEqual(moment(expected).toArray(), expected, 'toArray invalid');
        test.done();
    }
};
