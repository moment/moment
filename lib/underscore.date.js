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
			s: "less than a minute",
			m: "about a minute",
			mm: "%d minutes",
			h: "about an hour",
			hh: "about %d hours",
			d: "a day",
			dd: "%d days",
			M: "about a month",
			MM: "%d months",
			y: "about a year",
			yy: "%d years"
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
			charactersToReplace = /Mo|MM?M?M?|Do|DDDo|DD?D?D?|do|dd?d?d?|w[o|w]?|YYYY|YY|[aA]|hh?|HH?|mm?|ss?/g,
			formatFunctions = {
				// MONTH
				M : function() {
					return currentMonth + 1;
				},
				Mo : function() {
					return (currentMonth + 1) + createOrdinal(currentMonth + 1);
				},
				MM : function() {
					return leftZeroFill(currentMonth + 1, 2);
				},
				MMM : function() {
					return wordsMonths[currentMonth].slice(0, 3);
					
				},
				MMMM : function() {
					return wordsMonths[currentMonth];
					
				},
				
				// DAY OF MONTH
				D : function() {
					return currentDate;
				},
				Do : function() {
					return currentDate + createOrdinal(currentDate);
				},
				DD : function() {
					return leftZeroFill(currentDate, 2);
				},
				
				// DAY OF YEAR
				DDD : function() {
					var a = new Date(currentYear, currentMonth, currentDate),
						b = new Date(currentYear, 0, 1);
					return ((a - b) / 864e5) + 1.5 | 0;
				},
				DDDo : function() {
					var DDD = formatFunctions.DDD();
					return DDD + createOrdinal(DDD);
				},
				DDDD : function() {
					return leftZeroFill(formatFunctions.DDD(), 3);
				},
				
				// WEEKDAY
				d : function() {
					return currentDay;
				},
				do : function() {
					return currentDay + createOrdinal(currentDay);
				},
				dd : function() {
					return leftZeroFill(currentDay, 2);
				},
				ddd : function() {
					return wordsWeekdays[currentDay].slice(0, 3);
				},
				dddd : function() {
					return wordsWeekdays[currentDay];
				},
				
				// WEEK OF YEAR
				w : function() {
					var a = new Date(currentYear, currentMonth, currentDate - currentDay + 5),
						b = new Date(a.getFullYear(), 0, 4);
					return (a - b) / 864e5 / 7 + 1.5 | 0;
				},
				wo : function() {
					var w = formatFunctions.w();
					return w + createOrdinal(w);
				},
				ww : function() {
					return leftZeroFill(formatFunctions.w(), 2);
				},
				
				// YEAR
				YY : function() {
					return (currentYear + '').slice(-2);
				},
				YYYY : function(shorthand) {
					return currentYear;
				},
				
				// AM / PM
				a : function() {
					return currentHours > 11 ? 'pm' : 'am';
				},
				A : function() {
					return currentHours > 11 ? 'PM' : 'AM';
				},
				
				// 24 HOUR 
				H : function() {
					return currentHours;
				},
				HH : function() {
					return leftZeroFill(currentHours, 2);
				},
				
				// 12 HOUR 
				h : function() {
					return currentHours % 12 || 12;
				},
				hh : function() {
					return leftZeroFill(currentHours % 12 || 12, 2);
				},
				
				// MINUTE
				m : function() {
					return currentMinutes;
				},
				mm : function() {
					return leftZeroFill(currentMinutes, 2);
				},
				
				// SECOND
				s : function() {
					return currentSeconds;
				},
				ss : function() {
					return leftZeroFill(currentSeconds, 2);
				}
			};
		
		// check if the character is a format
		// return formatted string or non string.
		function replaceFunction(input) {
			return formatFunctions[input] ? formatFunctions[input]() : input;
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
			return seconds < 45 && substituteTimeAgo('s', seconds | 0) ||
				seconds < 90 && substituteTimeAgo('m') ||
				minutes < 45 && substituteTimeAgo('mm', minutes | 0) ||
				minutes < 90 && substituteTimeAgo('h') ||
				hours < 24 && substituteTimeAgo('hh', hours | 0) ||
				hours < 48 && substituteTimeAgo('d') ||
				days < 30 && substituteTimeAgo('dd', days | 0) ||
				days < 60 && substituteTimeAgo('M') ||
				days < 350 && substituteTimeAgo('MM', days / 30 | 0) ||
				years < 2 && substituteTimeAgo('y') ||
				substituteTimeAgo('yy', years | 0);
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
