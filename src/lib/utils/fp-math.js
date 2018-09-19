// function to avoid floating point rounding errors
// https://github.com/moment/moment/issues/2978
// https://github.com/moment/moment/issues/1867
export default function fpMath(num1, symbol, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('invalid inputs: \'' + num1 + '\' \'' + num2 + '\'');
    }
    var num1Decimals = num1 % 1 === 0 ? 0 : String(num1).split('.')[1].length;
    var num2Decimals = num2 % 1 === 0 ? 0 : String(num2).split('.')[1].length;
    var int1 = Math.round(num1 * Math.pow(10, num1Decimals));
    var int2 = Math.round(num2 * Math.pow(10, num2Decimals));
    var dividend = Math.pow(10, num1Decimals + num2Decimals);
    if (symbol === '*') {
        return (int1 * int2) / dividend;
    } else if (symbol === '/') {
        dividend = Math.pow(10, Math.abs(num1Decimals - num2Decimals));
        return (int1 / int2) / dividend;
    } else if (symbol === '+' || symbol === '-') {
        int1 = Math.round(num1 * Math.pow(10, Math.max(num1Decimals, num2Decimals)));
        int2 = Math.round(num2 * Math.pow(10, Math.max(num1Decimals, num2Decimals)));
        dividend = Math.pow(10, Math.max(num1Decimals, num2Decimals));
        return (symbol === '+' ? int1 + int2 : int1 - int2) / dividend;
    } else {
        throw new Error('unknown symbol: ' + symbol);
    }
}
