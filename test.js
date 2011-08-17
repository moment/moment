var testrunner = require('qunit');

testrunner.options.coverage = false;

testrunner.run({
    code: "./underscore.date.js",
    tests: "./test/date.js"
});

testrunner.run({
    code: "./underscore.date.min.js",
    tests: "./test/date.js"
});