import { isDuration } from './constructor';
import { createDuration } from './create';
import { createInvalid } from './valid';

function addSubtract (duration, input, value, direction) {
    var other = isDuration(input) ? input : createDuration(input, value);
    if (!duration.isValid() || !other.isValid()) {
        return createInvalid();
    }
    return createDuration({
        ms: duration._milliseconds + direction * other._milliseconds,
        d:  duration._days         + direction * other._days,
        M:  duration._months       + direction * other._months
    });
}

// supports only 2.0-style add(1, 's') or add(duration)
export function add (input, value) {
    return addSubtract(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
export function subtract (input, value) {
    return addSubtract(this, input, value, -1);
}
