var moment = require("../../moment");

exports.invalid = {
    "invalid" : function (test) {
        var m = moment.invalid();
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, true);
        test.ok(isNaN(m.valueOf()));
        test.done();
    },

    "invalid with existing flag" : function (test) {
        var m = moment.invalid({invalidMonth : 'whatchamacallit'});
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, false);
        test.equals(m.parsingFlags().invalidMonth, 'whatchamacallit');
        test.ok(isNaN(m.valueOf()));
        test.done();
    },

    "invalid with custom flag" : function (test) {
        var m = moment.invalid({tooBusyWith : 'reiculating splines'});
        test.equals(m.isValid(), false);
        test.equals(m.parsingFlags().userInvalidated, false);
        test.equals(m.parsingFlags().tooBusyWith, 'reiculating splines');
        test.ok(isNaN(m.valueOf()));
        test.done();
    }
};
