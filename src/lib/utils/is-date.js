export default function isDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}
