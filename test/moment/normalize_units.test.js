import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('normalize units', () => {
    test('normalize units', () => {
        var fullKeys = [
                'year',
                'quarter',
                'month',
                'isoWeek',
                'week',
                'day',
                'hour',
                'minute',
                'second',
                'millisecond',
                'date',
                'dayOfYear',
                'weekday',
                'isoWeekday',
                'weekYear',
                'isoWeekYear',
            ],
            aliases = [
                'y',
                'Q',
                'M',
                'W',
                'w',
                'd',
                'h',
                'm',
                's',
                'ms',
                'D',
                'DDD',
                'e',
                'E',
                'gg',
                'GG',
            ],
            length = fullKeys.length,
            fullKey,
            fullKeyCaps,
            fullKeyPlural,
            fullKeyCapsPlural,
            alias,
            index;

        for (index = 0; index < length; index += 1) {
            fullKey = fullKeys[index];
            fullKeyCaps = fullKey.toUpperCase();
            fullKeyPlural = fullKey + 's';
            fullKeyCapsPlural = fullKeyCaps + 's';
            alias = aliases[index];
            expect(
                moment.normalizeUnits(fullKey),
                'Testing full key ' + fullKey
            ).toBe(fullKey);
            expect(
                moment.normalizeUnits(fullKeyCaps),
                'Testing full key capitalised ' + fullKey
            ).toBe(fullKey);
            expect(
                moment.normalizeUnits(fullKeyPlural),
                'Testing full key plural ' + fullKey
            ).toBe(fullKey);
            expect(
                moment.normalizeUnits(fullKeyCapsPlural),
                'Testing full key capitalised and plural ' + fullKey
            ).toBe(fullKey);
            expect(
                moment.normalizeUnits(alias),
                'Testing alias ' + fullKey
            ).toBe(fullKey);
        }
    });
});
