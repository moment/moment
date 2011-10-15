var testrunner = require('qunit');

testrunner.options.errorsOnly = true;

testrunner.run({
    code: "./moment.js",
    tests: ["./test/date.js", "./test/lang.js"]
});

testrunner.run({
    code: "./moment.min.js",
    tests: ["./test/date.js", "./test/lang.js"]
});