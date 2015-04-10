import { createLocalOrUTC } from '../create/from-anything.js';
import { isMoment } from '../moment/constructor.js';
import isDate from '../utils/is-date.js';

export function merge (datePart, timePart) {
    var input;

    if(isMoment(datePart) && isMoment(timePart)) {
        input = [
            datePart.year(), datePart.month(), datePart.date(),
            timePart.hour(), timePart.minute(), timePart.second()
        ];
    }
    else if(isDate(datePart) && isDate(timePart)) {
        input = [
            datePart.getFullYear(), datePart.getMonth(), datePart.getDate(),
            timePart.getHours(), timePart.getMinutes(), timePart.getSeconds()
        ];
    }

    var output = createLocalOrUTC(input);
    return output;
}
