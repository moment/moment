import moment from '../../moment';
import extend from '../../lib/utils/extend';

var BaseTimeZone = moment.timezone.Base;

function DSTTimeZone(args) {
    BaseTimeZone.call(this);

    this.dstAt = [];
    this.offsets = [];

    this.offsets.push(args[0] * 60 * 60 * 1000);

    for (var i = 1; i < args.length; i += 2) {
        this.dstAt.push(+args[i]);
        this.offsets.push(args[i + 1] * 60 * 60 * 1000);
    }
}

DSTTimeZone.prototype = extend(Object.create(BaseTimeZone.prototype), {
    type: 'dst-time-zone',
    offsetFromTimestamp: function (utc) {
        if (utc < this.dstAt[0]) {
            return this.offsets[0];
        }
        for (var i = 1; i < this.dstAt.length; ++i) {
            if (utc >= this.dstAt[i - 1] && utc < this.dstAt[i]) {
                return this.offsets[i];
            }
        }
        return this.offsets[this.offsets.length - 1];
    }
});

export var dstTimeZone = function () {
    return new DSTTimeZone([].slice.call(arguments));
};
