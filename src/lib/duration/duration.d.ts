import {MomentInput, MomentCoreSpec, Configured, Config} from '../core/core';
import {CommonUnits, Quarter, Week, UnitInput} from '../core/units';
import {MomentAddSubtractMixin} from "../moment/moment"
import {MomentLocaleMixin, MomentLocaleSpec} from '../locale/locale';
import {DurationUnitsMixin} from './units';


type DurationUnits = CommonUnits | Quarter | Week;
type DurationInput<Spec extends MomentDurationSpec>
  = Duration
  | number
  | string
  | { from: MomentInput<Spec>, to: MomentInput<Spec> }
  | UnitInput<DurationUnits>;

export interface MomentDurationSpec extends MomentCoreSpec {}
export function isMomentDurationSpec(obj: any): obj is MomentDurationSpec;

export interface MomentDurationMixin<Spec extends MomentDurationSpec> {
  duration(input: DurationInput<Spec>, units?: DurationUnits): this;
}
export const duration: Config<MomentDurationSpec>;

export interface CoreDurationSpec {}
export interface CoreDuration extends Configured<CoreDurationSpec> {
  humanize(withSuffix?: boolean): string;
  abs(): Duration;
  toISOString(): string;
  toJSON(): string;
}

export type Duration
  = CoreDuration
  & MomentAddSubtractMixin<MomentDurationSpec>
  & MomentLocaleMixin<MomentLocaleSpec>
  & DurationUnitsMixin;

