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
