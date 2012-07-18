var moment = require("../../moment");

exports.mutable = {
    "manipulation methods" : function (test) {
        
        var mutableMethods = {
            'year':          function (m){ return m.year(2011); },
            'month':         function (m){ return m.month(1); },
            'date':          function (m){ return m.date(9); },
            'hours':         function (m){ return m.hours(7); },
            'minutes':       function (m){ return m.minutes(33); },
            'seconds':       function (m){ return m.seconds(44); },
            'milliseconds':  function (m){ return m.milliseconds(55); },
            'day':           function (m){ return m.day(2); },
            'startOf':       function (m){ return m.startOf('week') },
            'endOf':         function (m){ return m.endOf('week') },
            'add':           function (m){ return m.add('days', 1) },
            'subtract':      function (m){ return m.subtract('years', 2) },
            'local':         function (m){ return m.local() },
            'utc':           function (m){ return m.utc() }
        };

        test.expect(14);

        for (method in mutableMethods) {
            if (mutableMethods.hasOwnProperty(method)) {
                var d = new Date();
                var d2 = mutableMethods[method](moment(d)).toDate();
                test.equal(d, d2, method + "() should be mutable");
            }
        }

        test.done();
    },

    "non mutable methods" : function (test) {
        
        var nonMutableMethods = {
            'sod':       function (m){ return m.sod() },
            'eod':       function (m){ return m.eod() }
        };

        test.expect(2);

        for (method in nonMutableMethods){
            if (nonMutableMethods.hasOwnProperty(method)) {
                var d = new Date();
                var d2 = nonMutableMethods[method](moment(d)).toDate();
                test.notEqual(d, d2, method + "() should not be mutable");
            }
        }

        test.done();
    }

};
