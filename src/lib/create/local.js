import { createLocalOrUTC } from './from-anything';

export function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

export function createUTC (input, isUTC, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, isUTC);
}
