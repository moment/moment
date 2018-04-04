import { Moment } from './constructor.js';

export function clone () {
    return new Moment(this);
}
