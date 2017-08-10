import hasOwnProp from '../utils/has-own-prop';
import BaseTimeZone from './base';
import { invalidTimeZone } from './invalid';
import { matchShortOffset } from '../parse/regex';
import isNumber from '../utils/is-number';
import { offsetFromString } from '../units/offset';
import extend from '../utils/extend';

function FixedOffsetTimeZone(offset) {
    this._offset = offset;
    this._offsetMs = offset * 60 * 1000;
}

FixedOffsetTimeZone.prototype = extend(Object.create(BaseTimeZone.prototype), {
    type: 'fixed-offset',
    offsetFromTimestamp: function (uts) {
        return this._offsetMs;
    },
    offset: function () {
        return this._offset;
    }
});

export function fixedTimeZoneForOffset(offset) {
    var off = null;
    if (offset == null || isNaN(offset)) {
        off = null;
    } else if (isNumber(offset)) {
        off = offset;
    } else {
        off = offsetFromString(matchShortOffset, offset);
    }

    return off == null || isNaN(off) ? invalidTimeZone :  fromOffsetMemo(off);
}

var memo = {};
function fromOffsetMemo(off) {
    // only memorize a fixed numbe of offsets
    if (-16 * 60 <= off && off <= 16 * 60 && off % 30 === 0) {
        if (!hasOwnProp(memo, off)) {
            memo[off] = new FixedOffsetTimeZone(off);
        }
        return memo[off];
    }
    return new FixedOffsetTimeZone(off);
}
