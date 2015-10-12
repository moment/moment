import { createLocal } from '../create/local';

export function age (now) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }
    var date = this.clone().startOf('d').hour(12);
    var today = createLocal(now).startOf('d').hour(12);
    var years = today.year() - date.year();
    if (date.add(years, 'y').isBefore(today)) {
        years--;
    }
    return years;
}
