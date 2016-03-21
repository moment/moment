export var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameMonth : 'L',
    lastMonth : 'L',
    nextMonth : 'L',
    sameYear : 'L',
    lastYear : 'L',
    nextYear : 'L',
    sameElse : 'L'
};

import isFunction from '../utils/is-function';

export function calendar (key, mom, now) {
    var output = this._calendar[key];
    return isFunction(output) ? output.call(mom, now) : output;
}
