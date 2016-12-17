import { isMoment } from './constructor';
import { createLocal } from '../create/local';
import { cloneWithOffset } from '../units/offset';
import isFunction from '../utils/is-function';
import { hooks } from '../utils/hooks';

export function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

export function calendar (time, formats) {
    // #3658 - Adding overload to the calendar function in order to allow:
    // calendar(FORMATS) a single parameter, formats only function call
    if (arguments.length === 1 && typeof time === 'object' && !isMoment(time)) {
        formats = arguments[0];
        time = undefined;
    }
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}
