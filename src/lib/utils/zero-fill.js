export default function zeroFill(number, targetLength, forceSign) {
    var output = '' + Math.abs(number),
        sign = number >= 0;

    while (output.length < targetLength) {
        output = '0' + output;
    }
    return (sign ? (forceSign ? '+' : '') : '-') + output;
}
