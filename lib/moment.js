//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

import { hooks as moment, setHookCallback } from "./utils/hooks";

moment.version = '2.8.3';

import {
    min,
    max,
    isMoment,
    momentPrototype as fn,
    createUTC       as utc,
    createUnix      as unix,
    createLocal     as local,
    createInvalid   as invalid,
    createInZone    as parseZone
} from "./moment/moment";

import {
    defineLocale,
    getSetGlobalLocale as locale,
    getLocale          as localeData,
    listMonths         as months,
    listMonthsShort    as monthsShort,
    listWeekdays       as weekdays,
    listWeekdaysMin    as weekdaysMin,
    listWeekdaysShort  as weekdaysShort
} from "./locale/locale";

import {
    isDuration,
    createDuration as duration,
    getSetRelativeTimeThreshold as relativeTimeThreshold
} from "./duration/duration";

import { normalizeUnits } from "./units/units";

import isDate from "./utils/is-date";

setHookCallback(local);

moment.fn                    = fn;
moment.min                   = min;
moment.max                   = max;
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
moment.weekdaysShort         = weekdaysShort;
moment.normalizeUnits        = normalizeUnits;
moment.relativeTimeThreshold = relativeTimeThreshold;

export default moment;
