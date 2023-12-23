import { hooks } from './hooks';
import isDate from './is-date';

/**
 * Update an Error with the specified date, input and format.
 *
 * @param {*} message The error message
 * @param {*} date The date
 * @param {*} input The input
 * @param {*} format The format
 */
function makeError(message, date, input, format) {
    var error = new Error(message);
    error.date = date;
    error.input = input;
    error.format = format;
    error.toJSON = function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
        };
    };
    return error;
}

/**
 * Create an Error with the specified message, date, input and format.
 *
 * @param {*} message The error message
 * @param {*} date The date
 * @param {*} input The input
 * @param {*} format The format
 */
export default function createError(message, date, input, format) {
    if (hooks.suppressCreateError !== false) {
        return;
    }
    if (isDate(date) && date.toString() !== 'Invalid Date') {
        return;
    }
    throw makeError(message, date, input, format);
}

// Specify whether to disable throwing errors, ths default value is `true`
hooks.suppressCreateError = true;
