import { createDuration } from '../duration/create';
import { createLocal } from '../create/local';
import { isMoment } from '../moment/constructor';

export function from (time, withoutSuffix, includeWeeks) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix, includeWeeks);
    } else {
        return this.localeData().invalidDate();
    }
}

export function fromNow (withoutSuffix, includeWeeks) {
    return this.from(createLocal(), withoutSuffix, includeWeeks);
}
