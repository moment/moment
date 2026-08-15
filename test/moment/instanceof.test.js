import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('instanceof', () => {
    test('instanceof', () => {
        var extend = function (a, b) {
            var i;
            for (i in b) {
                a[i] = b[i];
            }
            return a;
        };

        expect(moment() instanceof moment, 'simple moment object').toBe(true);
        expect(
            extend({}, moment()) instanceof moment,
            'extended moment object'
        ).toBe(false);
        expect(moment(null) instanceof moment, 'invalid moment object').toBe(
            true
        );

        expect(
            new Date() instanceof moment,
            'date object is not moment object'
        ).toBe(false);
        expect(Object instanceof moment, 'Object is not moment object').toBe(
            false
        );
        expect('foo' instanceof moment, 'string is not moment object').toBe(
            false
        );
        expect(1 instanceof moment, 'number is not moment object').toBe(false);
        expect(NaN instanceof moment, 'NaN is not moment object').toBe(false);
        expect(null instanceof moment, 'null is not moment object').toBe(false);
        expect(
            undefined instanceof moment,
            'undefined is not moment object'
        ).toBe(false);
    });
});
