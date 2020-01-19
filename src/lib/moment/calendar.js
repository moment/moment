import { createLocal } from '../create/local';
import { cloneWithOffset } from '../units/offset';
import isFunction from '../utils/is-function';
import { hooks } from '../utils/hooks';

export function getCalendarFormat(myMoment, now) {
    if (myMoment.year() === now.year()) {
        switch (myMoment.week() - now.week()) {
            case 0:
                const diff = myMoment.diff(now, 'days');
                if (diff === 0) {
                    return 'sameDay';
                } else if (diff === 1) {
                    return 'nextDay';
                } else if (diff === -1) {
                    return 'lastDay';
                }
                return 'sameElse';
            case 1:
                return 'nextWeek';
            case -1:
                return 'lastWeek';
            default:
                return 'sameElse';
        }
    } else {
        return 'sameElse';
    }
}

export function calendar (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}
