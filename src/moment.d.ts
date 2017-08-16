import {MomentCoreSpec, MomentCoreMixin, Configured, Constructor} from './lib/core/core';
import {AnyUnits, AnyUnitsMixin, CommonUnitsMixin, CommonUnitsSpec} from './lib/core/units';
import {MomentLocaleSpec, MomentLocaleMixin, LocaleSpec, Locale} from './lib/locale/locale';

import {MomentFactory} from './lib/create/create';
import {MomentDurationMixin, MomentDurationSpec} from "./lib/duration/duration";
import {
  MomentAddSubtractMixin,
  MomentAddSubtractSpec, MomentComparableMixin, MomentComparableSpec, MomentDiffableMixin,
  MomentDiffableSpec, MomentRelativeTimeMixin, MomentRelativeTimeSpec, MomentStartEndOfMixin, MomentStartEndOfSpec
} from "./lib/moment/moment";
import {MomentTimeZoneSpec, TimeZoneMixin, TimeZone} from "./lib/timezone/timezone";
import {MomentSerializationMixin, MomentSerializationSpec} from "./lib/format/format";

export type MomentSpec
  = MomentCoreSpec
  & CommonUnitsSpec
  & MomentSerializationSpec
  & MomentLocaleSpec
  & MomentDurationSpec
  & MomentTimeZoneSpec<TimeZone /* ? */>
  & MomentAddSubtractSpec
  & MomentDiffableSpec
  & MomentComparableSpec
  & MomentRelativeTimeSpec
  & MomentStartEndOfSpec;

export type Moment
  = MomentCoreMixin<MomentSpec>
  & CommonUnitsMixin<MomentSpec>
  & MomentSerializationMixin<MomentSpec>
  & AnyUnitsMixin<MomentSpec>
  & MomentLocaleMixin<MomentSpec>
  & MomentDurationMixin<MomentSpec>
  & TimeZoneMixin<MomentSpec>
  & MomentAddSubtractMixin<MomentSpec>
  & MomentDiffableMixin<MomentSpec>
  & MomentComparableMixin<MomentSpec>
  & MomentRelativeTimeMixin<MomentSpec>
  & MomentStartEndOfMixin<MomentSpec>;

declare const _Moment: Constructor<Moment>;
export const moment: MomentFactory<MomentSpec, Moment, typeof _Moment>;

export {ISO_8601, RFC_2822} from './lib/format/format';

export function defineLocale(name: string, spec: LocaleSpec): Locale;
export function updateLocale(name: string, spec: LocaleSpec): Locale;

export function normalizeUnits(units: AnyUnits): AnyUnits;
export function relativeTimeThreshold(threshold: string): number | boolean;
export function relativeTimeThreshold(threshold: string, limit: number): boolean;
export function relativeTimeRounding(fn: (num: number) => number): boolean;
export function relativeTimeRounding(): (num: number) => number;
export function calendarFormat(m: Moment, now: Moment): string;

export function setDefaultFormat(value: string): void;

export const version: string;
export const isImmutable: true;

export as namespace moment;
