import { module, test } from "../qunit";
import moment from "../../moment";

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

module("preparse and postformat", {
    setup: function () {
        moment.locale('symbol', {
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
        });
    }
});

test('transform', function (assert) {
    assert.equal(moment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346025600, 'preparse string + format');
    assert.equal(moment.utc('@)!@-)*-@&').unix(), 1346025600, 'preparse ISO8601 string');
    assert.equal(moment.unix(1346025600).utc().format('YYYY-MM-DD'), '@)!@-)*-@&', 'postformat');
});

test('transform from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true), '@ minutes', 'postformat should work on moment.fn.from');
    assert.equal(moment().add(6, 'd').fromNow(true), '^ days', 'postformat should work on moment.fn.fromNow');
    assert.equal(moment.duration(10, 'h').humanize(), '!) hours', 'postformat should work on moment.duration.fn.humanize');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Today at @:)) AM',     'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Today at @:@% AM',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Today at #:)) AM',     'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at @:)) AM',  'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at !:)) AM',     'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at @:)) AM', 'yesterday at the same time');
});
