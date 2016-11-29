import { normalizeObjectUnits } from '../units/aliases';
import { getLocale } from '../locale/locales';
import isDurationValid from './valid.js';

export function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration);

    this._isValid = isDurationValid(normalizedInput);
    this.isValid = () => this._isValid;

    var years = this._isValid && normalizedInput.year || 0,
        quarters = this._isValid && normalizedInput.quarter || 0,
        months = this._isValid && normalizedInput.month || 0,
        weeks = this._isValid && normalizedInput.week || 0,
        days = this._isValid && normalizedInput.day || 0,
        hours = this._isValid && normalizedInput.hour || 0,
        minutes = this._isValid && normalizedInput.minute || 0,
        seconds = this._isValid && normalizedInput.second || 0,
        milliseconds = this._isValid && normalizedInput.millisecond || 0;

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
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
