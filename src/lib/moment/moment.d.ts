import {Config, Configured, MomentCoreSpec, MomentInput} from "../core/core";
import {CommonUnits, Quarter, UnitInput, ISOWeek, DayOfMonth} from '../core/units';

import {MomentDurationSpec, DurationInput, DurationUnits} from '../duration/duration';


type MomentAddSubtractSpec
    = MomentCoreSpec
    & MomentDurationSpec;

/**
 * Applicable to: Moment, Duration (TODO: , Factory)
 */
export interface MomentAddSubtractMixin<Spec extends MomentAddSubtractSpec> extends Configured<Spec> {
    add(amount?: DurationInput<MomentAddSubtractSpec>, unit?: DurationUnits): this;
    subtract(amount?: DurationInput<MomentAddSubtractSpec>, unit?: DurationUnits): this;
}
export const addSubtract: Config<MomentAddSubtractSpec>;

type MomentDiffableSpec
    = MomentCoreSpec;

/**
 * Applicable to: Moment
 */
export interface MomentDiffableMixin<Spec extends MomentDiffableSpec> extends Configured<MomentDiffableSpec> {
  /* FIXME: unknown arg */
  diff(other: MomentInput<MomentDiffableSpec>, unit?: CommonUnits | Quarter, unknownArg?: boolean): number;
}
export const diffable: Config<MomentDiffableSpec>;

type StartOfUnits = CommonUnits | Quarter | ISOWeek | DayOfMonth;

type MomentComparableSpec
    = MomentCoreSpec;

export interface MomentComparableMixin<Spec extends MomentComparableSpec> extends Configured<MomentComparableSpec> {
  isSame(other: MomentInput<Spec>, granularity?: StartOfUnits): boolean;

  isBefore(other: MomentInput<Spec>, granularity?: StartOfUnits): boolean;
  isSameOrBefore(other: MomentInput<Spec>, granularity?: StartOfUnits): boolean;

  isAfter(other: MomentInput<Spec>, granularity?: StartOfUnits): boolean;
  isSameOrAfter(other: MomentInput<Spec>, granularity?: StartOfUnits): boolean;

  isBetween(
      lower: MomentInput<Spec>,
      upper: MomentInput<Spec>,
      granularity?: StartOfUnits,
      inclusivity?: '()' | '[)' | '(]' | '[]'
  ): boolean;
}

type MomentStartEndOfSpec
    = MomentCoreSpec;
export interface MomentStartEndOfMixin<Spec extends MomentStartEndOfSpec> extends Configured<Spec> {
    startOf(unit: CommonUnits | Quarter | ISOWeek | Date): this;
    endOf(unit: CommonUnits | Quarter | ISOWeek | Date): this;
}
export const startEndOf: Config<MomentStartEndOfSpec>;

export type MomentRelativeTimeSpec
    = MomentCoreSpec
    & MomentDurationSpec;
export interface MomentRelativeTimeMixin<Spec extends MomentRelativeTimeSpec> extends Configured<Spec> {
    from(time: MomentInput<Spec>, withoutSuffix?: boolean): string;
    fromNow(withoutSuffix?: boolean): string;

    to(time: MomentInput<Spec>, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
}
export const relativeTime: Config<MomentRelativeTimeSpec>;


