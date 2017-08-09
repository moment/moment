import isFunction from '../utils/is-function';

export function Locale(name, config) {
    if (!config)
        return;

    for (let key of Object.keys(config)) {
        let prop = config[key];
        if (isFunction(prop)) {
            this[key] = prop;
        } else {
            this['_' + key] = prop;
        }
    }
    this._abbr = name;
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}
