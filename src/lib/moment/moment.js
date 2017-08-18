import { createLocal, createUTC, createFixedOffset, createParsedOffset, createZoned } from '../create/constructors';
import { createInvalid } from '../create/from-anything';
import { isMoment } from './constructor';
import { min, max } from './min-max';
import { now } from './now';
import momentPrototype from './prototype';

function createUnix (input) {
    return createLocal(input * 1000);
}

// function createInZone () {
//     return createLocal.apply(null, arguments).parseZone();
// }

export {
    now,
    min,
    max,
    isMoment,
    createUTC,
    createUnix,
    createLocal,
    createFixedOffset,
    createParsedOffset,
    createZoned,
    createInvalid,
    momentPrototype
};
