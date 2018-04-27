import { addFormatToken } from '../format/format';
import { hooks as moment } from '../utils/hooks';
import { getLocale } from '../locale/locales';

addFormatToken('N',     0, 0, 'eraAbbr');
addFormatToken('NN',    0, 0, 'eraAbbr');
addFormatToken('NNN',   0, 0, 'eraAbbr');
addFormatToken('NNNN',  0, 0, 'eraName');
addFormatToken('NNNNN', 0, 0, 'eraNarrow');

addFormatToken('y', ['y',    1], 'yo', 'eraYear');
addFormatToken('y', ['yy',   2],    0, 'eraYear');
addFormatToken('y', ['yyy',  3],    0, 'eraYear');
addFormatToken('y', ['yyyy', 4],    0, 'eraYear');

export function localeEras(m, format) {
    var i, l, date, eras = this._eras || getLocale('en')._eras;
    for (i = 0, l = eras.length; i < l; ++i) {
        switch (typeof eras[i].since) {
            case 'string':
                // truncate time
                date = moment(eras[i].since).startOf('day');
                eras[i].since = date.valueOf();
                break;
        }

        switch (typeof eras[i].until) {
            case 'undefined':
                eras[i].until = +Infinity;
                break;
            case 'string':
                // truncate time
                date = moment(eras[i].until).startOf('day').valueOf();
                eras[i].until = date.valueOf();
                break;
        }
    }
    return eras;
}

export function getEraName() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
        // truncate time
        val = this.startOf('day').valueOf();

        if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
        }
    }

    return '';
}

export function getEraNarrow() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
        // truncate time
        val = this.startOf('day').valueOf();

        if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
        }
    }

    return '';
}

export function getEraAbbr() {
    var i, l, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
        // truncate time
        val = this.startOf('day').valueOf();

        if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
        }
    }

    return '';
}

export function getEraYear() {
    var i, l, dir, val, eras = this.localeData().eras();
    for (i = 0, l = eras.length; i < l; ++i) {
        dir = eras[i].since <= eras[i].until ? +1 : -1;

        // truncate time
        val = this.startOf('day').valueOf();

        if ((eras[i].since <= val && val <= eras[i].until) || (eras[i].until <= val && val <= eras[i].since)) {
            return (this.year() - moment(eras[i].since).year()) * dir + eras[i].offset;
        }
    }

    return this.year();
}
