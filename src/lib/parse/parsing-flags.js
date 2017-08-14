export function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        input           : null,
        format          : null,
        strict          : null,
        offsetInInput   : null,
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

export default function getParsingFlags(m, refetch) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
        m._pf.input = m._i;
        m._pf.format = m._f;
        m._pf.strict = m._strict;
    }
    if (refetch) {
        m._pf.offsetInInput = m._tzm;
    }
    return m._pf;
}
