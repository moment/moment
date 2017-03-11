import FixedOffsetTimeZone from '../timezone/fixed-offset';
import { createWithTimeZone } from './from-anything';

var create = createWithTimeZone(new FixedOffsetTimeZone(0));

export function createUTC () {
    return create.apply(null, arguments).utcOffset(0);
}
