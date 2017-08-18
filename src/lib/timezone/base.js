import extend from '../utils/extend';

export default function BaseTimeZone() {
}

extend(BaseTimeZone.prototype, {
    type: 'base',
    isValid: function () {
        return true;
    },
    offsetFromTimestamp: function (uts) {
        return 0;
    }
});
