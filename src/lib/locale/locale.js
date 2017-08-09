// Side effect imports
import './prototype';

import {
  getSetGlobalLocale,
  getLocale
} from './context';

import {
    defineLocale,
    updateLocale,
    listLocales,
    resetLocales
} from './loader';

import {
    listMonths,
    listMonthsShort,
    listWeekdays,
    listWeekdaysShort,
    listWeekdaysMin
} from './lists';

export {
    getSetGlobalLocale,
    defineLocale,
    updateLocale,
    resetLocales,
    getLocale,
    listLocales,
    listMonths,
    listMonthsShort,
    listWeekdays,
    listWeekdaysShort,
    listWeekdaysMin
};

import './en';
