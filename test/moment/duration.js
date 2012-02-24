var moment = require("../../moment");

// #formatted_duration translates a given integer into a relative-time format
// examples:
//   moment().formatted_duration('years',4); // 'in 4 years'
//   moment().formatted_duration('seconds',59); // 'in a minute'
//   moment().formatted_duration('seconds',59,true); // 'a minute'
exports.formatted_duration = {
    "a relative-time formatted duration" : function(test) {
        test.expect(2);
        test.equal(moment().formatted_duration('minutes',2,true), '2 minutes', 'output formatted duration');
        test.equal(moment().formatted_duration('minutes',2), 'in 2 minutes', 'output formatted duration');
        test.equal(moment().formatted_duration('minutes',20000), 'in 14 days', 'output formatted duration');
        test.done();
    }
};
