import { setMonth } from '../units/month';
import { createDuration } from '../duration/create';
import { deprecateSimple } from '../utils/deprecate';
import updateOffset from '../timezone/update-offset';
import absRound from '../utils/abs-round';

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

export function addSubtract (mom, duration, isAdding) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months),
        date = mom._d;

    if (!mom.isValid()) {
        // No op
        return;
    }

    if (milliseconds) {
        date.setTime(date.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        date.setUTCDate(date.getUTCDate() + days * isAdding);
    }
    if (months) {
        setMonth(mom, date.getUTCMonth() + months * isAdding);
    }
    updateOffset(mom, days || months);
}

export var add      = createAdder(1, 'add');
export var subtract = createAdder(-1, 'subtract');
