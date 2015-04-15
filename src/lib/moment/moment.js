import { createLocal } from '../create/local';
import { createUTC } from '../create/utc';
import { createInvalid } from '../create/valid';
import { isMoment } from './constructor';
import { min, max } from './min-max';
import { merge} from '../create/merge.js';
import momentPrototype from './prototype';

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

export {
    min,
    max,
    merge,
    isMoment,
    createUTC,
    createUnix,
    createLocal,
    createInZone,
    createInvalid,
    momentPrototype
};
