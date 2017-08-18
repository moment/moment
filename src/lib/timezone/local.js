// import extend from '../utils/extend';
import BaseTimeZone from './base';
import extend from '../utils/extend';

function LocalTimeZone() {
}

LocalTimeZone.prototype = extend(Object.create(BaseTimeZone.prototype), {
    type: 'local',
    offsetFromTimestamp: function (uts) {
        return -(new Date(uts).getTimezoneOffset()) * 60 * 1000;
    }
});

export var localTimeZone = new LocalTimeZone();
