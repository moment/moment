import { Locale } from './constructor';
import {mergeLocaleConfigs} from './config';

export function set (config) {
    return new Locale(mergeLocaleConfigs(this._config, config));
}

