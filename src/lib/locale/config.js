import isObject from '../utils/is-object';
import isArray from '../utils/is-array';

import { defaultCalendar } from './calendar';
import { defaultLongDateFormat } from './formats';
import { defaultInvalidDate } from './invalid';
import { defaultOrdinal, defaultDayOfMonthOrdinalParse } from './ordinal';
import { defaultRelativeTime } from './relative';

// months
import {
    defaultLocaleMonths,
    defaultLocaleMonthsShort,
} from '../units/month';

// week
import { defaultLocaleWeek } from '../units/week';

// weekdays
import {
    defaultLocaleWeekdays,
    defaultLocaleWeekdaysMin,
    defaultLocaleWeekdaysShort,
} from '../units/day-of-week';

// meridiem
import { defaultLocaleMeridiemParse } from '../units/hour';

export const defaultLocaleConfig = {
    // FIXME: Remove me
    abbr: 'en',
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


export function mergeLocaleConfigs(parentConfig, childConfig) {
  let res = Object.assign({}, parentConfig);
  for (let prop in childConfig) {
      if (childConfig.hasOwnProperty(prop)) {
          if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
              res[prop] = Object.assign({}, parentConfig[prop], childConfig[prop]);
          } else {
              res[prop] = childConfig[prop];
          }
      }
  }
  return res;
}

function sameObjects(obj1, obj2, sameValue) {
    if (obj1 === obj2) {
        return true;
    }

    sameValue = sameValue || function (v1, v2) { return v1 === v2; };

    return Object.keys(obj1).every(k => {
        if (obj1.hasOwnProperty(k) && obj2.hasOwnProperty(k)) {
            if (isObject(obj1[k] && isObject[obj2[k]])) {
                // Only compare objects at at most one level of nesting
                return sameObjects(obj1[k], obj2[k], sameValue);
            }
            if (isArray(obj1[k]) && isArray(obj2[k])) {
                let arr1 = obj1[k], arr2 = obj2[k];
                let res = arr1.length !== arr2.length;

                res = arr1.every((value, index) => value === arr2[index]);
                return res;
            }
            return obj1[k] === obj2[k];
        }
    });
}

/**
 * Two locale configs the same if they both have the same keys
 * and the value of every key is equal by reference.
 *
 * @param config1
 * @param config2
 */
export function isSameLocaleConfig(config1, config2) {
    return sameObjects(config1, config2);
}

