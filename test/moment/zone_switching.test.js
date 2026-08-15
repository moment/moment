import { describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';
import { isNearSpringDST } from '../helpers/dst';

describe('zone switching', () => {
    test('local to utc, keepLocalTime = true', () => {
        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss';
        expect(
            m.clone().utc(true).format(fmt),
            'local to utc failed to keep local time'
        ).toBe(m.format(fmt));
    });

    test('local to utc, keepLocalTime = false', () => {
        var m = moment();
        expect(
            m.clone().utc().valueOf(),
            'local to utc failed to keep utc time (implicit)'
        ).toBe(m.valueOf());
        expect(
            m.clone().utc(false).valueOf(),
            'local to utc failed to keep utc time (explicit)'
        ).toBe(m.valueOf());
    });

    test('local to zone, keepLocalTime = true', () => {
        expectDeprecations('moment().zone');
        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss',
            z;

        // Apparently there is -12:00 and +14:00
        // https://en.wikipedia.org/wiki/UTC+14:00
        // https://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            expect(
                m
                    .clone()
                    .zone(z * 60, true)
                    .format(fmt),
                'local to zone(' + z + ':00) failed to keep local time'
            ).toBe(m.format(fmt));
        }
    });

    test('local to zone, keepLocalTime = false', () => {
        expectDeprecations('moment().zone');
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // https://en.wikipedia.org/wiki/UTC+14:00
        // https://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            expect(
                m
                    .clone()
                    .zone(z * 60)
                    .valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (implicit)'
            ).toBe(m.valueOf());
            expect(
                m
                    .clone()
                    .zone(z * 60, false)
                    .valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (explicit)'
            ).toBe(m.valueOf());
        }
    });

    test('utc to local, keepLocalTime = true', () => {
        // Don't test near the spring DST transition
        if (isNearSpringDST()) {
            return;
        }

        var um = moment.utc(),
            fmt = 'YYYY-DD-MM HH:mm:ss';

        expect(
            um.clone().local(true).format(fmt),
            'utc to local failed to keep local time'
        ).toBe(um.format(fmt));
    });

    test('utc to local, keepLocalTime = false', () => {
        var um = moment.utc();
        expect(
            um.clone().local().valueOf(),
            'utc to local failed to keep utc time (implicit)'
        ).toBe(um.valueOf());
        expect(
            um.clone().local(false).valueOf(),
            'utc to local failed to keep utc time (explicit)'
        ).toBe(um.valueOf());
    });

    test('zone to local, keepLocalTime = true', () => {
        // Don't test near the spring DST transition
        if (isNearSpringDST()) {
            return;
        }

        expectDeprecations('moment().zone');

        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss',
            z;

        // Apparently there is -12:00 and +14:00
        // https://en.wikipedia.org/wiki/UTC+14:00
        // https://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            expect(
                m.clone().local(true).format(fmt),
                'zone(' + z + ':00) to local failed to keep local time'
            ).toBe(m.format(fmt));
        }
    });

    test('zone to local, keepLocalTime = false', () => {
        expectDeprecations('moment().zone');
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // https://en.wikipedia.org/wiki/UTC+14:00
        // https://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            expect(
                m.clone().local(false).valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (explicit)'
            ).toBe(m.valueOf());
            expect(
                m.clone().local().valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (implicit)'
            ).toBe(m.valueOf());
        }
    });
});
