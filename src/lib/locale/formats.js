export var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY LT',
    LLLL : 'dddd, MMMM D, YYYY LT'
};

export function longDateFormat (key) {
    var output = this._longDateFormat[key];
    if (!output && this._longDateFormat[key.toUpperCase()]) {
        output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });
        this._longDateFormat[key] = output;
    }
    return output;
}
