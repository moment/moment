import extend from "../utils/extend";
import { createUTC } from "./utc";

export function isValid(m) {
    if (m._isValid == null) {
        m._isValid = !isNaN(m._d.getTime()) &&
            m._pf.overflow < 0 &&
            !m._pf.empty &&
            !m._pf.invalidMonth &&
            !m._pf.nullInput &&
            !m._pf.invalidFormat &&
            !m._pf.userInvalidated;

        if (m._strict) {
            m._isValid = m._isValid &&
                m._pf.charsLeftOver === 0 &&
                m._pf.unusedTokens.length === 0 &&
                m._pf.bigHour === undefined;
        }
    }
    return m._isValid;
}

export function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(m._pf, flags);
    }
    else {
        m._pf.userInvalidated = true;
    }

    return m;
}
