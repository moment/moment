import { daysInMonth } from '../units/month';
import { YEAR, MONTH, DATE, HOUR, MINUTE, SECOND, MILLISECOND } from '../units/constants';

export default function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && m._pf.overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }

        m._pf.overflow = overflow;
    }

    return m;
}

