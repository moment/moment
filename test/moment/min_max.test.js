import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('min max', () => {
    test('min', () => {
        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month'),
            invalid = moment.invalid();

        expect(moment.min(now, future, past), 'min(now, future, past)').toBe(
            past
        );
        expect(moment.min(future, now, past), 'min(future, now, past)').toBe(
            past
        );
        expect(moment.min(future, past, now), 'min(future, past, now)').toBe(
            past
        );
        expect(moment.min(past, future, now), 'min(past, future, now)').toBe(
            past
        );
        expect(moment.min(now, past), 'min(now, past)').toBe(past);
        expect(moment.min(past, now), 'min(past, now)').toBe(past);
        expect(moment.min(now), 'min(now, past)').toBe(now);

        expect(
            moment.min([now, future, past]),
            'min([now, future, past])'
        ).toBe(past);
        expect(moment.min([now, past]), 'min(now, past)').toBe(past);
        expect(moment.min([now]), 'min(now)').toBe(now);

        expect(moment.min([now, invalid]), 'min(now, invalid)').toBe(invalid);
        expect(moment.min([invalid, now]), 'min(invalid, now)').toBe(invalid);
    });

    test('max', () => {
        var now = moment(),
            future = now.clone().add(1, 'month'),
            past = now.clone().subtract(1, 'month'),
            invalid = moment.invalid();

        expect(moment.max(now, future, past), 'max(now, future, past)').toBe(
            future
        );
        expect(moment.max(future, now, past), 'max(future, now, past)').toBe(
            future
        );
        expect(moment.max(future, past, now), 'max(future, past, now)').toBe(
            future
        );
        expect(moment.max(past, future, now), 'max(past, future, now)').toBe(
            future
        );
        expect(moment.max(now, past), 'max(now, past)').toBe(now);
        expect(moment.max(past, now), 'max(past, now)').toBe(now);
        expect(moment.max(now), 'max(now, past)').toBe(now);

        expect(
            moment.max([now, future, past]),
            'max([now, future, past])'
        ).toBe(future);
        expect(moment.max([now, past]), 'max(now, past)').toBe(now);
        expect(moment.max([now]), 'max(now)').toBe(now);

        expect(moment.max([now, invalid]), 'max(now, invalid)').toBe(invalid);
        expect(moment.max([invalid, now]), 'max(invalid, now)').toBe(invalid);
    });
});
