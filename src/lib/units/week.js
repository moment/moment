import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import toInt from '../utils/to-int';
import { createLocal } from '../create/local';
import { weekOfYear } from './week-calendar-utils';

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);


// HELPERS

// LOCALES

export function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

export var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

export function localeFirstDayOfWeek () {
    return this._week.dow;
}

export function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

export function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

export function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}
