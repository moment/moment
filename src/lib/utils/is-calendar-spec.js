import isObjectEmpty from './is-object-empty';
import hasOwnProp from './has-own-prop';
import isObject from './is-object';

export default function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input);

    var propertyTest = false,
        properties = [
            'sameDay',
            'nextDay',
            'lastDay',
            'nextWeek',
            'lastWeek',
            'sameElse'
        ];

    for (var property of properties) {
        propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
}
