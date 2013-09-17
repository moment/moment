var moment = require("../../moment");

exports.invalid = {
    "invalid" : function (test) {
        var m = moment.invalid();
        test.equals(m.isValid(), false);
        test.ok(isNaN(m.valueOf()));
        test.done();
    }
};
