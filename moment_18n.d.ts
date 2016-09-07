
// From 2.8.1 onward
locale(): string;
locale(loc: string): string;
locale(loc: string[]): string;
locale(loc: string, obj: any): string;

// Deprecated in 2.8.1
lang(): string;
lang(str: string): string;
lang(str: string[]): string;
lang(str: string, obj: any): string;

months(): string[];
months(moment: Moment): string;
monthsShort(): string[];
monthsShort(moment: Moment): string;
monthsShort(format: string): string[];
monthsShort(format: string, index: number): string;
monthsParse(longOrShortMonthString: string): number;

weekdays(): string[];
weekdays(moment: Moment): string;
weekdays(index: number): string;
weekdays(arabic: boolean, index: number): string;
weekdaysShort(): string[];
weekdaysShort(moment: Moment): string;
weekdaysMin(): string;
weekdaysMin(moment: Moment): string;
weekdaysParse(minShortOrLongWeekdayString: string): number;

longDateFormat(dateFormat:string): string;

isPM(amPmString: string): boolean;

meridiem(hours: number, minutes: number, isLower: boolean): string;
calendar(key: MomentCalendar, moment: Moment): string;
relativeTime(numb: number, withoutSuffix: boolean, key: string, isFuture: boolean): string;
pastFuture(diff: string, relTime: string): string;
preparse(str: string): string;
postformat(str: string): string;
weeks(): number;
invalidDate(): string;
firstDayOfWeek(): number;
firstDayOfYear(): number;

week(moment: Moment): number;
ordinal(numb: number): string;