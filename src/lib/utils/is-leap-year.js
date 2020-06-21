/**
 * Returns true if the year corresponds to a leap year in the
 * past, present, or future.
 * @param {*} year a year utilized as if it were a number
 * @returns whether or not the provided year is a leap year in the
 * Gregorian calendar
 */
export function isLeapYear(year) {
    if (isNaN(year) || !isFinite(year)) {
        return false;
    }

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
