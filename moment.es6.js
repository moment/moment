//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

import { setHookCallback } from './src/lib/utils/hooks';
import { createLocal as local, momentPrototype as fn } from './src/lib/moment/moment';

import { hooks as moment } from './src/lib/utils/hooks';

moment.prototype = fn;
moment.version = '2.18.1';
setHookCallback(local);

export default moment;

export {
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
} from './src/lib/moment/moment';

export {
    getCalendarFormat as calendarFormat
} from './src/lib/moment/calendar';

export {
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
} from './src/lib/locale/locale';

export {
    isDuration,
    createDuration as duration,
    getSetRelativeTimeRounding as relativeTimeRounding,
    getSetRelativeTimeThreshold as relativeTimeThreshold
} from './src/lib/duration/duration';

export { normalizeUnits } from './src/lib/units/units';

export isDate from './src/lib/utils/is-date';
