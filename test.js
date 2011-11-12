var testrunner = require('qunit');

testrunner.options.errorsOnly = true;
testrunner.options.coverage = false;

testrunner.run({
    code: "./moment.js",
    tests: "./site/js/test.min.js"
});

testrunner.run({
    code: "./moment.min.js",
    tests: "./site/js/test.min.js"
});