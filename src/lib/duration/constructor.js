import { normalizeObjectUnits } from '../units/aliases';
import { getLocale } from '../locale/locales';
import isDurationValid from './valid.js';
import fpMath from '../utils/fp-math';

export function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = Math.floor(normalizedInput.millisecond || 0); // no partial milliseconds

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = milliseconds;
    this._milliseconds = fpMath(this._milliseconds, '+', fpMath(seconds, '*', 1e3));
    this._milliseconds = fpMath(this._milliseconds, '+', fpMath(minutes, '*', 6e4));
    this._milliseconds = fpMath(this._milliseconds, '+', fpMath(hours, '*', 36e5));

    // Because dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = days;
    this._days = fpMath(this._days, '+', fpMath(weeks, '*', 7));

    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = months;
    this._months = fpMath(this._months, '+', fpMath(quarters, '*', 3));
    this._months = fpMath(this._months, '+', fpMath(years, '*', 12));

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

export function isDuration (obj) {
    return obj instanceof Duration;
}
