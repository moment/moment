import { addFormatToken } from '../format/format';

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

export function getZoneAbbr () {
    return this._z.abbr(+this);
}

export function getZoneName () {
    return typeof this._z.name === 'function' ? this._z.name(+this) : this._z.abbr();
}
