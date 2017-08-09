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

/**
 * Two locale configs the same if they both have the same keys
 * and the value of every key is equal by reference.
 *
 * @param config1
 * @param config2
 */
export function isSameLocaleConfig(config1, config2) {
  if (config1 === config2) {
    return true;
  }

  return Object.keys(defaultLocaleConfig).every(key => {
      if (!config2.hasOwnProperty(key)) {
        return false;
      }
      if (isObject(config1[key]) && isObject(config2[key])) {
          let obj1 = config1[k], obj2 = config2[k];
          if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
          }
          return Object.keys(obj1).every(k => obj1[k] === obj2[k]);
      }

      if (isArray(config1[key]) && isArray(config2[key])) {
          let arr1 = config1[key], arr2 = config2[key];
          return arr1.length === arr2.length
              && arr1.every((item, index) => item === arr2[index]);
      }

      return config1[key] === config2[key];
  });

}

