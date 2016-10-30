import { set } from './set';

export function Locale(config) {
    if (config != null) {
        set.call(this, config);
    }
}
