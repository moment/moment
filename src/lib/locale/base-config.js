import { defaultCalendar } from './calendar';
import { defaultLongDateFormat } from './formats';
import { defaultInvalidDate } from './invalid';
import { defaultOrdinal, defaultOrdinalParse } from './ordinal';
import { defaultRelativeTime } from './relative';

// months
import {
    defaultLocaleMonths,
    defaultLocaleMonthsShort,
    defaultMonthsRegex,
    defaultMonthsShortRegex,
} from '../units/month';

// week
import { defaultLocaleWeek } from '../units/week';

// weekdays
import {
    defaultLocaleWeekdays,
    defaultLocaleWeekdaysMin,
    defaultLocaleWeekdaysShort,

    defaultWeekdaysRegex,
    defaultWeekdaysShortRegex,
    defaultWeekdaysMinRegex,
} from '../units/day-of-week';

// meridiem
import { defaultLocaleMeridiemParse } from '../units/hour';

export var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    ordinalParse: defaultOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    monthsRegex: defaultMonthsRegex,
    monthsShortRegex: defaultMonthsShortRegex,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    weekdaysRegex: defaultWeekdaysRegex,
    weekdaysShortRegex: defaultWeekdaysShortRegex,
    weekdaysMinRegex: defaultWeekdaysMinRegex,

    meridiemParse: defaultLocaleMeridiemParse
};
