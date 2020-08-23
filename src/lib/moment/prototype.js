import { Moment } from './constructor.js';

var proto = Moment.prototype;

import { add, subtract } from './add-subtract.js';
import { calendar } from './calendar.js';
import { clone } from './clone.js';
import {
    isBefore,
    isBetween,
    isSame,
    isAfter,
    isSameOrAfter,
    isSameOrBefore,
} from './compare.js';
import { diff } from './diff.js';
import { format, toString, toISOString, inspect } from './format.js';
import { from, fromNow } from './from.js';
import { to, toNow } from './to.js';
import { stringGet, stringSet } from './get-set.js';
import { locale, localeData, lang } from './locale.js';
import { prototypeMin, prototypeMax } from './min-max.js';
import { startOf, endOf } from './start-end-of.js';
import { valueOf, toDate, toArray, toObject, toJSON, unix } from './to-type.js';
import { isValid, parsingFlags, invalidAt } from './valid.js';
import { creationData } from './creation-data.js';

proto.add = add;
proto.calendar = calendar;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== 'undefined' && Symbol.for != null) {
    proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
        return 'Moment<' + this.format() + '>';
    };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;

// Era
import { getEraName, getEraNarrow, getEraAbbr, getEraYear } from '../units/era.js';
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;

// Year
import { getSetYear, getIsLeapYear } from '../units/year.js';
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
import {
    getSetWeekYear,
    getSetISOWeekYear,
    getWeeksInYear,
    getWeeksInWeekYear,
    getISOWeeksInYear,
    getISOWeeksInISOWeekYear,
} from '../units/week-year.js';
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
import { getSetQuarter } from '../units/quarter.js';
proto.quarter = proto.quarters = getSetQuarter;

// Month
import { getSetMonth, getDaysInMonth } from '../units/month.js';
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
import { getSetWeek, getSetISOWeek } from '../units/week.js';
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;

// Day
import { getSetDayOfMonth } from '../units/day-of-month.js';
import {
    getSetDayOfWeek,
    getSetISODayOfWeek,
    getSetLocaleDayOfWeek,
} from '../units/day-of-week.js';
import { getSetDayOfYear } from '../units/day-of-year.js';
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;

// Hour
import { getSetHour } from '../units/hour.js';
proto.hour = proto.hours = getSetHour;

// Minute
import { getSetMinute } from '../units/minute.js';
proto.minute = proto.minutes = getSetMinute;

// Second
import { getSetSecond } from '../units/second.js';
proto.second = proto.seconds = getSetSecond;

// Millisecond
import { getSetMillisecond } from '../units/millisecond.js';
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
import {
    getSetOffset,
    setOffsetToUTC,
    setOffsetToLocal,
    setOffsetToParsedOffset,
    hasAlignedHourOffset,
    isDaylightSavingTime,
    isDaylightSavingTimeShifted,
    getSetZone,
    isLocal,
    isUtcOffset,
    isUtc,
} from '../units/offset.js';
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;

// Timezone
import { getZoneAbbr, getZoneName } from '../units/timezone.js';
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
import { deprecate } from '../utils/deprecate.js';
proto.dates = deprecate(
    'dates accessor is deprecated. Use date instead.',
    getSetDayOfMonth
);
proto.months = deprecate(
    'months accessor is deprecated. Use month instead',
    getSetMonth
);
proto.years = deprecate(
    'years accessor is deprecated. Use year instead',
    getSetYear
);
proto.zone = deprecate(
    'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
    getSetZone
);
proto.isDSTShifted = deprecate(
    'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
    isDaylightSavingTimeShifted
);

export default proto;
