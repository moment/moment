import { Duration } from './constructor.js';

var proto = Duration.prototype;

import { abs } from './abs.js';
import { add, subtract } from './add-subtract.js';
import {
    as,
    asMilliseconds,
    asSeconds,
    asMinutes,
    asHours,
    asDays,
    asWeeks,
    asMonths,
    asQuarters,
    asYears,
    valueOf,
} from './as.js';
import { bubble } from './bubble.js';
import { clone } from './clone.js';
import {
    get,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
    weeks,
} from './get.js';
import { humanize } from './humanize.js';
import { toISOString } from './iso-string.js';
import { lang, locale, localeData } from '../moment/locale.js';
import { isValid } from './valid.js';

proto.isValid = isValid;
proto.abs = abs;
proto.add = add;
proto.subtract = subtract;
proto.as = as;
proto.asMilliseconds = asMilliseconds;
proto.asSeconds = asSeconds;
proto.asMinutes = asMinutes;
proto.asHours = asHours;
proto.asDays = asDays;
proto.asWeeks = asWeeks;
proto.asMonths = asMonths;
proto.asQuarters = asQuarters;
proto.asYears = asYears;
proto.valueOf = valueOf;
proto._bubble = bubble;
proto.clone = clone;
proto.get = get;
proto.milliseconds = milliseconds;
proto.seconds = seconds;
proto.minutes = minutes;
proto.hours = hours;
proto.days = days;
proto.weeks = weeks;
proto.months = months;
proto.years = years;
proto.humanize = humanize;
proto.toISOString = toISOString;
proto.toString = toISOString;
proto.toJSON = toISOString;
proto.locale = locale;
proto.localeData = localeData;

// Deprecations
import { deprecate } from '../utils/deprecate.js';

proto.toIsoString = deprecate(
    'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
    toISOString
);
proto.lang = lang;
