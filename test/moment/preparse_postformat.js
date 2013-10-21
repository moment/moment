var moment = require("../../moment");


var symbolMap = {
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')'
};

var numberMap = {
    '!': '1',
    '@': '2',
    '#': '3',
    '$': '4',
    '%': '5',
    '^': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0'
};

var symbolLang = {
    preparse: function (string) {
        return string.replace(/[!@#$%\^&*()]/g, function (match) {
            return numberMap[match];
        });
    },

    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    }
};

exports.preparse_postformat = {
    setUp: function (cb) {
        moment.lang('symbol', symbolLang);
        cb();
    },

    tearDown: function (cb) {
        moment.lang('en-gb');
        cb();
    },

    "transform": function (test) {
        test.expect(3);

        test.equal(moment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346025600, "preparse string + format");
        test.equal(moment.utc('@)!@-)*-@&').unix(), 1346025600, "preparse ISO8601 string");
        test.equal(moment.unix(1346025600).utc().format('YYYY-MM-DD'), '@)!@-)*-@&', "postformat");

        test.done();
    },

    "transform from": function (test) {
        test.expect(3);

        var start = moment([2007, 1, 28]);

        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true), "@ minutes", "postformat should work on moment.fn.from");
        test.equal(moment().add('d', 6).fromNow(true), "^ days", "postformat should work on moment.fn.fromNow");
        test.equal(moment.duration(10, "h").humanize(), "!) hours", "postformat should work on moment.duration.fn.humanize");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Today at @:)) AM",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Today at @:@% AM",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Today at #:)) AM",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Tomorrow at @:)) AM",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Today at !:)) AM",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Yesterday at @:)) AM", "yesterday at the same time");

        test.done();
    }
};
