import { formatMoment } from '../format/format';

export function MLA() {
    return this.format("D MMM[.] YYYY");
}

export function APA() {
    return this.format("YYYY[,] MMMM D");
}