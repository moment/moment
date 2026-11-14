import { module, test } from '../qunit';
import moment from '../../moment';

module('min max');

test('min', function (assert) {
    var now = moment(),
        future = now.clone().add(1, 'month'),
        past = now.clone().subtract(1, 'month'),
        invalid = moment.invalid();

    assert.equal(moment.min(now, future, past), past, 'min(now, future, past)');
    assert.equal(moment.min(future, now, past), past, 'min(future, now, past)');
    assert.equal(moment.min(future, past, now), past, 'min(future, past, now)');
    assert.equal(moment.min(past, future, now), past, 'min(past, future, now)');
    assert.equal(moment.min(now, past), past, 'min(now, past)');
    assert.equal(moment.min(past, now), past, 'min(past, now)');
    assert.equal(moment.min(now), now, 'min(now, past)');

    assert.equal(
        moment.min([now, future, past]),
        past,
        'min([now, future, past])'
    );
    assert.equal(moment.min([now, past]), past, 'min(now, past)');
    assert.equal(moment.min([now]), now, 'min(now)');

    assert.equal(moment.min([now, invalid]), invalid, 'min(now, invalid)');
    assert.equal(moment.min([invalid, now]), invalid, 'min(invalid, now)');
});

test('max', function (assert) {
    var now = moment(),
        future = now.clone().add(1, 'month'),
        past = now.clone().subtract(1, 'month'),
        invalid = moment.invalid();

    assert.equal(
        moment.max(now, future, past),
        future,
        'max(now, future, past)'
    );
    assert.equal(
        moment.max(future, now, past),
        future,
        'max(future, now, past)'
    );
    assert.equal(
        moment.max(future, past, now),
        future,
        'max(future, past, now)'
    );
    assert.equal(
        moment.max(past, future, now),
        future,
        'max(past, future, now)'
    );
    assert.equal(moment.max(now, past), now, 'max(now, past)');
    assert.equal(moment.max(past, now), now, 'max(past, now)');
    assert.equal(moment.max(now), now, 'max(now, past)');

    assert.equal(
        moment.max([now, future, past]),
        future,
        'max([now, future, past])'
    );
    assert.equal(moment.max([now, past]), now, 'max(now, past)');
    assert.equal(moment.max([now]), now, 'max(now)');

    assert.equal(moment.max([now, invalid]), invalid, 'max(now, invalid)');
    assert.equal(moment.max([invalid, now]), invalid, 'max(invalid, now)');
});

test('non-moment arguments', function (assert) {
    var earlier = moment('2020-01-01'),
        later = moment('2020-02-01'),
        date = new Date(2020, 0, 15);

    assert.equal(moment.min('no', later, null, earlier), earlier, 'min args');
    assert.equal(moment.max(false, earlier, date, later), later, 'max args');
    assert.equal(moment.min(later, date, earlier, 0), earlier, 'min positions');
    assert.equal(moment.max(earlier, {}, later, 'no'), later, 'max positions');
    assert.equal(moment.min([{}, later, earlier, date]), earlier, 'min array');
    assert.equal(moment.max([date, earlier, later, 0]), later, 'max array');
});

test('only non-moment arguments', function (assert) {
    assert.ok(moment.min().isValid(), 'min empty args');
    assert.ok(moment.max().isValid(), 'max empty args');
    assert.ok(moment.min([]).isValid(), 'min empty array');
    assert.ok(moment.max([]).isValid(), 'max empty array');
    assert.ok(!moment.min('no').isValid(), 'min one non-moment');
    assert.ok(!moment.max(new Date()).isValid(), 'max one non-moment');
    assert.ok(!moment.min('no', 0, null).isValid(), 'min non-moment args');
    assert.ok(!moment.max([false, undefined, {}]).isValid(), 'max array');
});

test('non-moment arguments with invalid moments', function (assert) {
    var valid = moment('2020-01-01'),
        invalid = moment.invalid();

    assert.equal(moment.min('no', valid, null, invalid), invalid, 'min');
    assert.equal(moment.max(invalid, false, valid, {}), invalid, 'max');
    assert.equal(moment.min([0, invalid, valid, 'no']), invalid, 'min array');
    assert.equal(moment.max([valid, {}, invalid, null]), invalid, 'max array');
});
