var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

export default function isDurationValid(m) {
    for (var key in m) {
        if (ordering.indexOf(key) === -1 ||
        m[key] !== undefined && isNaN(parseInt(m[key]))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== parseInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}
