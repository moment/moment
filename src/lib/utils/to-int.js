export default function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        if (coercedNumber >= 0) {
            value = Math.floor(coercedNumber);
        } else {
            value = Math.ceil(coercedNumber);
        }
    }

    return value;
}
