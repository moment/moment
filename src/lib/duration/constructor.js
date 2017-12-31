import { normalizeObjectUnits } from '../units/aliases';
import { getLocale } from '../locale/locales';
import isDurationValid from './valid.js';

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
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
}

export function isDuration (obj) {
    return obj instanceof Duration;
}
