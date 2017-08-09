import BaseTimeZone from '../../lib/timezone/base';
import extend from '../../lib/utils/extend';

function DSTTimeZone(dstAt, oldOffset, newOffset) {
    BaseTimeZone.call(this);

    this.dstAt = dstAt;
    this.oldOffsetMs = oldOffset * 60 * 60 * 1000;
    this.newOffsetMs = newOffset * 60 * 60 * 1000;
}

DSTTimeZone.prototype = extend({}, BaseTimeZone.prototype);

DSTTimeZone.prototype.offsetFromTimestamp = function (utc) {
    if (utc < this.dstAt) {
        return this.oldOffsetMs;
    } else {
        return this.newOffsetMs;
    }
}

export var dstTimeZone = function (dstAt, oldOffset, newOffset) {
    return new DSTTimeZone(dstAt, oldOffset, newOffset);
}
