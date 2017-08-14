import {Configured} from '../core/core';
import {CoreDurationSpec} from './duration';

export interface DurationUnitsMixin extends Configured<CoreDurationSpec> {
  milliseconds(): number;
  asMilliseconds(): number;

  seconds(): number;
  asSeconds(): number;

  minutes(): number;
  asMinutes(): number;

  hours(): number;
  asHours(): number;

  days(): number;
  asDays(): number;

  weeks(): number;
  asWeeks(): number;

  months(): number;
  asMonths(): number;

  quarters(): number;
  asQuarters(): number;
}
