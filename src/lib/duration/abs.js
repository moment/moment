export function abs() {
    // Flipping the sign of each component independently changes the length of
    // a duration that mixes signs, e.g. 730.5 days minus 12 months would become
    // 1095.5 days. Flip all components together only when the duration as a
    // whole is negative, so the interval is preserved.
    if (this.asMilliseconds() < 0) {
        this._milliseconds = -this._milliseconds;
        this._days = -this._days;
        this._months = -this._months;
        this._bubble();
    }

    return this;
}
