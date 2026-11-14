module.exports = {
    init(QUnit) {
        let runDetails;

        QUnit.on('testEnd', (test) => {
            test.errors.forEach((error) => {
                console.error('\n' + test.fullName.join(' > '));
                console.error(error.stack || error.message);
            });
        });

        QUnit.on('runEnd', (run) => {
            runDetails = run;
        });

        QUnit.done((assertions) => {
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
