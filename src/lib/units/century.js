import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';

// FORMATTING

addFormatToken('C', 0, 'Co', 'century');

// ALIASES

addUnitAlias('century', 'C');

// PRIORITY

addUnitPriority('century', 7);
