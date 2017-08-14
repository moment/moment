import {Configured, MomentCoreSpec} from '../core/core';
import {Locale, MomentLocaleSpec} from "../locale/locale";

export interface ParseFlags {
  readonly input                : number | null;
  readonly format               : number | null;
  readonly strict               : boolean | null;
  readonly offsetInInput        : number | null;
  readonly empty                : boolean;
  readonly unusedTokens         : Array<ParseToken>,
  readonly unusedInput          : Array<string>,
  readonly overflow             : number;
  readonly charsLeftOver        : number;
  readonly nullInput            : boolean;
  readonly invalidMonth         : number;
  readonly invalidFormat        : false;
  readonly userInvalidated      : boolean;
  readonly iso                  : boolean;
  readonly parsedDateParts      : Array<string>;
  readonly meridiem             : boolean | null;
  readonly rfc2822              : boolean;
  readonly weekdayMismatch      : boolean;
}

// Constant defining the moment built-in format ISO_8601
export type ISO_8601 = {readonly __formatId: 'ISO_8601'}
export declare function isISO8601Format(obj: any): obj is ISO_8601;
// Constant defining the moment built-in format RFC_2822
export type RFC_2822 = {readonly __formatId: 'RFC_2822'};
export declare function isRFC2822Format(obj: any): obj is RFC_2822;

export type Format = ISO_8601 | RFC_2822 | string;

export declare interface MomentSerializationSpec extends MomentLocaleSpec {
  _pf: ParseFlags;
}

export declare interface MomentSerializationMixin<Spec extends MomentSerializationSpec>
    extends Configured<Spec> {
  parsingFlags(): ParseFlags;
  format(formatSpec: Format): string;

  toISOString(): string;
}

export declare interface ParseToken {
  readonly key: string;
}

//FIXME: These are probably wrong.

export declare interface SimpleParseToken extends ParseToken {
  readonly callback: (input: string) => any;
}
export function addParseToken(token: SimpleParseToken): SimpleParseToken;

export declare interface WeekParseToken extends ParseToken {
  readonly _w: object;
  readonly callback: (input: string, week: any, config: any, token: any) => string;
}

export declare interface RegexParseToken {
  readonly regex: RegExp | ((isStrict: boolean, locale: Locale) => RegExp);
  readonly strictRegex: RegExp | ((isStrict: boolean, locale: Locale) => RegExp);
}
export function addRegexParseToken(token: RegexParseToken): RegexParseToken;

export declare interface FormatToken {
  readonly key: string;
  readonly padded?: [/* key */ string, /* toLength */ number, /* forcePositiveSign */ boolean];
  readonly ordinal?: () => string;
  readonly callback: () => string;
}
export declare function addFormatToken(token: FormatToken): FormatToken;
