import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('string prototype', () => {
    test('string prototype overrides call', () => {
        var prior = String.prototype.call,
            b;
        String.prototype.call = function () {
            return null;
        };

        b = moment(new Date(2011, 7, 28, 15, 25, 50, 125));
        expect(b.format('MMMM Do YYYY, h:mm a')).toBe(
            'August 28th 2011, 3:25 pm'
        );

        String.prototype.call = prior;
    });
});
