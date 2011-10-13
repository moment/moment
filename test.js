var testrunner = require('qunit');

testrunner.options.errorsOnly = true;

testrunner.run({
    code: "./underscore.date.js",
    tests: ["./test/date.js", "./test/lang.js"]
});

testrunner.run({
    code: "./underscore.date.min.js",
    tests: ["./test/date.js", "./test/lang.js"]
});