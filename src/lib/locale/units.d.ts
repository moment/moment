import {Config, Configured} from '../core/core';

export interface DayOfMonthSpec {
  ordinal: string | ((input: number) => string);
  dayOfMonthOrdinalParse: RegExp;
}

export interface DayOfMonthMixin extends Configured<DayOfMonthSpec> {
  ordinal(n: number): string;
  dayOfMonthOrdinalParse(input: string): number;
}
export const dayOfMonth: Config<DayOfMonthSpec>;

export interface DayOfWeekSpec {
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
}

export interface DayOfWeekMixin extends Configured<DayOfWeekSpec> {
  weekdays(): string[];
  weekdays(m: Configured<DayOfWeekSpec>, format?: string): string;

  weekdaysMin(): this;
  weekdaysMin(m: Configured<DayOfWeekSpec>): string[];

  weekdaysShort(): this;
  weekdaysShort(m: Configured<DayOfWeekSpec>): string[];

  weekdaysParse(weekdayName: string, format: string, strict: boolean): number;
  weekdaysRegex(strict: boolean): RegExp;
  weekdaysShortRegex(strict: boolean): RegExp;
  weekdaysMinRegex(strict: boolean): RegExp;
}
export const dayOfWeek: Config<DayOfWeekSpec>;

export interface HourSpec {
  localeIsPM: (input: Configured<HourSpec>) => boolean;
  meridiemParse: RegExp;
  meridiem: (hours: number, minutes: number, isLower: boolean) => string;
}
export interface HourMixin extends Configured<HourSpec> {
  isPM(input: string): boolean;
  meridiem(hour: number, minute: number, isLower: boolean): string;
}
export const hour: Config<HourSpec>;

export interface MonthSpec {
  months: Array<string>;
  monthsShort: Array<string>;
}
export interface MonthMixin extends Configured<MonthSpec> {
  months(): string[];
  months(m: Configured<MonthSpec>, format?: string): string;
  monthsParse(monthName: string, format: string, strict: boolean): number;
  monthsRegex(strict: boolean): RegExp;
  monthsShortRegex(strict: boolean): RegExp;
}

export interface YearSpec {
  week: {dow: number, doy: number};
}

export interface YearMixin extends Configured<YearSpec> {
  week(m: Configured<YearSpec>): number;
  firstDayOfYear(): number;
  firstDayOfWeek(): number;
}
export const year: Config<YearSpec>;

export type LocaleUnitsSpec
  = DayOfMonthSpec
  & DayOfWeekSpec
  & HourSpec
  & MonthSpec
  & YearSpec;
export declare function isLocaleUnitsSpec(obj: any): obj is LocaleUnitsSpec;
export const units: Config<LocaleUnitsSpec>;

export type LocaleUnitsMixin
  = DayOfMonthMixin
  & DayOfWeekMixin
  & HourMixin
  & MonthMixin
  & YearMixin;


