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
        var expected = {
            years:2010,
            months:3,
            date:5,
            hours:15,
            minutes:10,
            seconds:3,
            milliseconds:123
        };
        test.deepEqual(moment(expected).toObject(), expected, 'toObject invalid');
        test.done();
    }
};
