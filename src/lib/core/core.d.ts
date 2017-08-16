import {CommonUnitsSpec, UnitInput, CommonUnits} from './units';

export declare class Configured<T> {
  // Memoization cache.
  readonly _cache: Map<keyof T, any>;
  readonly _config: T;
}

export declare type Constructor<T extends Configured<any>>
  = new (...args: any[]) => T;

export interface Config<T> {
  isSpec(obj: any): obj is T;
  isSameSpec(obj1: T, obj2: T): boolean;
  mergeSpecs(to: T, from: Partial<T>): T;
}
export type SpecInput<T> = { [K in keyof T]?: Partial<T[K]> }

export interface MomentCoreSpec {
  readonly isAMomentObject: boolean;
  readonly d: Date;
  readonly isValid: boolean;
}
export function isMomentCoreSpec(obj: any): obj is MomentCoreSpec;

export declare interface MomentCoreMixin<Spec extends MomentCoreSpec> extends Configured<Spec> {
  clone(): this;
  isValid(): boolean;
  invalidAt(): number;
  toDate(): Date;
  inspect(): string;
  toObject(): CommonUnitsSpec;

  unix(): number;
}

export const core: Config<MomentCoreSpec>;

// FIXME: MomentInput wants to be declared at the top of the type hierarchy
//    There are a few mixin methods which accept it as an argument
//    so it needs to be declared here.
//
//    Should these be changed so that they only accept a Configured<Spec>?
//
//    Then code like
//        moment.isSame('1970-01-01T00:00:00')
//    would have to become
//        moment.isSame(moment('1970-01-01T00:00:00.000Z'))
export type MomentInput<Spec extends MomentCoreSpec>
      = Configured<Spec> | Date | number | Array<number> | UnitInput<CommonUnits> | string;
