import { createCollect } from './from-anything';
import { localTimeZone } from '../timezone/local';
import { fixedTimeZoneForOffset } from '../timezone/fixed-offset';

export function createUTC (input, format, locale, strict) {
    return createCollect(input, format, locale, strict, fixedTimeZoneForOffset(0));
}

export function createFixedOffset (offset) {
    // maybe parse offset
    return function (input, format, locale, strict) {
        return createCollect(input, format, locale, strict, fixedTimeZoneForOffset(offset));
    }
}

// TODO(Iskren): Recheck all internal uses and take into account that it
// WON'T copy the zone any more
export function createLocal (input, format, locale, strict) {
    return createCollect(input, format, locale, strict, localTimeZone);
}

export function createZoned (tz) {
    return function (input, format, locale, strict) {
        return createCollect(input, format, locale, strict, tz);
    }
}
