import extend from '../utils/extend';
import BaseTimeZone from './base';

function LocalTimeZone() {
}

LocalTimeZone.prototype = extend({}, BaseTimeZone.prototype);

LocalTimeZone.prototype.offsetFromTimestamp = function (uts) {
    return -(new Date(uts).getTimezoneOffset()) * 60 * 1000;
};

LocalTimeZone.prototype.type = 'local';

export var localTimeZone = new LocalTimeZone();
