import { normalizeUnits } from '../units/aliases.js';
import absFloor from '../utils/abs-floor.js';

export function get(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds'),
    seconds = makeGetter('seconds'),
    minutes = makeGetter('minutes'),
    hours = makeGetter('hours'),
    days = makeGetter('days'),
    months = makeGetter('months'),
    years = makeGetter('years');

export { milliseconds, seconds, minutes, hours, days, months, years };

export function weeks() {
    return absFloor(this.days() / 7);
}
