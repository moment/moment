import { Moment } from './constructor';
import { get, set } from './get-set';
import { smartSetUTCMonth } from '../units/month';
import { createDuration } from '../duration/create';
import { deprecateSimple } from '../utils/deprecate';
import { hooks } from '../utils/hooks';
import absRound from '../utils/abs-round';
import { quickCreateUTC, quickCreateLocal } from '../create/from-anything';


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
        return addSubtract(this, dur, direction);
    };
}

export function addSubtract (mom, duration, isAdding) {
    // TODO: Check for last argument usage, make sure its ok
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months),
        d;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (months || days) {
        d = new Date(mom._d);
        if (months) {
            // takes care of 31st Jan + 1m -> 28th Feb
            smartSetUTCMonth(d, d.getUTCMonth() + months * isAdding);
        }
        if (days) {
            d.setUTCDate(d.getUTCDate() + days * isAdding);
        }
        return quickCreateLocal(d.valueOf() + milliseconds * isAdding, mom._locale, mom._tz);
    } else {
        return quickCreateUTC(mom.valueOf() + milliseconds * isAdding, mom._locale, mom._tz);
    }
}

export var add      = createAdder(1, 'add');
export var subtract = createAdder(-1, 'subtract');
