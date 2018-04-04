import { defaultCalendar } from './calendar.js';
import { defaultLongDateFormat } from './formats.js';
import { defaultInvalidDate } from './invalid.js';
import { defaultOrdinal, defaultDayOfMonthOrdinalParse } from './ordinal.js';
import { defaultRelativeTime } from './relative.js';

// months
import {
    defaultLocaleMonths,
    defaultLocaleMonthsShort,
} from '../units/month';

// week
import { defaultLocaleWeek } from '../units/week.js';

// weekdays
import {
    defaultLocaleWeekdays,
    defaultLocaleWeekdaysMin,
    defaultLocaleWeekdaysShort,
} from '../units/day-of-week';

// meridiem
import { defaultLocaleMeridiemParse } from '../units/hour.js';

export var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};
