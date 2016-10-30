import { Moment } from './constructor';
import wrap from '../utils/wrap';

var proto = Moment.prototype;

import { add, subtract } from './add-subtract';
import { calendar, getCalendarFormat } from './calendar';
import { isBefore, isBetween, isSame, isAfter, isSameOrAfter, isSameOrBefore } from './compare';
import { diff } from './diff';
import { format, toString, toISOString, inspect } from './format';
import { from, fromNow } from './from';
import { to, toNow } from './to';
import { stringGet, stringSet } from './get-set';
import { locale, localeData, lang } from './locale';
import { prototypeMin, prototypeMax } from './min-max';
import { startOf, endOf } from './start-end-of';
import { valueOf, toDate, toArray, toObject, toJSON, unix } from './to-type';
import { isValid, parsingFlags, invalidAt } from './valid';
import { creationData } from './creation-data';

proto.add            = wrap(Moment, add);
proto.calendar       = calendar;
proto.diff           = diff;
proto.endOf          = wrap(Moment, endOf);
proto.format         = format;
proto.from           = from;
proto.fromNow        = fromNow;
proto.to             = to;
proto.toNow          = toNow;
proto.get            = stringGet;
proto.invalidAt      = invalidAt;
proto.isAfter        = isAfter;
proto.isBefore       = isBefore;
proto.isBetween      = isBetween;
proto.isSame         = isSame;
proto.isSameOrAfter  = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid        = isValid;
proto.locale         = wrap(Moment, locale);
proto.localeData     = localeData;
proto.parsingFlags   = parsingFlags;
proto.set            = wrap(Moment, stringSet);
proto.startOf        = wrap(Moment, startOf);
proto.subtract       = wrap(Moment, subtract);
proto.toArray        = toArray;
proto.toObject       = toObject;
proto.toDate         = toDate;
proto.toISOString    = toISOString;
proto.inspect        = inspect;
proto.toJSON         = toJSON;
proto.toString       = toString;
proto.unix           = unix;
proto.valueOf        = valueOf;
proto.creationData   = creationData;

// Year
import { getSetYear, getIsLeapYear } from '../units/year';
proto.year       = wrap(Moment, getSetYear, true);
proto.isLeapYear = getIsLeapYear;

// Week Year
import { getSetWeekYear, getSetISOWeekYear, getWeeksInYear, getISOWeeksInYear } from '../units/week-year';
proto.weekYear    = wrap(Moment, getSetWeekYear, true);
proto.isoWeekYear = wrap(Moment, getSetISOWeekYear, true);

// Quarter
import { getSetQuarter } from '../units/quarter';
proto.quarter = proto.quarters = wrap(Moment, getSetQuarter, true);

// Month
import { getSetMonth, getDaysInMonth } from '../units/month';
proto.month       = wrap(Moment, getSetMonth, true);
proto.daysInMonth = getDaysInMonth;

// Week
import { getSetWeek, getSetISOWeek } from '../units/week';
proto.week    = proto.weeks    = wrap(Moment, getSetWeek, true);
proto.isoWeek = proto.isoWeeks = wrap(Moment, getSetISOWeek, true);
proto.weeksInYear              = getWeeksInYear;
proto.isoWeeksInYear           = getISOWeeksInYear;

// Day
import { getSetDayOfMonth } from '../units/day-of-month';
import { getSetDayOfWeek, getSetISODayOfWeek, getSetLocaleDayOfWeek } from '../units/day-of-week';
import { getSetDayOfYear } from '../units/day-of-year';
proto.date             = wrap(Moment, getSetDayOfMonth, true);
proto.day = proto.days = wrap(Moment, getSetDayOfWeek, true);
proto.weekday          = wrap(Moment, getSetLocaleDayOfWeek, true);
proto.isoWeekday       = wrap(Moment, getSetISODayOfWeek, true);
proto.dayOfYear        = wrap(Moment, getSetDayOfYear, true);

// Hour
import { getSetHour } from '../units/hour';
proto.hour = proto.hours = wrap(Moment, getSetHour, true);

// Minute
import { getSetMinute } from '../units/minute';
proto.minute = proto.minutes = wrap(Moment, getSetMinute, true);

// Second
import { getSetSecond } from '../units/second';
proto.second = proto.seconds = wrap(Moment, getSetSecond, true);

// Millisecond
import { getSetMillisecond } from '../units/millisecond';
proto.millisecond = proto.milliseconds = wrap(Moment, getSetMillisecond, true);

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
    isUtc
} from '../units/offset';
proto.utcOffset            = wrap(Moment, getSetOffset, true);
proto.utc                  = wrap(Moment, setOffsetToUTC);
proto.local                = wrap(Moment, setOffsetToLocal);
proto.parseZone            = wrap(Moment, setOffsetToParsedOffset);
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
import { getZoneAbbr, getZoneName } from '../units/timezone';
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
import { deprecate } from '../utils/deprecate';
proto.clone = deprecate(
    'clone does nothing in Moment v3.x because the API is now immutable. Use moment(instance) to make a copy.',
    function clone() { return this; });
proto.dates = deprecate(
    'dates accessor is deprecated. Use date instead.',
    wrap(Moment, getSetDayOfMonth, true));
proto.lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    wrap(Moment, lang));
proto.max = deprecate(
    'moment().max() is deprecated. Use moment.min() instead (notice lack of parentheses).',
    prototypeMax);
proto.min = deprecate(
    'moment().min() is deprecated. Use moment.max() instead (notice lack of parentheses).',
    prototypeMin);
proto.months = deprecate(
    'months accessor is deprecated. Use month instead',
    wrap(Moment, getSetMonth, true));
proto.years = deprecate(
    'years accessor is deprecated. Use year instead',
    wrap(Moment, getSetYear, true));
proto.zone = deprecate(
    'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
    wrap(Moment, getSetZone, true));
proto.isDSTShifted = deprecate(
    'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
    isDaylightSavingTimeShifted);

export default proto;
