/*global require, exports */

var moment = require("../../moment");

exports.normalizeUnits = {
    "normalize units" : function (test) {
        test.expect(54);
        var fullKeys = ["year", "month", "isoweek", "week", "day", "hour", "minute", "second", "millisecond"],
            aliases = ["y", "M", "W", "w", "d", "h", "m", "s", "ms"],
            length = fullKeys.length,
            fullKey,
            fullKeyCaps,
            fullKeyPlural,
            fullKeyCapsPlural,
            alias,
            aliasCaps,
            index;

        for (index = 0; index < length; index += 1) {
            fullKey = fullKeys[index];
            fullKeyCaps = fullKey.toUpperCase();
            fullKeyPlural = fullKey + "s";
            fullKeyCapsPlural = fullKeyCaps + "s";
            alias = aliases[index];
            aliasCaps = alias.toUpperCase;
            test.equal(moment.normalizeUnits(fullKey), fullKey, fullKey);
            test.equal(moment.normalizeUnits(fullKeyCaps), fullKey, fullKey);
            test.equal(moment.normalizeUnits(fullKeyPlural), fullKey, fullKey);
            test.equal(moment.normalizeUnits(fullKeyCapsPlural), fullKey, fullKey);
            test.equal(moment.normalizeUnits(alias), fullKey, fullKey);
            test.equal(moment.normalizeUnits(aliasCaps), fullKey, fullKey);
        }

        test.done();
    }
};
