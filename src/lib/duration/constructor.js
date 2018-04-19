import { normalizeObjectUnits } from '../units/aliases';
import { getLocale } from '../locale/locales';
import isDurationValid from './valid.js';

export function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = isNaN(duration) ? NaN : normalizedInput.year || 0,
        quarters = isNaN(normalizedInput.quarter) ? NaN : normalizedInput.quarter || 0,
        months = isNaN(normalizedInput.month) ? NaN : normalizedInput.month || 0,
        weeks = isNaN(normalizedInput.week) ? NaN : normalizedInput.week || 0,
        days = isNaN(normalizedInput.day) ? NaN : normalizedInput.day || 0,
        hours = isNaN(normalizedInput.hour) ? NaN : normalizedInput.hour || 0,
        minutes = isNaN(normalizedInput.minute) ? NaN : normalizedInput.minute || 0,
        seconds = isNaN(normalizedInput.second) ? NaN : normalizedInput.second || 0,
        milliseconds = isNaN(normalizedInput.millisecond) ? NaN : normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

export function isDuration (obj) {
    return obj instanceof Duration;
}
