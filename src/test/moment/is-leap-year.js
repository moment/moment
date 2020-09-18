import { test, module } from '../qunit';
import each from '../helpers/each';
import { isLeapYear } from '../../lib/utils/is-leap-year';

module('is leap year');

test('leap years', function (assert) {
    var tests = [
        { year: 1, expected: false, description: '1 was not a leap year' },
        { year: 4, expected: true, description: '4 was a leap year' },
        { year: 100, expected: false, description: '100 was not a leap year' },
        { year: 400, expected: true, description: '400 was a leap year' },
        {
            year: 1700,
            expected: false,
            description:
                '1700 was a leap year in the Julian calendar, but not Gregorian',
        },
        {
            year: 1900,
            expected: false,
            description:
                '1900 was not a leap year, but this is a well known Microsoft Excel bug',
        },
        { year: 1904, expected: true, description: '1904 was a leap year' },
        { year: 2000, expected: true, description: '2000 was a leap year' },
        { year: 2008, expected: true, description: '2008 was a leap year' },
        {
            year: 2010,
            expected: false,
            description: '2010 was not a leap year',
        },
        { year: 2024, expected: true, description: '2024 will be a leap year' },
        { year: 3448, expected: true, description: '3448 will be a leap year' },
        { year: 4000, expected: true, description: '4000 will be a leap year' },
        {
            year: NaN,
            expected: false,
            description:
                'NaN returns false explicitly, as math operations on non-numbers yields NaN',
        },
        {
            year: '2000',
            expected: true,
            description:
                'The string literal "2000" yields true as it is parsed as the number 2000',
        },
        {
            year: Infinity,
            expected: false,
            description:
                'Non-finite years are technically not years and definitely not leap years',
        },
        {
            year: 3.14,
            expected: false,
            description:
                'Non-integer years are technically not years and definitely not leap years',
        },
        {
            year: 0,
            expected: true,
            description:
                'While unclear whether this case is exceptional, it is a leap year based on existing formula',
        },
        {
            year: -400,
            expected: true,
            description:
                'While unclear whether this case is exceptional, it is a leap year based on existing formula',
        },
        {
            year: {},
            expected: false,
            description: 'Objects are not a number, so not a leap year',
        },
        {
            year: [],
            expected: true,
            description:
                'An empty array is equivalent to 0, which is a leap year',
        },
    ];

    each(tests, function (testCase) {
        var actual = isLeapYear(testCase.year);
        assert.equal(actual, testCase.expected, testCase.description);
    });
});
