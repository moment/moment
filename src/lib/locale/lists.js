import { getLocale } from './locales';
import { createUTC } from '../create/utc';

function get (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function list (format, index, field, count, setter) {
    if (typeof format === 'number') {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get(format, index, field, setter);
    }

    var i;
    var out = [];
    for (i = 0; i < count; i++) {
        out[i] = get(format, i, field, setter);
    }
    return out;
}

// shift the list according to the first day of week from locale data
function listLocaleWeekdays (format, index, field, count, setter) {
    if (typeof format === 'boolean' && format) {
        var weekdaysList = list(format, null, field, count, setter);
        var locale = getLocale();
        var firstDayOfWeek = locale._week.dow;
        var i;
        for (i = 0; i < firstDayOfWeek; i++) {
            weekdaysList.push(weekdaysList.shift());
        }
        if (typeof index === 'number') {
            return weekdaysList[index];
        }
        return weekdaysList;
    }
    return list(format, index, field, count, setter);
}

export function listMonths (format, index) {
    return list(format, index, 'months', 12, 'month');
}

export function listMonthsShort (format, index) {
    return list(format, index, 'monthsShort', 12, 'month');
}

// listWeekdays(true) to sort the list by the first day of week from locale data
// listWeekdays(true, NUMBER) to get the #NUMBER element in sorted list
export function listWeekdays (format, index) {
    return listLocaleWeekdays(format, index, 'weekdays', 7, 'day');
}

// similar as listWeekdays()
export function listWeekdaysShort (format, index) {
    return listLocaleWeekdays(format, index, 'weekdaysShort', 7, 'day');
}

// similar as listWeekdays()
export function listWeekdaysMin (format, index) {
    return listLocaleWeekdays(format, index, 'weekdaysMin', 7, 'day');
}
