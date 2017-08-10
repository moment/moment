import BaseTimeZone from './base';
import { localTimeZone } from './local';
import { fixedTimeZoneForOffset } from './fixed-offset';
import { invalidTimeZone } from './invalid';
import { parsedTimeZone } from './parsed';

export var timezones = {
    Base: BaseTimeZone,
    local: localTimeZone,
    fixedOffset: fixedTimeZoneForOffset,
    invalid: invalidTimeZone,
    parsed: parsedTimeZone
};

export function isTimeZone(obj) {
    return obj instanceof BaseTimeZone;
}
