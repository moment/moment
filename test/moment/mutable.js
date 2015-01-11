import { module, test } from "../qunit";
import moment from "../../moment";

module("mutable");

test('manipulation methods', function (assert) {
    var m = moment();

    assert.equal(m, m.year(2011), 'year() should be mutable');
    assert.equal(m, m.month(1), 'month() should be mutable');
    assert.equal(m, m.hours(7), 'hours() should be mutable');
    assert.equal(m, m.minutes(33), 'minutes() should be mutable');
    assert.equal(m, m.seconds(44), 'seconds() should be mutable');
    assert.equal(m, m.milliseconds(55), 'milliseconds() should be mutable');
    assert.equal(m, m.day(2), 'day() should be mutable');
    assert.equal(m, m.startOf('week'), 'startOf() should be mutable');
    assert.equal(m, m.add(1, 'days'), 'add() should be mutable');
    assert.equal(m, m.subtract(2, 'years'), 'subtract() should be mutable');
    assert.equal(m, m.local(), 'local() should be mutable');
    assert.equal(m, m.utc(), 'utc() should be mutable');
});

test('non mutable methods', function (assert) {
    var m = moment();
    assert.notEqual(m, m.clone(), 'clone() should not be mutable');
});
