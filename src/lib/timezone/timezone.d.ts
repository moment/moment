

import {Configured} from "../core/core";

export interface MomentTimeZoneSpec<T extends TimeZone> {
  _tz: T;
}

export interface TimeZoneMixin<Spec extends MomentTimeZoneSpec<any>>
    extends Configured<Spec> {
  local(): this;
  utc(): this;

  zone(): TimeZone;

  utcOffset(): number;
}

export interface TimeZone {

}
