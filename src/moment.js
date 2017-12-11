//! moment.js
//! version : 2.19.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

import { hooks as moment, setHookCallback } from './lib/utils/hooks';

moment.version = '2.19.4';

import {
    min,
    max,
    now,
    isMoment,
    momentPrototype as fn,
    createUTC       as utc,
    createUnix      as unix,
    createLocal     as local,
    createInvalid   as invalid,
    createInZone    as parseZone
} from './lib/moment/moment';

import {
    getCalendarFormat
} from './lib/moment/calendar';

import {
    defineLocale,
    updateLocale,
    getSetGlobalLocale as locale,
    getLocale          as localeData,
    listLocales        as locales,
    listMonths         as months,
    listMonthsShort    as monthsShort,
    listWeekdays       as weekdays,
    listWeekdaysMin    as weekdaysMin,
    listWeekdaysShort  as weekdaysShort
} from './lib/locale/locale';

import {
    isDuration,
    createDuration              as duration,
    getSetRelativeTimeRounding  as relativeTimeRounding,
    getSetRelativeTimeThreshold as relativeTimeThreshold
} from './lib/duration/duration';

import { normalizeUnits } from './lib/units/units';

import isDate from './lib/utils/is-date';

setHookCallback(local);

moment.fn                    = fn;
moment.min                   = min;
moment.max                   = max;
moment.now                   = now;
moment.utc                   = utc;
moment.unix                  = unix;
moment.months                = months;
moment.isDate                = isDate;
moment.locale                = locale;
moment.invalid               = invalid;
moment.duration              = duration;
moment.isMoment              = isMoment;
moment.weekdays              = weekdays;
moment.parseZone             = parseZone;
moment.localeData            = localeData;
moment.isDuration            = isDuration;
moment.monthsShort           = monthsShort;
moment.weekdaysMin           = weekdaysMin;
moment.defineLocale          = defineLocale;
moment.updateLocale          = updateLocale;
moment.locales               = locales;
moment.weekdaysShort         = weekdaysShort;
moment.normalizeUnits        = normalizeUnits;
moment.relativeTimeRounding  = relativeTimeRounding;
moment.relativeTimeThreshold = relativeTimeThreshold;
moment.calendarFormat        = getCalendarFormat;
moment.prototype             = fn;

export default moment;
