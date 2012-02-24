var moment = require("../../moment");

// #humanize_duration translates a given integer into a relative-time format
// examples:
//   moment().humanize_duration('years',4); // 'in 4 years'
//   moment().humanize_duration('seconds',59); // 'in a minute'
//   moment().humanize_duration('seconds',59,true); // 'a minute'
exports.humanize_duration = {
    "a relative-time formatted duration" : function(test) {
        test.expect(3);
        test.equal(moment().humanizeDuration('minutes',2,true), '2 minutes', 'output formatted duration');
        test.equal(moment().humanizeDuration('minutes',2), 'in 2 minutes', 'output formatted duration');
        test.equal(moment().humanizeDuration('minutes',20000), 'in 14 days', 'output formatted duration');
        test.done();
    }
};
