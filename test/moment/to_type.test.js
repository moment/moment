import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('to type', () => {
    test('toObject', () => {
        var expected = {
            years: 2010,
            months: 3,
            date: 5,
            hours: 15,
            minutes: 10,
            seconds: 3,
            milliseconds: 123,
        };
        expect(moment(expected).toObject(), 'toObject invalid').toEqual(
            expected
        );
    });

    test('toArray', () => {
        var expected = [2014, 11, 26, 11, 46, 58, 17];
        expect(moment(expected).toArray(), 'toArray invalid').toEqual(expected);
    });

    test('toDate returns a copy of the internal date', () => {
        var m = moment(),
            d = m.toDate();
        m.year(0);
        expect(d).not.toBe(m.toDate());
    });

    test('toJSON', () => {
        if (Date.prototype.toISOString) {
            var expected = new Date().toISOString();
            expect(moment(expected).toJSON(), 'toJSON invalid').toEqual(
                expected
            );
        } else {
            // IE8
        }
    });

    test('toJSON works when moment is frozen', () => {
        if (Date.prototype.toISOString) {
            var expected = new Date().toISOString(),
                m = moment(expected);
            if (Object.freeze != null) {
                Object.freeze(m);
            }
            expect(m.toJSON(), 'toJSON when frozen invalid').toEqual(expected);
        } else {
            // IE8
        }
    });
});
