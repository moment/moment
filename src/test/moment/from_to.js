import { module, test } from '../qunit';
import moment from '../../moment';

module('from_to');

test('from', function (assert) {
    var start = moment();
    moment.locale('en');
    assert.equal(
        start.from(start.clone().add(5, 'seconds')),
        'a few seconds ago',
        '5 seconds = a few seconds ago'
    );
    assert.equal(
        start.from(start.clone().add(1, 'minute')),
        'a minute ago',
        '1 minute = a minute ago'
    );
    assert.equal(
        start.from(start.clone().add(5, 'minutes')),
        '5 minutes ago',
        '5 minutes = 5 minutes ago'
    );

    assert.equal(
        start.from(start.clone().subtract(5, 'seconds')),
        'in a few seconds',
        '5 seconds = in a few seconds'
    );
    assert.equal(
        start.from(start.clone().subtract(1, 'minute')),
        'in a minute',
        '1 minute = in a minute'
    );
    assert.equal(
        start.from(start.clone().subtract(5, 'minutes')),
        'in 5 minutes',
        '5 minutes = in 5 minutes'
    );
});

test('from with absolute duration', function (assert) {
    var start = moment();
    moment.locale('en');
    assert.equal(
        start.from(start.clone().add(5, 'seconds'), true),
        'a few seconds',
        '5 seconds = a few seconds'
    );
    assert.equal(
        start.from(start.clone().add(1, 'minute'), true),
        'a minute',
        '1 minute = a minute'
    );
    assert.equal(
        start.from(start.clone().add(5, 'minutes'), true),
        '5 minutes',
        '5 minutes = 5 minutes'
    );

    assert.equal(
        start.from(start.clone().subtract(5, 'seconds'), true),
        'a few seconds',
        '5 seconds = a few seconds'
    );
    assert.equal(
        start.from(start.clone().subtract(1, 'minute'), true),
        'a minute',
        '1 minute = a minute'
    );
    assert.equal(
        start.from(start.clone().subtract(5, 'minutes'), true),
        '5 minutes',
        '5 minutes = 5 minutes'
    );
});

test('to', function (assert) {
    var start = moment();
    moment.locale('en');
    assert.equal(
        start.to(start.clone().subtract(5, 'seconds')),
        'a few seconds ago',
        '5 seconds = a few seconds ago'
    );
    assert.equal(
        start.to(start.clone().subtract(1, 'minute')),
        'a minute ago',
        '1 minute = a minute ago'
    );
    assert.equal(
        start.to(start.clone().subtract(5, 'minutes')),
        '5 minutes ago',
        '5 minutes = 5 minutes ago'
    );

    assert.equal(
        start.to(start.clone().add(5, 'seconds')),
        'in a few seconds',
        '5 seconds = in a few seconds'
    );
    assert.equal(
        start.to(start.clone().add(1, 'minute')),
        'in a minute',
        '1 minute = in a minute'
    );
    assert.equal(
        start.to(start.clone().add(5, 'minutes')),
        'in 5 minutes',
        '5 minutes = in 5 minutes'
    );
});

test('to with absolute duration', function (assert) {
    var start = moment();
    moment.locale('en');
    assert.equal(
        start.to(start.clone().add(5, 'seconds'), true),
        'a few seconds',
        '5 seconds = a few seconds'
    );
    assert.equal(
        start.to(start.clone().add(1, 'minute'), true),
        'a minute',
        '1 minute = a minute'
    );
    assert.equal(
        start.to(start.clone().add(5, 'minutes'), true),
        '5 minutes',
        '5 minutes = 5 minutes'
    );

    assert.equal(
        start.to(start.clone().subtract(5, 'seconds'), true),
        'a few seconds',
        '5 seconds = a few seconds'
    );
    assert.equal(
        start.to(start.clone().subtract(1, 'minute'), true),
        'a minute',
        '1 minute = a minute'
    );
    assert.equal(
        start.to(start.clone().subtract(5, 'minutes'), true),
        '5 minutes',
        '5 minutes = 5 minutes'
    );
});
