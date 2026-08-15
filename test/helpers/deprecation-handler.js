import each from './each';

var expectedDeprecationPatterns,
    observedDeprecations,
    oldSuppressDeprecationWarnings;

export function expectDeprecations() {
    expectedDeprecationPatterns = arguments;
    observedDeprecations = [];
}

export function setupDeprecationHandler(moment) {
    expectedDeprecationPatterns = null;
    observedDeprecations = null;
    oldSuppressDeprecationWarnings = moment.suppressDeprecationWarnings;
    moment.suppressDeprecationWarnings = true;
    moment.deprecationHandler = function (name, msg) {
        var deprecationId = matchedDeprecation(
            name,
            msg,
            expectedDeprecationPatterns
        );
        if (deprecationId === -1) {
            throw new Error(
                'Unexpected deprecation thrown name=' + name + ' msg=' + msg
            );
        }
        observedDeprecations[deprecationId] = 1;
    };
}

export function teardownDeprecationHandler(moment) {
    moment.suppressDeprecationWarnings = oldSuppressDeprecationWarnings;

    if (expectedDeprecationPatterns != null) {
        var missedDeprecations = [];
        each(expectedDeprecationPatterns, function (deprecationPattern, id) {
            if (observedDeprecations[id] !== 1) {
                missedDeprecations.push(deprecationPattern);
            }
        });
        if (missedDeprecations.length !== 0) {
            throw new Error(
                'Expected deprecation warnings did not happen: ' +
                    missedDeprecations.join(' ')
            );
        }
    }
}

function matchedDeprecation(name, msg, deprecations) {
    if (deprecations == null) {
        return -1;
    }
    for (var i = 0; i < deprecations.length; ++i) {
        if (name != null && name === deprecations[i]) {
            return i;
        }
        if (
            msg != null &&
            msg.substring(0, deprecations[i].length) === deprecations[i]
        ) {
            return i;
        }
    }
    return -1;
}
