import { isValid as _isValid } from '../create/valid.js';
import extend from '../utils/extend.js';
import getParsingFlags from '../create/parsing-flags.js';

export function isValid () {
    return _isValid(this);
}

export function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

export function invalidAt () {
    return getParsingFlags(this).overflow;
}
