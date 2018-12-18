import { createDuration } from '../duration/create.js';
import { createLocal } from '../create/local.js';
import { isMoment } from '../moment/constructor.js';

export function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

export function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}
