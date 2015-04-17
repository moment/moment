import { isValid as _isValid } from '../create/valid';
import extend from '../utils/extend';

export function isValid () {
    return _isValid(this);
}

export function parsingFlags () {
    return extend({}, this._pf);
}

export function invalidAt () {
    return this._pf.overflow;
}
