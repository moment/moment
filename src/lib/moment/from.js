import { createDuration } from '../duration/create';
import { momentize, createLocal } from '../create/constructors';

export function from (time, withoutSuffix) {
    time = momentize(time);
    if (this.isValid() && time.isValid()) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

export function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}
