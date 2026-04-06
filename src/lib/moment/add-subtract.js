import { get } from './get-set';
import { setMonth } from '../units/month';
import { createDuration } from '../duration/create';
import { deprecateSimple } from '../utils/deprecate';
import { hooks } from '../utils/hooks';
import absRound from '../utils/abs-round';

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(
                name,
                'moment().' +
                    name +
                    '(period, number) is deprecated. Please use moment().' +
                    name +
                    '(number, period). ' +
                    'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
            );
            tmp = val;
            val = period;
            period = tmp;
        }

        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

export function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        addDays(mom, days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

// Add `days` to `mom` while preserving the local time-of-day. Native
// `Date#setDate` can leave the local hour shifted around midnight DST
// transitions (e.g. America/Santiago, where DST kicks in at 00:00 and
// `setDate(d+1)` from midnight lands on 23:00 of the previous day).
// To handle that, advance the timestamp by `days * 86400000` ms and then
// adjust by the difference between the source and destination timezone
// offsets so the local wall-clock time stays the same. See #4743.
function addDays(mom, days) {
    var d = mom._d,
        srcOffset,
        target,
        dstOffset;
    if (mom._isUTC) {
        d.setUTCDate(d.getUTCDate() + days);
        return;
    }
    srcOffset = d.getTimezoneOffset();
    target = d.valueOf() + days * 864e5;
    dstOffset = new Date(target).getTimezoneOffset();
    if (srcOffset !== dstOffset) {
        target += (dstOffset - srcOffset) * 6e4;
    }
    d.setTime(target);
}

export var add = createAdder(1, 'add'),
    subtract = createAdder(-1, 'subtract');
