import {
  DayOfMonth, DayOfYear, Hour, Millisecond, Minute, Month, Quarter, Second, DayOfWeek,
  SecondsSinceEpoch, Week, WeekYear, Year
} from '../core/units';
import {FormatToken, ParseToken, RegexParseToken} from './format';

export interface UnitSerialization<Unit extends string> {
  readonly parseTokens: ReadonlyArray<ParseToken>;
  readonly regexParseTokens: ReadonlyArray<RegexParseToken>;

  readonly formatTokens: ReadonlyArray<FormatToken>;

  readonly priority: number;
}

export const dayOfMonth: UnitSerialization<DayOfMonth>;
export const dayOfWeek: UnitSerialization<DayOfWeek>;
export const dayOfYear: UnitSerialization<DayOfYear>;
export const hour: UnitSerialization<Hour>;
export const millisecond: UnitSerialization<Millisecond>;
export const minute: UnitSerialization<Minute>;
export const month: UnitSerialization<Month>;
export const quarter: UnitSerialization<Quarter>;
export const second: UnitSerialization<Second>;
export const timestamp: UnitSerialization<SecondsSinceEpoch>;
export const week: UnitSerialization<Week>;
export const weekYear: UnitSerialization<WeekYear>;
export const year: UnitSerialization<Year>;
