export function valueOf () {
    return +this._d - ((this._offset || 0) * 60000);
}

export function unix () {
    return Math.floor(+this / 1000);
}

export function toDate () {
    return this._offset ? new Date(+this) : this._d;
}

export function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}
