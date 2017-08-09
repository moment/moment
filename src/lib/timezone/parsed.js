import extend from '../utils/extend';
import BaseTimeZone from './base';

function ParsedTimeZone() {
}

ParsedTimeZone.prototype = extend({}, BaseTimeZone.prototype);

ParsedTimeZone.prototype.isValid = function () {
    return false;
}

export var parsedTimeZone = new ParsedTimeZone();
