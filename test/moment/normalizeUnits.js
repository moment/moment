/*global require, exports */

var moment = require("../../moment");

exports.normalizeUnits = {
    "normalize units" : function (test) {
        test.expect(45);
        var fullKeys = ["year", "month", "isoweek", "week", "day", "hour", "minute", "second", "millisecond"],
            aliases = ["y", "M", "W", "w", "d", "h", "m", "s", "ms"],
            length = fullKeys.length,
            fullKey,
            fullKeyCaps,
            fullKeyPlural,
            fullKeyCapsPlural,
            alias,
            index;

        for (index = 0; index < length; index += 1) {
            fullKey = fullKeys[index];
            fullKeyCaps = fullKey.toUpperCase();
            fullKeyPlural = fullKey + "s";
            fullKeyCapsPlural = fullKeyCaps + "s";
            alias = aliases[index];
            test.equal(moment.normalizeUnits(fullKey), fullKey, "Testing full key " + fullKey);
            test.equal(moment.normalizeUnits(fullKeyCaps), fullKey, "Testing full key capitalised " + fullKey);
            test.equal(moment.normalizeUnits(fullKeyPlural), fullKey, "Testing full key plural " + fullKey);
            test.equal(moment.normalizeUnits(fullKeyCapsPlural), fullKey, "Testing full key capitalised and plural " + fullKey);
            test.equal(moment.normalizeUnits(alias), fullKey, "Testing alias " + fullKey);
        }

        test.done();
    }
};
