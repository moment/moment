function LocalTimeZone() {
}

LocalTimeZone.prototype.offsetFromTimestamp = function (uts) {
    return -(new Date(uts).getTimezoneOffset()) * 60 * 1000;
};

LocalTimeZone.prototype.type = 'local';

export var localTimeZone = new LocalTimeZone();
