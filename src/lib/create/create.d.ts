import {MomentCoreSpec, Configured, Constructor, SpecInput, MomentInput} from '../core/core';

import {Format, ISO_8601, RFC_2822} from '../format/format';
import {LocaleSpec, Locale} from "../locale/locale";
import {Duration, DurationInput, DurationUnits} from "../duration/duration";

/// TODO: Factory mixins. Keep consistency with existing API for now.
export interface MomentFactory<
      Spec extends MomentCoreSpec,
      Moment extends Configured<Spec>,
      Class extends Constructor<Moment>> {
  readonly _class: Class;
  _fromConfig(config: Spec): Moment;

  // TODO: Remove `localeKey` from factory methods

  (input?: MomentInput<Spec>, localeKey?: string): Moment;
  (input: string, format: Format | Format[], isStrict?: boolean): Moment;
  (input: string, format: Format | Format[], localeKey?: string, isStrict?: boolean): Moment;

  now(): Moment;

  utc(input?: MomentInput<Spec>, localeKey?: boolean): Moment;
  utc(input: string, format: Format | Format[], isStrict?: boolean): Moment;
  utc(input: string, format: Format | Format[], localeKey?: string, isStrict?: boolean): Moment;

  fixedOffset(input?: MomentInput<Spec>, localeKey?: boolean): Moment;
  fixedOffset(input: string, format: Format | Format[], isStrict?: boolean): Moment;
  fixedOffset(input: string, format: Format | Format[], localeKey?: string, isStrict?: boolean): Moment;

  unix(timestamp: number): Moment;

  invalid(): Moment;

  locale(): string;
  // TODO: Should switch locale context
  locale(name: string | string[]): string;
  locale(name: string, spec: SpecInput<LocaleSpec>): string;
  // TODO: Should be no name key on localeData.
  localeData(name: string): Locale;

  duration(input?: DurationInput<Spec>, units?: DurationUnits): Duration;

  months(): string[];
  months(index: number): string;
  months(format: string): string[];
  months(format: string, index: number): string;
  monthsShort(): string[];
  monthsShort(index: number): string;
  monthsShort(format: string): string[];
  monthsShort(format: string, index: number): string;

  weekdays(): string[];
  weekdays(index: number): string;
  weekdays(format: string): string[];
  weekdays(format: string, index: number): string;
  weekdays(localeSorted: boolean): string[];
  weekdays(localeSorted: boolean, index: number): string;
  weekdays(localeSorted: boolean, format: string): string[];
  weekdays(localeSorted: boolean, format: string, index: number): string;
  weekdaysShort(): string[];
  weekdaysShort(index: number): string;
  weekdaysShort(format: string): string[];
  weekdaysShort(format: string, index: number): string;
  weekdaysShort(localeSorted: boolean): string[];
  weekdaysShort(localeSorted: boolean, index: number): string;
  weekdaysShort(localeSorted: boolean, format: string): string[];
  weekdaysShort(localeSorted: boolean, format: string, index: number): string;
  weekdaysMin(): string[];
  weekdaysMin(index: number): string;
  weekdaysMin(format: string): string[];
  weekdaysMin(format: string, index: number): string;
  weekdaysMin(localeSorted: boolean): string[];
  weekdaysMin(localeSorted: boolean, index: number): string;
  weekdaysMin(localeSorted: boolean, format: string): string[];
  weekdaysMin(localeSorted: boolean, format: string, index: number): string;

  // TODO: Remove the following from factory. Backwards type compat for now.
  readonly RFC_2822: RFC_2822;
  readonly ISO_8601: ISO_8601;

  isMoment(obj: any): obj is Moment;
  isDate(obj: any): obj is Date;
  isDuration(obj: any): obj is Duration;

  version: string;
  defaultFormat: string;
}
