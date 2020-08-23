import { createLocal } from '../create/local.js';
import { createUTC } from '../create/utc.js';
import { createInvalid } from '../create/valid.js';
import { isMoment } from './constructor.js';
import { min, max } from './min-max.js';
import { now } from './now.js';
import momentPrototype from './prototype.js';

function createUnix(input) {
    return createLocal(input * 1000);
}

function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
}

export {
    now,
    min,
    max,
    isMoment,
    createUTC,
    createUnix,
    createLocal,
    createInZone,
    createInvalid,
    momentPrototype,
};
