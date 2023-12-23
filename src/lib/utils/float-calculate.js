export default function multiply(a, b) {
    var bi1 = toBigInt(parseFloat(a)),
        bi2 = toBigInt(parseFloat(b)),
        mag1 = bi1.magnification,
        mag2 = bi2.magnification,
        num1 = bi1.num,
        num2 = bi2.num;
    return (num1 * num2) / (mag1 * mag2);
}

function toBigInt(floatNum) {
    var bigInt = {
            num: 0,
            magnification: 1,
        },
        strNum,
        len,
        mag,
        intNum;

    if (Math.floor(floatNum) === floatNum) {
        bigInt.num = floatNum;
        return bigInt;
    }

    strNum = floatNum.toString();
    len = strNum.length - strNum.indexOf('.') - 1;
    mag = Math.pow(10, len);
    intNum = Number(floatNum.toString().replace('.', ''));
    bigInt.num = intNum;
    bigInt.magnification = mag;
    return bigInt;
}
