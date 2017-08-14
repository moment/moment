import {MomentCoreMixin} from "./core";

export type UnitInput<T extends string> = {[K in T]?: number};

export type Year = 'years' | 'year' | 'y';
export function isYear(obj: any): obj is Year;

export type Month = 'months' | 'month' | 'M';
export function isMonth(string: string): string is Month;

export type Week = 'weeks' | 'week' | 'w';
export function isWeek(string: any): string is Week;

export type DayOfWeek = "day" | "days" | "d";
export function isDayOfWeek(string: any): string is DayOfWeek;

export type Hour = "hour" | "hours" | "h";
export function isHour(string: any): string is Hour;

export type Minute = "minute" | "minutes" | "m";
export function isMinute(string: any): string is Minute;

export type Millisecond = "millisecond" | "milliseconds" | "ms";
export function isMillisecond(string: any): string is Millisecond;

export type Second = "second" | "seconds" | "s";
export function isSecond(string: any): string is Second;

export type Quarter = "quarter" | "quarters" | "Q";
export function isQuarter(string: any): string is Quarter;

export type ISOWeek = "isoWeek" | "isoWeeks" | "W";
export function isISOWeek(string: any): string is ISOWeek;

export type DayOfMonth = "date" | "dates" | "D";
export function isDate(string: any): string is Date;

export type WeekYear = "weekYear" | "weekYears" | "gg";
export function isWeekYear(string: any): string is WeekYear;

export type ISOWeekYear = "isoWeekYear" | "isoWeekYears" | "GG";
export function isISOWeekYEar(string: any): string is ISOWeekYear;

export type DayOfYear = "dayOfYear" | "dayOfYears" | "DDD";
export function isDayOfYear(string: any): string is DayOfYear;

export type ISODayOfWeek = "isoWeekday" | "isoWeekdays" | "E";
export function isISOWeekDay(string: any): string is ISODayOfWeek;

// TODO: Investigate: Does moment consider a unix timestamp to be milliseconds since epoch?
export type SecondsSinceEpoch = 'secondsSinceEpoch' | 'secondsSinceEpoch' | 'x';
export function isSecondsSinceEpoch(obj: any): obj is SecondsSinceEpoch

export type CommonUnits = Year | Month | Week | DayOfWeek | DayOfMonth | Hour | Minute | Second | Millisecond;
export function isCommonUnit(obj: any): obj is CommonUnits;

export interface CommonUnitsSpec {
  years: number,
  months: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
}

/**
 * Mixin applies to: Moment
 */
export interface CommonUnitsMixin<Spec extends CommonUnitsSpec> {
  year(): number;
  year(value: number): this;
  isLeapYear(): boolean;

  years(): number;
  years(value: number): this;

  month(): number;
  month(value: number | string): this;

  months(): number;
  months(value: number | string): this;

  date(): number;
  date(value: number): this;

  day(): number;
  day(value: number | string): this;

  days(): number;
  days(value: number | string): this;

  daysInMonth(): number;

  hour(): number;
  hour(value: number): this;

  hours(): number;
  hours(value: number): this;

  minute(): number;
  minute(value: number): this;

  minutes(): number;
  minutes(value: number): this;

  second(): number;
  second(value: number): this;

  seconds(): number;
  seconds(value: number): this;

  milliseconds(): number;
  milliseconds(value: number): this;

  set(key: CommonUnits, value: any): this;
  set(input: UnitInput<CommonUnits>): this;
}

// TODO: Is it worth the effort to componentize non-core units?
export type AnyUnits
  = CommonUnits
  | Quarter
  | ISOWeek
  | DayOfMonth
  | WeekYear
  | ISOWeekYear
  | DayOfYear
  | ISODayOfWeek
  | SecondsSinceEpoch;
export function isUnit(obj: any): obj is AnyUnits;

// These need to be split in order to componentize units
export interface AnyUnitsMixin<T extends CommonUnitsSpec> {
  quarter(): number;
  quarter(value: number): this;

  weekday(): number;
  weekday(value: number): this;

  isoWeekday(): number;
  isoWeekday(value: number): this;

  weekYear(): number;
  weekYear(value: number): this;

  isoWeekYear(): number;
  isoWeekYear(value: number): this;

  week(): number;
  week(value: number): this;

  weeks(): number;
  weeks(value: number): this;

  isoWeek(): number;
  isoWeek(value: number): this;

  isoWeeks(): number;
  isoWeeks(value: number): this;

  dayOfYear(): number;
  dayOfYear(value: number): this;

  set(key: AnyUnits, value: any): this;
  set(input: UnitInput<AnyUnits>): this;
}
