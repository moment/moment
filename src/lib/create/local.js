import LocalTimeZone from '../timezone/local';
import { createWithTimeZone } from './from-anything';

export var createLocal = createWithTimeZone(new LocalTimeZone());
