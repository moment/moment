var moment = require('../../moment');

exports.stringPrototype = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'string prototype overrides call' : function (test) {
        test.expect(1);

        moment.locale('en');
        var prior = String.prototype.call, b;
        String.prototype.call = function () {
            return null;
        };

        b = moment(new Date(2011, 7, 28, 15, 25, 50, 125));
        test.equal(b.format('MMMM Do YYYY, h:mm a'), 'August 28th 2011, 3:25 pm');

        String.prototype.call = prior;
        test.done();
    }

};
