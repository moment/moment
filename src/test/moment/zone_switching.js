import { module, test } from '../qunit';
import moment from '../../moment';
import { isNearSpringDST } from '../helpers/dst';

module('zone switching');

test('local to utc, keepLocalTime = true', function (assert) {
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss';
    assert.equal(
        m.clone().utc(true).format(fmt),
        m.format(fmt),
        'local to utc failed to keep local time'
    );
});

test('local to utc, keepLocalTime = false', function (assert) {
    var m = moment();
    assert.equal(
        m.clone().utc().valueOf(),
        m.valueOf(),
        'local to utc failed to keep utc time (implicit)'
    );
    assert.equal(
        m.clone().utc(false).valueOf(),
        m.valueOf(),
        'local to utc failed to keep utc time (explicit)'
    );
});

test('local to zone, keepLocalTime = true', function (assert) {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assert.equal(
            m
                .clone()
                .zone(z * 60, true)
                .format(fmt),
            m.format(fmt),
            'local to zone(' + z + ':00) failed to keep local time'
        );
    }
});

test('local to zone, keepLocalTime = false', function (assert) {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assert.equal(
            m
                .clone()
                .zone(z * 60)
                .valueOf(),
            m.valueOf(),
            'local to zone(' + z + ':00) failed to keep utc time (implicit)'
        );
        assert.equal(
            m
                .clone()
                .zone(z * 60, false)
                .valueOf(),
            m.valueOf(),
            'local to zone(' + z + ':00) failed to keep utc time (explicit)'
        );
    }
});

test('utc to local, keepLocalTime = true', function (assert) {
    // Don't test near the spring DST transition
    if (isNearSpringDST()) {
        assert.expect(0);
        return;
    }

    var um = moment.utc(),
        fmt = 'YYYY-DD-MM HH:mm:ss';

    assert.equal(
        um.clone().local(true).format(fmt),
        um.format(fmt),
        'utc to local failed to keep local time'
    );
});

test('utc to local, keepLocalTime = false', function (assert) {
    var um = moment.utc();
    assert.equal(
        um.clone().local().valueOf(),
        um.valueOf(),
        'utc to local failed to keep utc time (implicit)'
    );
    assert.equal(
        um.clone().local(false).valueOf(),
        um.valueOf(),
        'utc to local failed to keep utc time (explicit)'
    );
});

test('zone to local, keepLocalTime = true', function (assert) {
    // Don't test near the spring DST transition
    if (isNearSpringDST()) {
        assert.expect(0);
        return;
    }

    test.expectedDeprecations('moment().zone');

    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assert.equal(
            m.clone().local(true).format(fmt),
            m.format(fmt),
            'zone(' + z + ':00) to local failed to keep local time'
        );
    }
});

test('zone to local, keepLocalTime = false', function (assert) {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assert.equal(
            m.clone().local(false).valueOf(),
            m.valueOf(),
            'zone(' + z + ':00) to local failed to keep utc time (explicit)'
        );
        assert.equal(
            m.clone().local().valueOf(),
            m.valueOf(),
            'zone(' + z + ':00) to local failed to keep utc time (implicit)'
        );
    }
});
