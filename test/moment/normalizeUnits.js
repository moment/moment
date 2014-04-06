/*global require, exports */

var moment = require("../../moment");

exports.normalizeUnits = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "normalize units" : function (test) {
        var fullKeys = ["year", "quarter", "month", "isoWeek", "week", "day", "hour", "minute", "second", "millisecond", "date", 'dayOfYear', 'weekday', 'isoWeekday', 'weekYear', 'isoWeekYear'],
            aliases = ["y", "Q", "M", "W", "w", "d", "h", "m", "s", "ms", "D", 'DDD', 'e', 'E', 'gg', 'GG'],
            length = fullKeys.length,
            fullKey,
            fullKeyCaps,
            fullKeyPlural,
            fullKeyCapsPlural,
            fullKeyLower,
            alias,
            index;

        for (index = 0; index < length; index += 1) {
            fullKey = fullKeys[index];
            fullKeyCaps = fullKey.toUpperCase();
            fullKeyLower = fullKey.toLowerCase();
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
