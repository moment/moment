import { daysToMonths, monthsToDays } from './bubble';
import { normalizeUnits } from '../units/aliases';
import toInt from '../utils/to-int';

export function as(units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': return daysToMonths(this._milliseconds / 1000 / 60 / 60 / 24) / 12;
        case 'month': return daysToMonths(this._milliseconds / 1000 / 60 / 60 / 24);
        case 'week': return this._milliseconds / 1000 / 60 / 60 / 24 / 7;
        case 'day': return this._milliseconds / 1000 / 60 / 60 / 24;
        case 'hour': return this._milliseconds / 1000 / 60 / 60;
        case 'minute': return this._milliseconds / 1000 / 60;
        case 'second': return this._milliseconds / 1000;
        // Math.floor prevents floating point math errors here
        case 'millisecond': return this._milliseconds;
        default: throw new Error('Unknown unit ' + units);
    }
}

// TODO: Use this.as('ms')?
export function valueOf() {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs(alias) {
    return function () {
        return this.as(alias);
    };
}

export var asMilliseconds = makeAs('ms');
export var asSeconds = makeAs('s');
export var asMinutes = makeAs('m');
export var asHours = makeAs('h');
export var asDays = makeAs('d');
export var asWeeks = makeAs('w');
export var asMonths = makeAs('M');
export var asYears = makeAs('y');
