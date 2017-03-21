import { Duration } from './constructor';

var mathAbs = Math.abs;

export function abs () {
    if (!this.isValid()) {
        return this;
    }
    return new Duration({
        ms: mathAbs(this._milliseconds),
        d:  mathAbs(this._days),
        M:  mathAbs(this._months)
    });
}
