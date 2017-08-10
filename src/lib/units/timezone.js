import { addFormatToken } from '../format/format';
import { changeTimezone } from './offset';

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

// TODO(Iskren): use _tz provided functions
export function getZoneAbbr () {
    return this._tz.type === 'fixed-offset' && this._tz.offset() === 0 ? 'UTC' : '';
}

// TODO(Iskren): use _tz provided functions
export function getZoneName () {
    return this._tz.type === 'fixed-offset' && this._tz.offset() === 0 ? 'Coordinated Universal Time' : '';
}

export function getSetZoneData (input) {
    if (input == null) {
        return this._tz;
    } else {
        return changeTimezone(this, input);
    }
}
