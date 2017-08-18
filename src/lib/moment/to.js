import { createDuration } from '../duration/create';
import { momentize, createLocal } from '../create/constructors';

export function to (time, withoutSuffix) {
    time = momentize(time);
    if (this.isValid() && time.isValid()) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

export function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}
