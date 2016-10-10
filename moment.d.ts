declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;

// TODO(Iskren): Delete
// declare function moment(date: number): moment.Moment;
// declare function moment(date: string): moment.Moment;
// declare function moment(date: (number | string)[]): moment.Moment;
// declare function moment(date: string, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
// declare function moment(date: string, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;
// declare function moment(date: Date): moment.Moment;
// declare function moment(date: moment.Moment): moment.Moment;
// declare function moment(date: moment.MomentInputObject): moment.Moment;

declare namespace moment {
  type formatFunction = () => string;

  interface MomentDateObject {
    years?: number;
    /* One digit */
    months?: number;
    /* Day of the month */
    date?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  }

  interface MomentLanguageData extends BaseMomentLanguage {
    /**
    * @param formatType should be L, LL, LLL, LLLL.
    */
    longDateFormat(formatType: string): string;
  }

  interface Duration {
    humanize(withSuffix?: boolean): string;

    abs(): Duration;

    as(units: unitOfTime.Base): number;
    get(units: unitOfTime.Base): number;

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

    years(): number;
    asYears(): number;

    add(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;
    subtract(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;

    locale(): string;
    locale(locale: LocaleSpecifier): Duration;
    localeData(): Locale;

    toISOString(): string;
    toJSON(): string;

    // Deprecated as of 2.8.0.
    lang(locale: LocaleSpecifier): Moment;
    // Deprecated as of 2.8.0.
    lang(): Locale;
    // Deprecated
    toIsoString(): string;
  }

  interface MomentInput {
    /** Year */
    years?: number;
    /** Year */
    year?: number;
    /** Year */
    y?: number;

    /** Month */
    months?: number;
    /** Month */
    month?: number;
    /** Month */
    M?: number;

    /** Week */
    weeks?: number;
    /** Week */
    week?: number;
    /** Week */
    w?: number;

    /** Day/Date */
    days?: number;
    /** Day/Date */
    day?: number;
    /** Day/Date */
    date?: number;
    /** Day/Date */
    d?: number;

    /** Hour */
    hours?: number;
    /** Hour */
    hour?: number;
    /** Hour */
    h?: number;

    /** Minute */
    minutes?: number;
    /** Minute */
    minute?: number;
    /** Minute */
    m?: number;

    /** Second */
    seconds?: number;
    /** Second */
    second?: number;
    /** Second */
    s?: number;

    /** Millisecond */
    milliseconds?: number;
    /** Millisecond */
    millisecond?: number;
    /** Millisecond */
    ms?: number;
  }

  interface MomentCalendar {
    lastDay?: string | formatFunction;
    sameDay?: string | formatFunction;
    nextDay?: string | formatFunction;
    lastWeek?: string | formatFunction;
    nextWeek?: string | formatFunction;
    sameElse?: string | formatFunction;
  }

  interface MomentRelativeTime {
    future: any;
    past: any;
    s: any;
    m: any;
    mm: any;
    h: any;
    hh: any;
    d: any;
    dd: any;
    M: any;
    MM: any;
    y: any;
    yy: any;
  }

  interface MomentLongDateFormat {
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    LT: string;
    LTS: string;
    l?: string;
    ll?: string;
    lll?: string;
    llll?: string;
    lt?: string;
    lts?: string;
  }

  interface MomentParsingFlags {
    empty: boolean;
    unusedTokens: string[];
    unusedInput: string[];
    overflow: number;
    charsLeftOver: number;
    nullInput: boolean;
    invalidMonth?: string;
    invalidFormat: boolean;
    userInvalidated: boolean;
    iso: boolean;
    parsedDateParts: any[];
    meridiem?: string;
  }

  interface MomentParsingFlagsOpt {
    empty?: boolean;
    unusedTokens?: string[];
    unusedInput?: string[];
    overflow?: number;
    charsLeftOver?: number;
    nullInput?: boolean;
    invalidMonth?: string;
    invalidFormat?: boolean;
    userInvalidated?: boolean;
    iso?: boolean;
    parsedDateParts?: any[];
    meridiem?: string;
  }

  interface BaseMomentLanguage {
    months?: any;
    monthsShort?: any;
    weekdays?: any;
    weekdaysShort?: any;
    weekdaysMin?: any;
    relativeTime?: MomentRelativeTime;
    meridiem?: (hour: number, minute: number, isLowercase: boolean) => string;
    calendar?: MomentCalendar;
    ordinal?: (num: number) => string;
    week?: MomentLanguageWeek;
  }

  interface MomentLanguage extends BaseMomentLanguage {
    longDateFormat?: MomentLongDateFormat;
  }

  interface MomentLanguageWeek {
    dow?: number;
    doy?: number;
  }

  interface MomentBuiltinFormat {
    __momentBuiltinFormatBrand: any;
  }

  type MomentFormatSpecification = string | MomentBuiltinFormat | (string | MomentBuiltinFormat)[];

  // type UnitOfTime = ("year" | "years" | "y" |
  //             "quarter" | "quarters" | "Q" |
  //             "month" | "months" | "M" |
  //             "week" | "weeks" | "w" |
  //             "date" | "dates" | "d" |
  //             "day" | "days" |
  //             "hour" | "hours" | "h" |
  //             "minute" | "minutes" | "m" |
  //             "second" | "seconds" | "s" |
  //             "millisecond" | "milliseconds" | "ms");

  namespace unitOfTime {
    // TODO(Iskren): All the aliases
    type Base = (
      "year" |
      "month" |
      "week" |
      "day" |
      "hour" |
      "minute" |
      "second" |
      "millisecond"
    );

    type DurationConstructor = Base | "quarter";

    type DurationAs = Base;

    type StartOf = Base | "quarter" | "isoWeek" | "date";

    type Diff = Base | "quarter";

    type MomentConstructor = Base | "date";

    type All = Base | "weekYear" | "isoWeekYear" | "quarter" | "isoWeek" | "date" | "dayOfYear" | "weekday" | "isoWeekday";
  }

  // TODO(Iskren): All the aliases
  interface MomentInputObject {
    year?: number;
    month?: number;
    day?: number;
    date?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  }

  // TODO(Iskren): All the aliases
  interface DurationInputObject extends MomentInputObject {
    quarter?: number;
  }

  // TODO(Iskren): All the aliases
  interface MomentSetObject extends MomentInputObject {
    weekYear?: number;
    isoWeekYear?: number;
    quarter?: number;
    isoWeek?: number;
    date?: number;
    dayOfYear?: number;
    weekday?: number;
    isoWeekday?: number;
  }

  type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject;
  type DurationInputArg1 = Duration | number | string | FromTo | DurationInputObject;
  type DurationInputArg2 = unitOfTime.DurationConstructor;
  type LocaleSpecifier = string | Moment | Duration | string[];


  interface MomentCreationData {
    input: string;
    format: string;
    locale: MomentLocale;
    isUTC: boolean;
    strict: boolean;
  }

  interface MomentLocale  {
    // Details about the locale structure are not in the documentation so they are omitted here.
  }

  interface Moment {
    format(format?: string): string;

    startOf(unitOfTime: unitOfTime.StartOf): Moment;
    endOf(unitOfTime: unitOfTime.StartOf): Moment;

    // /**
    // * Mutates the original moment by adding time. (deprecated in 2.8.0)
    // *
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // * @param amount the amount you want to add
    // */
    // add(unitOfTime: UnitOfTime, amount: number): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // */
    // add(amount: number, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by adding time. Note that the order of arguments can be flipped.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // */
    // add(amount: string, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
    // */
    // add(objectLiteral: MomentInput): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param duration a length of time
    // */
    // add(duration: Duration): Moment;

    add(amount?: DurationInputArg1, unit?: DurationInputArg2) : Moment;
    /**
     * deprecated: reversed syntax
     */
    add(unit: unitOfTime.DurationConstructor, amount: number|string) : Moment;


    // /**
    // * Mutates the original moment by subtracting time. (deprecated in 2.8.0)
    // *
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // * @param amount the amount you want to subtract
    // */
    // subtract(unitOfTime: UnitOfTime, amount: number): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // * @param amount the amount you want to subtract
    // */
    // subtract(amount: number, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by subtracting time. Note that the order of arguments can be flipped.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // */
    // subtract(amount: string, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
    // */
    // subtract(objectLiteral: MomentInput): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param duration a length of time
    // */
    // subtract(duration: Duration): Moment;
    subtract(amount?: DurationInputArg1, unit?: DurationInputArg2) : Moment;
    /**
     * deprecated: reversed syntax
     */
    subtract(unit: unitOfTime.DurationConstructor, amount: number|string) : Moment;

    calendar(): string;
    calendar(start: Moment): string;
    calendar(start: Moment, formats: MomentCalendar): string;

    clone(): Moment;

    /**
    * @return Unix timestamp, or milliseconds since the epoch.
    */
    valueOf(): number;

    local(keepLocalTime?: boolean): Moment; // current date/time in local mode
    isLocal(): boolean;

    utc(keepLocalTime?: boolean): Moment; // current date/time in UTC mode
    isUTC(): boolean;
    // deprecated
    isUtc(): boolean;

    parseZone(): Moment;
    isValid(): boolean;
    invalidAt(): number;

    hasAlignedHourOffset(other?: MomentInput): boolean;

    creationData(): MomentCreationData;
    parsingFlags(): MomentParsingFlags;

    year(y: number): Moment;
    year(): number;
    // deprecated
    years(y: number): Moment;
    // deprecated
    years(): number;
    quarter(): number;
    quarter(q: number): Moment;
    quarters(): number;
    quarters(q: number): Moment;
    month(M: number): Moment;
    month(M: string): Moment;
    month(): number;
    // deprecated
    months(M: number): Moment;
    // deprecated
    months(M: string): Moment;
    // deprecated
    months(): number;
    day(d: number): Moment;
    day(d: string): Moment;
    day(): number;
    days(d: number): Moment;
    days(d: string): Moment;
    days(): number;
    date(d: number): Moment;
    date(): number;
    // deprecated
    dates(d: number): Moment;
    // deprecated
    dates(): number;
    hour(h: number): Moment;
    hour(): number;
    hours(h: number): Moment;
    hours(): number;
    minute(m: number): Moment;
    minute(): number;
    minutes(m: number): Moment;
    minutes(): number;
    second(s: number): Moment;
    second(): number;
    seconds(s: number): Moment;
    seconds(): number;
    millisecond(ms: number): Moment;
    millisecond(): number;
    milliseconds(ms: number): Moment;
    milliseconds(): number;
    weekday(): number;
    weekday(d: number): Moment;
    isoWeekday(): number;
    isoWeekday(d: number): Moment;
    isoWeekday(d: string): Moment;
    weekYear(): number;
    weekYear(d: number): Moment;
    isoWeekYear(): number;
    isoWeekYear(d: number): Moment;
    week(): number;
    week(d: number): Moment;
    weeks(): number;
    weeks(d: number): Moment;
    isoWeek(): number;
    isoWeek(d: number): Moment;
    isoWeeks(): number;
    isoWeeks(d: number): Moment;
    weeksInYear(): number;
    isoWeeksInYear(): number;
    dayOfYear(): number;
    dayOfYear(d: number): Moment;

    from(inp: MomentInput, suffix?: boolean): string;
    to(inp: MomentInput, suffix?: boolean): string;
    fromNow(withoutSuffix?: boolean): string;
    toNow(withoutPrefix?: boolean): string;


    diff(b: MomentInput, unitOfTime?: unitOfTime.Diff, precise?: boolean): number;

    toArray(): number[];
    toDate(): Date;
    toISOString(): string;
    toJSON(): string;
    unix(): number;

    isLeapYear(): boolean;
    zone(): number;
    zone(b: number): Moment;
    zone(b: string): Moment;
    utcOffset(): number;
    utcOffset(b: number, keepLocalTime?: boolean): Moment;
    utcOffset(b: string, keepLocalTime?: boolean): Moment;
    isUTCOffset(): boolean;
    daysInMonth(): number;
    isDST(): boolean;

    zoneAbbr(): string;
    zoneName(): string;

    isBefore(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isAfter(inp?: MomentInput, granularity? unitOfTime.StartOf): boolean;
    isSame(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isSameOrAfter(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isSameOrBefore(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isBetween(a: MomentInput, b: MomentInput, granularity?: unitOfTime.StartOf, inclusivity?: "()" | "[)" | "(]" | "[]"): boolean;

    // Deprecated as of 2.8.0.
    lang(language: LocaleSpecifier): Moment;
    // Deprecated as of 2.8.0.
    lang(): Locale;

    locale(): string;
    locale(locale: LocaleSpecifier): Moment;

    localeData(): Locale;

    // deprecated
    isDSTShifted(): boolean;

    //defineLocale(language: string, locale: MomentLanguage): MomentLanguage;
    //updateLocale(language: string, locale: MomentLanguage): MomentLanguage;

    // Deprecated as of 2.7.0.
    // TODO(Iskren): Copy constructor
    max(date: Moment | string | number | Date | any[]): Moment;
    max(date: string, format: string): Moment;

    // Deprecated as of 2.7.0.
    // TODO(Iskren): Copy constructor
    min(date: Moment | string | number | Date | any[]): Moment;
    min(date: string, format: string): Moment;

    get(unit: unitOfTime.All): number;
    set(unit: unitOfTime.All, value: number): Moment;
    set(objectLiteral: MomentSetObject): Moment;

    /*This returns an object containing year, month, day-of-month, hour, minute, seconds, milliseconds.*/
    //Works with version 2.10.5+
    toObject(): MomentDateObject;
  }

  export var version: string;
  export var fn: Moment;

  // TODO(Iskren): Make same as moment constructor
  export function utc(): Moment;
  export function utc(date: number): Moment;
  export function utc(date: number[]): Moment;
  export function utc(date: string, format?: string, strict?: boolean): Moment;
  export function utc(date: string, format?: string, language?: string, strict?: boolean): Moment;
  export function utc(date: string, formats: string[], strict?: boolean): Moment;
  export function utc(date: string, formats: string[], language?: string, strict?: boolean): Moment;
  export function utc(date: Date): Moment;
  export function utc(date: Moment): Moment;
  export function utc(date: Object): Moment;

  export function unix(timestamp: number): Moment;

  export function invalid(flags?: MomentParsingFlagsOpt): Moment;
  export function isMoment(m: any): m is Moment;
  export function isDate(m: any): m is Date;
  export function isDuration(d: any): d is Duration;

  // Deprecated in 2.8.0.
  export function lang(language?: string): string;
  export function lang(language?: string, definition?: MomentLanguage): string;

  export function locale(language?: string): string;
  export function locale(language?: string[]): string;
  export function locale(language?: string, definition?: MomentLanguage): string;

  export function localeData(key?: string | string[]): Locale;

  export function updateLocale(language: string, locale: MomentLanguage): MomentLanguage;

  export var longDateFormat: any;
  export var relativeTime: any;
  export var meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  export var calendar: any;
  export var ordinal: (num: number) => string;

  export function duration(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;

  // export function duration(milliseconds: Number): Duration;
  // export function duration(num: Number, unitOfTime: UnitOfTime): Duration;
  // export function duration(input: MomentInput): Duration;
  // export function duration(object: any): Duration;
  // export function duration(): Duration;

  // TODO(Iskren): Make same as moment constructor
  export function parseZone(date: string): Moment;

  export function months(): string[];
  export function months(index: number): string;
  export function months(format: string): string[];
  export function months(format: string, index: number): string;
  export function monthsShort(): string[];
  export function monthsShort(index: number): string;
  export function monthsShort(format: string): string[];
  export function monthsShort(format: string, index: number): string;

  export function weekdays(): string[];
  export function weekdays(index: number): string;
  export function weekdays(format: string): string[];
  export function weekdays(format: string, index: number): string;
  export function weekdays(localeSorted: boolean): string[];
  export function weekdays(localeSorted: boolean, index: number): string;
  export function weekdays(localeSorted: boolean, format: string): string[];
  export function weekdays(localeSorted: boolean, format: string, index: number): string;
  export function weekdaysShort(): string[];
  export function weekdaysShort(index: number): string;
  export function weekdaysShort(format: string): string[];
  export function weekdaysShort(format: string, index: number): string;
  export function weekdaysShort(localeSorted: boolean): string[];
  export function weekdaysShort(localeSorted: boolean, index: number): string;
  export function weekdaysShort(localeSorted: boolean, format: string): string[];
  export function weekdaysShort(localeSorted: boolean, format: string, index: number): string;
  export function weekdaysMin(): string[];
  export function weekdaysMin(index: number): string;
  export function weekdaysMin(format: string): string[];
  export function weekdaysMin(format: string, index: number): string;
  export function weekdaysMin(localeSorted: boolean): string[];
  export function weekdaysMin(localeSorted: boolean, index: number): string;
  export function weekdaysMin(localeSorted: boolean, format: string): string[];
  export function weekdaysMin(localeSorted: boolean, format: string, index: number): string;

  export function min(...moments: MomentInput[]): Moment;
  export function max(...moments: MomentInput[]): Moment;

  /**
   * Returns the current time in milliseconds since epoch. Overwrite for
   * profit.
   */
  export function now(): number;

  export function defineLocale(language: string, localeSpec: LocaleSpec): Locale;
  export function updateLocale(language: string, localeSpec: LocaleSpec): Locale;

  export function locales(): string[];

  export function normalizeUnits(unit: unitOfTime.All): string;
  export function relativeTimeThreshold(threshold: string): number | boolean;
  export function relativeTimeThreshold(threshold: string, limit: number): boolean;
  export function relativeTimeRounding(fn: (num: number) => number): boolean;
  export function relativeTimeRounding(): (num: number) => number;
  export function calendarFormat(m: Moment, now: Moment): string;

  /**
  * Constant used to enable explicit ISO_8601 format parsing.
  */
  export var ISO_8601: MomentBuiltinFormat;

  export var defaultFormat: string;
  export var defaultFormatUtc: string;
}

export = moment;
