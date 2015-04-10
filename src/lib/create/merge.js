import { createLocalOrUTC } from '../create/from-anything.js';

export function merge (datePart, timePart) {
    var input = [
        datePart.getFullYear(), datePart.getMonth(), datePart.getDate(),
        timePart.getHours(), timePart.getMinutes(), timePart.getSeconds()
    ];

    var output = createLocalOrUTC(input);
    return output;
}
