import { createCollect, createInvalid } from './from-anything';
import { localTimeZone } from '../timezone/local';
import { fixedTimeZoneForOffset } from '../timezone/fixed-offset';
import { isMoment } from '../moment/constructor';

export function createUTC (input, format, locale, strict) {
    return createCollect(input, format, locale, strict, fixedTimeZoneForOffset(0));
}

// TODO(Iskren): Enabled 'parse' offset, which uses it from the parsed string.
export function createFixedOffset () {
    var args = [].slice.apply(arguments),
        reg = args.slice(0, args.length - 1),
        last = args.length > 0 ? args[args.length - 1] : null;
    if (args.length === 0) {
        return createInvalid();
    }
    return createCollect(reg[0], reg[1], reg[2], reg[3], fixedTimeZoneForOffset(last));
}

export function createLocal (input, format, locale, strict) {
    return createCollect(input, format, locale, strict, localTimeZone);
}

export function createZoned () {
    var args = [].slice.apply(arguments),
        reg = args.slice(0, args.length - 1),
        last = args.length > 0 ? args[args.length - 1] : null;
    if (args.length === 0) {
        return createInvalid();
    }
    return createCollect(reg[0], reg[1], reg[2], reg[3], last);
}

// TODO (Iskren): Create defaultCreator and make it settable
export function momentize (obj) {
    return isMoment(obj) ? obj : createLocal(obj);
}
