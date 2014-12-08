var moment = require('../../moment');

exports.isBetween = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'is between without units' : function (test) {
        test.expect(23);

        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'year is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2013, 3, 2, 3, 4, 5, 10))), false, 'year is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2012, 3, 2, 3, 4, 5, 10))), true, 'year is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'month is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 5, 2, 3, 4, 5, 10))), false, 'month is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 2, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 4, 2, 3, 4, 5, 10))), true, 'month is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'day is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 4, 3, 4, 5, 10))), false, 'day is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 3, 3, 4, 5, 10))), true, 'day is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 1, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'hour is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 5, 4, 5, 10))), false, 'hour is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 2, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 4, 4, 5, 10))), true, 'hour is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 6, 5, 10))), false, 'minute is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 2, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'minute is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 3, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 5, 5, 10))), true, 'minute is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 7, 10))), false, 'second is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 3, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'second is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 4, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 6, 10))), true, 'second is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 12))), false, 'millisecond is later');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 8)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'millisecond is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 3, 2, 3, 4, 5, 9)),
                    moment(new Date(2011, 3, 2, 3, 4, 5, 11))), true, 'millisecond is between');
        test.equal(m.isBetween(m, m), false, 'moments are not between themselves');
        test.equal(+m, +mCopy, 'isBetween second should not change moment');
        test.done();
    },

    'is between year' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year match');
        test.equal(m.isBetween(
                    moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                    moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                    moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                    moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is later');
        test.equal(m.isBetween(m, 'year'), false, 'same moments are not between the same year');
        test.equal(+m, +mCopy, 'isBetween year should not change moment');
        test.done();
    },

    'is between month' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 0, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 0, 31, 23, 59, 59, 999)),
                    moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, 'month is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, 'month is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 11, 6, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month is later');
        test.equal(m.isBetween(m, 'month'), false, 'same moments are not between the same month');
        test.equal(+m, +mCopy, 'isBetween month should not change moment');
        test.done();
    },

    'is between day' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), false, 'day match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'days'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), true, 'day is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 4, 7, 8, 9, 10)), 'day'), false, 'day is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), false, 'day is later');
        test.equal(m.isBetween(m, 'day'), false, 'same moments are not between the same day');
        test.equal(+m, +mCopy, 'isBetween day should not change moment');
        test.done();
    },

    'is between hour' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 5, 9, 10)),
                    moment(new Date(2011, 1, 2, 3, 9, 9, 10)), 'hour'), false, 'hour match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 1, 59, 59, 999)),
                    moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hours'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 2, 59, 59, 999)),
                    moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), true, 'hour is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'hour'), false, 'hour is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                    moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'hour'), false, 'hour is later');
        test.equal(m.isBetween(m, 'hour'), false, 'same moments are not between the same hour');
        test.equal(+m, +mCopy, 'isBetween hour should not change moment');
        test.done();
    },

    'is between minute' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 9, 10)),
                    moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), false, 'minute match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 3, 9, 10)),
                    moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minutes'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 3, 59, 999)),
                    moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), true, 'minute is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 5, 0, 0)),
                    moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'minute'), false, 'minute is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 2, 9, 10)),
                    moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), false, 'minute is later');
        test.equal(m.isBetween(m, 'minute'), false, 'same moments are not between the same minute');
        test.equal(+m, +mCopy, 'isBetween minute should not change moment');
        test.done();
    },

    'is between second' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), false, 'second match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 4, 10)),
                    moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'seconds'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 4, 999)),
                    moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), true, 'second is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 6, 0)),
                    moment(new Date(2011, 1, 2, 3, 4, 7, 10)), 'second'), false, 'second is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 3, 10)),
                    moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), false, 'second is later');
        test.equal(m.isBetween(m, 'second'), false, 'same moments are not between the same second');
        test.equal(+m, +mCopy, 'isBetween second should not change moment');
        test.done();
    },

    'is between millisecond' : function (test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 6)), 'millisecond'), false, 'millisecond match');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 7)), 'milliseconds'), true, 'plural should work');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 7)), 'millisecond'), true, 'millisecond is between');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 7)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'millisecond'), false, 'millisecond is earlier');
        test.equal(m.isBetween(
                    moment(new Date(2011, 1, 2, 3, 4, 5, 4)),
                    moment(new Date(2011, 1, 2, 3, 4, 5, 6)), 'millisecond'), false, 'millisecond is later');
        test.equal(m.isBetween(m, 'millisecond'), false, 'same moments are not between the same millisecond');
        test.equal(+m, +mCopy, 'isBetween millisecond should not change moment');
        test.done();
    }
};
