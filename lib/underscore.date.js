// Underscore.date
//
// (c) 2011 Tim Wood
// Underscore.date is freely distributable under the terms of the MIT license.
//
// Version 0.2.0

/*global _:false */


(function(Date, _, undefined){
    // assign variables here so they can be overwritten for i18n or customization
	var self = this, _d,
		wordsMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		wordsWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		wordsTimeAgo = {
			future: "in %s",
			past: "%s ago",
			S: "less than a minute",
			m: "about a minute",
			M: "%d minutes",
			h: "about an hour",
			H: "about %d hours",
			d: "a day",
			D: "%d days",
			l: "about a month",
			L: "%d months",
			y: "about a year",
			Y: "%d years"
		};
	
	// add ordinal to number
	function createOrdinal(number) {
		return ((number / 10 | 0) === 1) ? 'th' :
			(number % 10 === 1) ? 'st' :
			(number % 10 === 2) ? 'nd' :
			(number % 10 === 3) ? 'rd' : 'th';
	}
		
	// left zero fill a number
	function leftZeroFill(number, targetLength) {
		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	}
	
	// add zero fill and ordinal to number
	function zeroFillAndOrdinal(number, zerofill, ordinal) {
		var output = zerofill ? leftZeroFill(number, zerofill) : number;
		return ordinal ? output + createOrdinal(number) : output;
	}
	
	// Date.prototype.humanize
	function humanize(inputString) {
		// shortcuts to this and getting time functions
		// done to save bytes in minification
		var self = this,
			currentMonth = self.getMonth(),
			currentDate = self.getDate(),
			currentYear = self.getFullYear(),
			currentDay = self.getDay(),
			currentHours = self.getHours(),
			currentMinutes = self.getMinutes(),
			currentSeconds = self.getSeconds(),
			charactersToReplace = /[a-z][0-9]?/gi,
			formatFunctions = {
				// MONTH 
				// number 
				L : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentMonth + 1, zerofill ? 2 : 0, ordinal);
				},
				// string 
				l : function(shorthand) {
					var output = wordsMonths[currentMonth];
					return shorthand ? output.slice(0, 3) : output;
					
				},
				
				// DAY OF MONTH
				// number
				D : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentDate, zerofill ? 2 : 0, ordinal);
				},
				
				// DAY OF YEAR
				// number
				d : function(ordinal, zerofill) {
					var a = new Date(currentYear, currentMonth, currentDate),
						b = new Date(currentYear, 0, 1);
					return zeroFillAndOrdinal(((a - b) / 864e5) + 1.5 | 0, zerofill ? 3 : 0, ordinal);
				},
				
				// WEEKDAY
				// number
				W : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentDay, zerofill ? 2 : 0, ordinal);
				},
				// string
				w : function(shorthand) {
					var output = wordsWeekdays[currentDay];
					return shorthand ? output.slice(0, 3) : output;
				},
				
				// WEEK OF YEAR
				K : function(ordinal, zerofill) {
					var a = new Date(currentYear, currentMonth, currentDate - currentDay + 5),
						b = new Date(a.getFullYear(), 0, 4);
					return zeroFillAndOrdinal((a - b) / 864e5 / 7 + 1.5 | 0, zerofill ? 2 : 0, ordinal);
				},
				
				// YEAR
				Y : function(shorthand) {
					return shorthand ? (currentYear + '').slice(-2) : currentYear;
				},
				
				// AM / PM
				a : function() {
					return currentHours > 11 ? 'pm' : 'am';
				},
				A : function() {
					return currentHours > 11 ? 'PM' : 'AM';
				},
				
				// HOUR 
				// 24
				H : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentHours, zerofill ? 2 : 0, ordinal);
				},
				// 12
				h : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentHours % 12 || 12, zerofill ? 2 : 0, ordinal);
				},
				
				// MINUTE
				m : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentMinutes, zerofill ? 2 : 0, ordinal);
				},
				
				// SECOND
				s : function(ordinal, zerofill) {
					return zeroFillAndOrdinal(currentSeconds, zerofill ? 2 : 0, ordinal);
				}
			};
		
		// check if the character is a format
		// return formatted string or non string.
		function replaceFunction(input) {
			var character = input.charAt(0),
				parameter = input.charAt(1) || 0;
			return formatFunctions[character] ? formatFunctions[character](parameter & 1, parameter >> 1) : input;
		}
		
		return inputString.replace(charactersToReplace, replaceFunction);
	}
	
	/*
	 * Underscore mixins
	 */
	function makeInputMilliseconds(input){
		return input === undefined ? _d.now(true) :
			input instanceof Date ? input.getTime() : input;
	}
	
	function substituteTimeAgo(string, number) {
        return wordsTimeAgo[string].replace(/%d/i, number || 1);
    }
	
	_d = {
		now : function(asTimestamp) {
			return asTimestamp ? new Date().getTime() : new Date();
		},
		relativetime : function(milliseconds) {
			var seconds = Math.abs(makeInputMilliseconds(milliseconds)) / 1000,
				minutes = seconds / 60,
				hours = minutes / 60,
				days = hours / 24,
				years = days / 365;
			return seconds < 45 && substituteTimeAgo('S', seconds | 0) ||
				seconds < 90 && substituteTimeAgo('m') ||
				minutes < 45 && substituteTimeAgo('M', minutes | 0) ||
				minutes < 90 && substituteTimeAgo('h') ||
				hours < 24 && substituteTimeAgo('H', hours | 0) ||
				hours < 48 && substituteTimeAgo('d') ||
				days < 30 && substituteTimeAgo('D', days | 0) ||
				days < 60 && substituteTimeAgo('l') ||
				days < 350 && substituteTimeAgo('L', days / 30 | 0) ||
				years < 2 && substituteTimeAgo('y') ||
				substituteTimeAgo('Y', years | 0);
		},
		msapart : function(time, now) {
			return makeInputMilliseconds(time) - makeInputMilliseconds(now);
		},
		fromnow : function(time, now) {
			var difference = _d.msapart(time, now),
				string = difference < 0 ? wordsTimeAgo.past : wordsTimeAgo.future;
			return string.replace(/%s/i, _d.relativetime(difference));
		},
		customizedate : function(input) {
			if (input.weekdays && _.isArray(input.weekdays) && input.weekdays.length === 7) {
				wordsWeekdays = input.weekdays;
			}
			if (input.months && _.isArray(input.months) && input.months.length === 12) {
				wordsMonths = input.months;
			}
			if (input.timeago) {
				_.extend(wordsTimeAgo, input.timeago);
			}
			if (input.ordinal && _.isFunction(input.ordinal)) {
				createOrdinal = input.ordinal;
			}
		}
	};
	
	// assign to prototype
	Date.prototype.humanize = humanize;
	
	// assign to global
	self._d = _d;
	
	// integrate with underscore.js
    if (self._) {
        self._.mixin(_d);
    }
}(Date, _));
