import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('days in year', () => {
    // https://github.com/moment/moment/issues/3717
    test('YYYYDDD should not parse DDD=000', () => {
        expect(moment(7000000, moment.ISO_8601, true).isValid()).toBe(false);
        expect(moment('7000000', moment.ISO_8601, true).isValid()).toBe(false);
        expect(moment(7000000, moment.ISO_8601, false).isValid()).toBe(false);
    });
});
