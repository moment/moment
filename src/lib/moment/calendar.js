import { createLocal } from '../create/local';
import { cloneWithOffset } from '../units/offset';

export function calendar (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        diff = this.diff(sod, 'days', true),
        format = diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';

    var output = formats && (typeof formats[format] === 'function' ? formats[format]() : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}
