var moment = require("../../moment");

exports.roundTo = {
    setUp: function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "round to nearest unit": function (test) {
        test.expect(7 * 3);
        
        var actual = moment(1234, 5, 6, 7, 8, 9, 10);

        test.equal(moment(actual).roundTo('millisecond', 1).get('millisecond'), 10, 'millisecond should round to 10');
        test.equal(moment(actual).roundTo('millisecond', 2, 'up').get('millisecond'), 12, 'millisecond should round up to 12');
        test.equal(moment(actual).roundTo('millisecond', 3, 'down').get('millisecond'), 9, 'millisecond should round down to 9');

        test.equal(moment(actual).roundTo('second', 4).get('second'), 8, 'second should round to 8');
        test.equal(moment(actual).roundTo('second', 5, 'up').get('second'), 10, 'second should round up to 10');
        test.equal(moment(actual).roundTo('second', 6, 'down').get('second'), 6, 'second should round down to 6');

        test.equal(moment(actual).roundTo('minute', 7).get('minute'), 7, 'minute should round to 7');
        test.equal(moment(actual).roundTo('minute', 8, 'up').get('minute'), 8, 'minute should round up to 8');
        test.equal(moment(actual).roundTo('minute', 9, 'down').get('minute'), 0, 'minute should round down to 0');

        test.equal(moment(actual).roundTo('hour', 1).get('hour'), 7, 'hour should round to 7');
        test.equal(moment(actual).roundTo('hour', 2, 'up').get('hour'), 8, 'hour should round up to 8');
        test.equal(moment(actual).roundTo('hour', 3, 'down').get('hour'), 6, 'hour should round down to 6');

        test.equal(moment(actual).roundTo('day', 4).get('day'), 4, 'day should round to 4');
        test.equal(moment(actual).roundTo('day', 5, 'up').get('day'), 10, 'day should round up to 10');
        test.equal(moment(actual).roundTo('day', 6, 'down').get('day'), 6, 'day should round down to 6');

        test.equal(moment(actual).roundTo('month', 7).get('month'), 7, 'month should round to 7');
        test.equal(moment(actual).roundTo('month', 8, 'up').get('month'), 8, 'month should round up to 8');
        test.equal(moment(actual).roundTo('month', 9, 'down').get('month'), 0, 'month should round down to 0');

        test.equal(moment(actual).roundTo('year', 1).get('year'), 1234, 'year should round to 1234');
        test.equal(moment(actual).roundTo('year', 2, 'up').get('year'), 1234, 'year should round up to 1234');
        test.equal(moment(actual).roundTo('year', 3, 'down').get('year'), 1233, 'year should round down to 1233');

        test.done();
    },

};
