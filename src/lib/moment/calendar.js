import { createLocal } from '../create/local';
import { cloneWithOffset } from '../units/offset';
import isFunction from '../utils/is-function';

export function calendar (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        daysDiff = this.diff(sod, 'days', true),
        monthsDiff = this.month() - sod.month(),
        yearsDiff = this.year() - sod.year(),
        format = daysDiff < -6 ?
                    (yearsDiff === 0 ?
                        (monthsDiff === 0 ? 'sameMonth' :
                            monthsDiff === -1 ? 'lastMonth' : 'sameYear') :
                    yearsDiff === -1 ? 'lastYear' : 'sameElse') :
            daysDiff < -1 ? 'lastWeek' :
            daysDiff < 0 ? 'lastDay' :
            daysDiff < 1 ? 'sameDay' :
            daysDiff < 2 ? 'nextDay' :
            daysDiff < 7 ? 'nextWeek' :
            monthsDiff === 0 ? 'sameMonth' :
            monthsDiff === 1 ? 'nextMonth' :
            yearsDiff === 0 ? 'sameYear' :
            yearsDiff === 1 ? 'nextYear' : 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}
