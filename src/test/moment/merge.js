import { module, test } from '../qunit';
import moment from '../../moment';

module('merge');

test('merge', function (assert) {
    var year = 2010, month = 5, day = 3,
        hour = 10, minute = 20, second = 30,
        dateDate = new Date(year, month, day),
        timeDate = new Date(0, 0, 0, hour, minute, second),
        dateMoment = moment([year, month, day]),
        timeMoment = moment([0, 0, 0, hour, minute, second]);

    var expected = moment([year, month, day, hour, minute, second]);

    var combinations = [
        {date: dateDate, time: timeDate, desc: 'merge(date, date)'},
        {date: dateMoment, time: timeMoment, desc: 'merge(moment, moment)'},
        {date: dateDate, time: timeMoment, desc: 'merge(date, moment)'},
        {date: dateMoment, time: timeDate, desc: 'merge(moment, date)'}
    ];

    combinations.forEach(function (combination) {
        var merged = moment.merge(combination.date, combination.time);

        assert.equal(merged.isSame(expected), true, combination.desc);
    });
});
