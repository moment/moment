export function createDate (y, m, d, h, M, s, ms) {
    var date;
    // the date constructor remaps years 0-99 to 1900-1999
    var remapYears = (y < 100 && y >= 0);
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    if (arguments.length === 3) {
        // Special-case: handles dates that don't start at midnight
        date = new Date(remapYears ? y + 400 : y, m, d);
    } else {
        date = new Date(remapYears ? y + 400 : y, m, d, h, M, s, ms);
    }

    if (remapYears && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }

    return date;
}

export function createUTCDate (y) {
    var date;
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = y + 400;
        date = new Date(Date.UTC.apply(null, args));
        if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
    } else {
        date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
}
