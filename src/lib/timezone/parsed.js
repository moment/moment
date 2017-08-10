import BaseTimeZone from './base';
import extend from '../utils/extend';

function ParsedTimeZone() {
}

ParsedTimeZone.prototype = extend(Object.create(BaseTimeZone.prototype), {
    type: 'parsed',
    isValid: function () {
        return false;
    }
});

export var parsedTimeZone = new ParsedTimeZone();
