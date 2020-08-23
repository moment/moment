import { Locale } from './constructor.js';

var proto = Locale.prototype;

import { calendar } from './calendar.js';
import { longDateFormat } from './formats.js';
import { invalidDate } from './invalid.js';
import { ordinal } from './ordinal.js';
import { preParsePostFormat } from './pre-post-format.js';
import { relativeTime, pastFuture } from './relative.js';
import { set } from './set.js';

proto.calendar = calendar;
proto.longDateFormat = longDateFormat;
proto.invalidDate = invalidDate;
proto.ordinal = ordinal;
proto.preparse = preParsePostFormat;
proto.postformat = preParsePostFormat;
proto.relativeTime = relativeTime;
proto.pastFuture = pastFuture;
proto.set = set;

// Eras
import {
    localeEras,
    localeErasParse,
    localeErasConvertYear,
    erasAbbrRegex,
    erasNameRegex,
    erasNarrowRegex,
} from '../units/era.js';
proto.eras = localeEras;
proto.erasParse = localeErasParse;
proto.erasConvertYear = localeErasConvertYear;
proto.erasAbbrRegex = erasAbbrRegex;
proto.erasNameRegex = erasNameRegex;
proto.erasNarrowRegex = erasNarrowRegex;

// Month
import {
    localeMonthsParse,
    localeMonths,
    localeMonthsShort,
    monthsRegex,
    monthsShortRegex,
} from '../units/month.js';

proto.months = localeMonths;
proto.monthsShort = localeMonthsShort;
proto.monthsParse = localeMonthsParse;
proto.monthsRegex = monthsRegex;
proto.monthsShortRegex = monthsShortRegex;

// Week
import {
    localeWeek,
    localeFirstDayOfYear,
    localeFirstDayOfWeek,
} from '../units/week.js';
proto.week = localeWeek;
proto.firstDayOfYear = localeFirstDayOfYear;
proto.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
import {
    localeWeekdaysParse,
    localeWeekdays,
    localeWeekdaysMin,
    localeWeekdaysShort,
    weekdaysRegex,
    weekdaysShortRegex,
    weekdaysMinRegex,
} from '../units/day-of-week.js';

proto.weekdays = localeWeekdays;
proto.weekdaysMin = localeWeekdaysMin;
proto.weekdaysShort = localeWeekdaysShort;
proto.weekdaysParse = localeWeekdaysParse;

proto.weekdaysRegex = weekdaysRegex;
proto.weekdaysShortRegex = weekdaysShortRegex;
proto.weekdaysMinRegex = weekdaysMinRegex;

// Hours
import { localeIsPM, localeMeridiem } from '../units/hour.js';

proto.isPM = localeIsPM;
proto.meridiem = localeMeridiem;
