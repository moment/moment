export default function isDurationValid(m) {
    for (var key in m) {
        if (['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'].indexOf(key) === -1 ||
        m[key] !== undefined && isNaN(parseInt(m[key]))) {
            return false;
        }
    }
    return true;
}
