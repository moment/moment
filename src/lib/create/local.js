import { createLocalOrUTC } from './from-anything';

export function createLocal (input, format, locale, strict) {
    console.log('input ', input, 'format ', format, 'strict ', strict, 'zone ', zone);
    return createLocalOrUTC(input, format, locale, strict, false);
}
