import { Duration } from './constructor';
import wrap from '../utils/wrap';

var proto = Duration.prototype;

import { abs } from './abs';
import { add, subtract } from './add-subtract';
import { as, asMilliseconds, asSeconds, asMinutes, asHours, asDays, asWeeks, asMonths, asYears, valueOf } from './as';
import { bubble } from './bubble';
import { get, milliseconds, seconds, minutes, hours, days, months, years, weeks } from './get';
import { humanize } from './humanize';
import { toISOString } from './iso-string';
import { lang, locale, localeData } from '../moment/locale';
import { isValid } from './valid';

proto.isValid        = isValid;
proto.abs            = abs;
proto.add            = add;
proto.subtract       = subtract;
proto.as             = as;
proto.asMilliseconds = asMilliseconds;
proto.asSeconds      = asSeconds;
proto.asMinutes      = asMinutes;
proto.asHours        = asHours;
proto.asDays         = asDays;
proto.asWeeks        = asWeeks;
proto.asMonths       = asMonths;
proto.asYears        = asYears;
proto.valueOf        = valueOf;
proto.get            = get;
proto.milliseconds   = milliseconds;
proto.seconds        = seconds;
proto.minutes        = minutes;
proto.hours          = hours;
proto.days           = days;
proto.weeks          = weeks;
proto.months         = months;
proto.years          = years;
proto.humanize       = humanize;
proto.toISOString    = toISOString;
proto.toString       = toISOString;
proto.toJSON         = toISOString;
proto.locale         = wrap(Duration, locale, true);
proto.localeData     = localeData;

// Deprecations
import { deprecate } from '../utils/deprecate';

proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString);
proto.lang = deprecate('duration.lang() is deprecated. Use locale() or localeData() instead.', wrap(Duration, lang));
