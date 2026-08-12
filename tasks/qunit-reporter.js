module.exports = {
    init: function (QUnit) {
        var runDetails;

        QUnit.on('testEnd', function (test) {
            test.errors.forEach(function (error) {
                console.error('\n' + test.fullName.join(' > '));
                console.error(error.stack || error.message);
            });
        });

        QUnit.on('runEnd', function (run) {
            runDetails = run;
        });

        QUnit.done(function (assertions) {
            console.log('\nGlobal summary:');
            console.log(
                runDetails.testCounts.total +
                    ' tests, ' +
                    assertions.total +
                    ' assertions, ' +
                    runDetails.testCounts.failed +
                    ' failed tests, ' +
                    assertions.failed +
                    ' failed assertions, ' +
                    runDetails.runtime +
                    'ms'
            );
        });
    },
};
