var moment = require("../../moment");

exports.add = {
    "string prototype overrides call" : function(test) {
        test.expect(1);

        var prior = String.prototype.call;
        String.prototype.call = function() { return null;};

        var b = moment(new Date(2011, 7, 28, 15, 25, 50, 125));
        test.equal(b.format('MMMM Do YYYY, h:mm a'), 'August 28th 2011, 3:25 pm');

        String.prototype.call = prior;
        test.done();
    }

};
