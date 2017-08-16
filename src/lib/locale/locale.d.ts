import {Config, MomentCoreSpec, Configured, SpecInput} from '../core/core';
import {LocaleUnitsSpec, LocaleUnitsMixin} from "./units";

// Moment mixin for locales.

export interface MomentLocaleSpec {
  _locale: Locale;
}
export function isMomentLocaleSpec(obj: any): obj is MomentLocaleSpec;

/**
 * Applicable to: Moment, Duration (TODO:, Factory)
 */
export interface MomentLocaleMixin<Spec extends MomentLocaleSpec> extends Configured<Spec> {
  locale(): string;
  locale(key: string | string[]): this;

  localeData(): Locale;
}

// Locale mixins
export interface Calendar {
  sameDay   : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
  nextDay   : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
  nextWeek  : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
  lastDay   : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
  lastWeek  : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
  sameElse  : string | ((moment: Configured<MomentLocaleSpec>, now: any) => string);
}
export declare function isCalendar(obj: any): obj is Calendar;
export declare function isSameCalendar(obj1: Calendar, obj2: Calendar): boolean;
export declare const defaultCalendar: Calendar;

export interface CalendarSpec { calendar: Calendar; }
export interface CalendarLocaleMixin extends Configured<CalendarSpec> {
  calendar(key?: keyof Calendar, m?: Configured<MomentLocaleSpec>, now?: Configured<MomentLocaleSpec>): string;
}
export declare const calendar: Config<CalendarSpec>;

export interface LongDateFormat {
  readonly LTS: string;
  readonly LT: string;
  readonly L: string;
  readonly LL: string;
  readonly LLL: string;
  readonly LLLL: string;
  readonly l: string;
  readonly lt: string;
  readonly ll: string;
  readonly lll: string;
  readonly llll: string;
}
export declare function isLongDateFormat(obj: any): obj is LongDateFormat;
export declare function isSameLongDateFormat(obj: any): boolean;
export declare const defaultLongDateFormat: LongDateFormat;

export declare interface LongDateFormatSpec {
  longDateFormat: LongDateFormat;
}
export interface LongDateFormatLocaleMixin extends Configured<LongDateFormatSpec> {
  longDateFormat(key: keyof LongDateFormat): string;
}
export declare const longDateFormat: Config<LongDateFormatSpec>;

export type InvalidDate = string;
export declare function isInvalidDate(obj: any): obj is InvalidDate;
export declare function isSameInvalidDate(obj1: InvalidDate, obj2: InvalidDate): boolean;
export declare const defaultInvalidDate: InvalidDate;

export declare interface InvalidDateSpec {
  invalidDate: InvalidDate;
}
export interface InvalidDateLocaleMixin extends Configured<InvalidDateSpec> {
  invalidDate(): InvalidDate;
}
export declare const invalidDate: Config<InvalidDateSpec>;

export interface RelativeTime {
  future : string;
  past   : string;
  s      : string;
  ss     : string;
  m      : string;
  mm     : string;
  h      : string;
  hh     : string;
  d      : string;
  dd     : string;
  M      : string;
  MM     : string;
  y      : string;
  yy     : string;
}
export function isRelativeTime(obj: any): obj is RelativeTime;
export function isSameRelativeTime(obj1: RelativeTime, obj2: RelativeTime): boolean;
export const defaultRelativeTime: RelativeTime;

export interface RelativeTimeSpec {
  relativeTime: RelativeTime;
}
export interface RelativeTimeLocaleMixin extends Configured<RelativeTimeSpec> {
  relativeTime(n: number, withoutSuffix: boolean,
               key: keyof RelativeTime, isFuture: boolean): string;
  pastFuture(diff: number, absRelTime: string): string;
}
export const relativeTime: Config<RelativeTimeSpec>;

export type LocaleSpec
  = InvalidDateSpec
  & CalendarSpec
  & LongDateFormatSpec
  & RelativeTimeSpec
  & LocaleUnitsSpec;
export function isLocaleSpec(obj: any): obj is LocaleSpec;

export type Locale
  = InvalidDateLocaleMixin
  & CalendarLocaleMixin
  & LongDateFormatLocaleMixin
  & RelativeTimeLocaleMixin
  & LocaleUnitsMixin;

export function defineLocale(key: string, spec: SpecInput<LocaleSpec>): Locale;
export function updateLocale(key: string, spec: SpecInput<LocaleSpec>): Locale;
export function getSetGlobalLocale(key: string): string;

export declare function locales(): Locale[];


export const en: Locale;

