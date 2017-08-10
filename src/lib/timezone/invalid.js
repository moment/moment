import BaseTimeZone from './base';
import extend from '../utils/extend';

function InvalidTimeZone() {
}

InvalidTimeZone.prototype = extend(Object.create(BaseTimeZone.prototype), {
    type: 'invalid',
    isValid: function () {
        return false;
    }
});

export var invalidTimeZone = new InvalidTimeZone();
