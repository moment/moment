import { createLocalOrUTC } from '../create/from-anything.js';
import { isMoment } from '../moment/constructor.js';
import isDate from '../utils/is-date.js';

export function merge (datePart, timePart) {
    datePart = createLocalOrUTC(datePart);
    timePart = createLocalOrUTC(timePart);

    var input;
    input = [
        datePart.year(), datePart.month(), datePart.date(),
        timePart.hour(), timePart.minute(), timePart.second()
    ];

    var output = createLocalOrUTC(input);
    return output;
}
