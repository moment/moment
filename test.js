var testrunner = require('qunit');

testrunner.options.errorsOnly = true;

testrunner.run({
    code: "./underscore.date.js",
    tests: "./test/date.js"
});

testrunner.run({
    code: "./underscore.date.min.js",
    tests: "./test/date.js"
});