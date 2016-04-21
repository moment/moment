export default function FixedOffsetTimeZone (offset) {
    this._offset = offset;
}

FixedOffsetTimeZone.prototype.parse = function (timestamp) {
    return this._offset;
};

FixedOffsetTimeZone.prototype.abbr = function (timestamp) {
    return 'UTC';
};

FixedOffsetTimeZone.prototype.name = function (timestamp) {
    return 'Coordinated Universal Time';
};
