var moment = require("../../moment");

exports.invalid = {
    "invalid" : function (test) {
        var m = moment.invalid();
        test.equals(m.isValid(), false);
        test.equals(m.valueOf(), new Date(0).valueOf());
        test.done();
    }
};
