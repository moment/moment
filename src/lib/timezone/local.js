export default function LocalTimeZone () {}

function getTimezoneOffset (date) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(date.getTimezoneOffset() / 15) * 15;
}

LocalTimeZone.prototype.parse = function (timestamp) {
    var asUtc = new Date(timestamp);
    return getTimezoneOffset(new Date(
        asUtc.getUTCFullYear(),
        asUtc.getUTCMonth(),
        asUtc.getUTCDate(),
        asUtc.getUTCHours(),
        asUtc.getUTCMinutes(),
        asUtc.getUTCSeconds(),
        asUtc.getUTCMilliseconds()
    ));
};

LocalTimeZone.prototype.abbr = function (timestamp) {
    return '';
};
