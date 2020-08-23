import isObjectEmpty from './is-object-empty.js';
import hasOwnProp from './has-own-prop.js';
import isObject from './is-object.js';

export default function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = [
            'sameDay',
            'nextDay',
            'lastDay',
            'nextWeek',
            'lastWeek',
            'sameElse',
        ],
        i,
        property;

    for (i = 0; i < properties.length; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
}
