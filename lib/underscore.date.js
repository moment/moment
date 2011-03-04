// Underscore.date
//
// (c) 2011 Tim Wood
// Underscore.date is freely distributable under the terms of the MIT license.
//
// Version 0.1.0


(function(){
    // ------------------------- Baseline setup ---------------------------------

    // Establish the root object, "window" in the browser, or "global" on the server.
    var root = this,
		_d,
		dateToFormat, 
		formatStrings, 
		charactersToReplace = /\\?([a-z])/gi,
		wordsWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		wordsMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		wordsTimeAgo = {
			future: "in %s",
			past: "%s ago",
			ss: "less than a minute",
			m: "about a minute",
			mm: "%d minutes",
			h: "about an hour",
			hh: "about %d hours",
			d: "a day",
			dd: "%d days",
			n: "about a month",
			nn: "%d months",
			y: "about a year",
			yy: "%d years"
		};
	
	function createOrdinal(number) {
		return ((number / 10 | 0) === 1) ? 'th' :
			(number % 10 === 1) ? 'st' :
			(number % 10 === 2) ? 'nd' :
			(number % 10 === 3) ? 'rd' : 'th';
	};
	// check if the character is a format
	// return formatted string or non string.
	function replaceFunction(input) {
		return formatStrings[input] ? formatStrings[input]() : input;
	};
	
	// zero fill a number
	function leftZeroFill(number, targetLength) {
		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	};
	
	// strings to consider when formatting
	formatStrings = {
		
		//  DAY OF MONTH
		
		// day number of month
		//   1 .. 31
		j: function () { // 1..31
			return dateToFormat.getDate();
		},
		// day number of month (leading zero)
		//   01 .. 31
		d: function () { // 01..31
			return leftZeroFill(formatStrings.j(), 2);
		},
		// day number of month suffix
		//   st, nd, rd, th
		S: function () {
			return createOrdinal(formatStrings.j());
		},
		
		//  DAY OF WEEK
		
		// day name of week
		//   Monday .. Sunday
		l: function () {
			return wordsWeekdays[formatStrings.w()];
		},
		// day name of week (shorthand)
		//   Mon .. Sun
		D: function () {
			return formatStrings.l().slice(0, 3);
		},
		// day number of week
		//   0[Sun] .. 6[Sat]
		w: function () {
			return dateToFormat.getDay();
		},
		// day number of week (ISO-8601)
		//   1[Mon] .. 7[Sun]
		N: function () {
			return formatStrings.w() || 7;
		},
		
		//  DAY OF YEAR
		
		// day number of year
		//   0 .. 365
		z: function () {
			var a = new Date(formatStrings.Y(), formatStrings.n() - 1, formatStrings.j()),
				b = new Date(formatStrings.Y(), 0, 1);
			return ((a - b) / 864e5) + .5 | 0;
		},
		
		//  WEEK
		
		// week number (ISO-8601)
		//   1 .. 52
		W: function () {
			var a = new Date(formatStrings.Y(), formatStrings.n() - 1, formatStrings.j() - formatStrings.N() + 4),
				b = new Date(a.getFullYear(), 0, 4);
			return leftZeroFill((a - b) / 864e5 / 7 + 1.5 | 0, 2);
		},
 
		//  MONTH
		 
		// month number
		//   1 .. 12
		n: function () {
			return dateToFormat.getMonth() + 1;
		},
		// month number (leading zero)
		//   01 .. 12
		m: function () {
			return leftZeroFill(formatStrings.n(), 2);
		},
		// month name
		//   January .. December
		F: function () {
			return wordsMonths[formatStrings.n() - 1];
		},
		// month name (shorthand)
		//   Jan .. Dec
		M: function () {
			return formatStrings.F().slice(0, 3);
		},
		// days in month
		//   28 .. 31
		t: function () {
			return (new Date(formatStrings.Y(), formatStrings.n(), 0)).getDate();
		},
		
		//  YEAR
		
		// is leap year
		//   0 or 1
		L: function () {
			return new Date(formatStrings.Y(), 1, 29).getMonth() === 1 | 0;
		},
		// year number (all 4 digits)
		//   1980 .. 2010
		Y: function () {
			return dateToFormat.getFullYear();
		},
		// year number (last 2 digits)
		//   00 .. 99
		y: function () {
			return (formatStrings.Y() + "").slice(-2);
		},
 
		//  TIME
		
		// am / pm (lowercase)
		//   am or pm
		a: function () {
			return dateToFormat.getHours() > 11 ? 'pm' : 'am';
		},
		// am / pm (uppercase)
		//   AM or PM
		A: function () {
			return formatStrings.a().toUpperCase();
		},
		// swatch internet time
		//   000 .. 999
		B: function () {
			var H = dateToFormat.getUTCHours() * 3600, // hours
				i = dateToFormat.getUTCMinutes() * 60, // minutes
				s = dateToFormat.getUTCSeconds(); // seconds
			return leftZeroFill(((H + i + s + 3600) / 86.4) % 1e3 | 0, 3);
		},
		
		// HOURS
		
		// 12 hours
		//   1 .. 12
		g: function () { // 12-Hours; 1..12
			return formatStrings.G() % 12 || 12;
		},
		// 12 hours (leading zero)
		//   01 .. 12
		h: function () {
			return leftZeroFill(formatStrings.g(), 2);
		},
		// 24 hours
		//   0 .. 23
		G: function () {
			return dateToFormat.getHours();
		},
		// 24 hours (leading zero)
		//   00 .. 23
		H: function () {
			return leftZeroFill(formatStrings.G(), 2);
		},
		
		// MINUTES SECONDS MILLISECONDS
		
		// minutes (leading zero)
		//   00 .. 59
		i: function () {
			return leftZeroFill(dateToFormat.getMinutes(), 2);
		},
		// seconds (leading zero)
		//   00 .. 59
		s: function () {
			return leftZeroFill(dateToFormat.getSeconds(), 2);
		},
		// seconds (since UNIX epoch)
		//   0 .. 1342759768
		U: function () {
			return dateToFormat.getTime() / 1000 | 0;
		},
		
		// TIMEZONE
		
		// DST observed
		//   0 or 1
		I: function () {
			var year = formatStrings.Y();
			var offset = new Date(year, 0, 1).getTimezoneOffset();
			offset = Math.max(offset, new Date(year, 6, 1).getTimezoneOffset());
			return 0 + (dateToFormat.getTimezoneOffset() < offset);
		},
		// difference to GMT (hour format)
		//   +0700
		O: function () { // Difference to GMT in hour format; e.g. +0200
			var a = dateToFormat.getTimezoneOffset();
			return (a > 0 ? "-" : "+") + leftZeroFill(Math.abs(a / 60 * 100), 4);
		},
		// difference to GMT (hour format with colon)
		//   +07:00
		P: function () {
			var O = formatStrings.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2));
		},
		// difference to GMT (seconds)
		//   -43200 .. 50400
		Z: function () {
			return -dateToFormat.getTimezoneOffset() * 60;
		}
	};
	
	function substituteTimeAgo(string, number) {
		number = number || 1;
		string = wordsTimeAgo[string] || string;
        return string.replace(/%d/i, number);
    }
	
	function makeInputADate(input){
		return typeof input === 'undefined' ? _d.dateNow() :
			input instanceof Date ? input :
			new Date(input);
	}
	
    var _d = {
		dateNow : function(asTimestamp) {
			return asTimestamp ? new Date().getTime() : new Date();
		},
		dateFormat : function(format, _time) {
			var format = format || '';
			dateToFormat = makeInputADate(_time);
			return format.replace(charactersToReplace, replaceFunction);
		},
		timeAsWords : function(milliseconds) {
			var seconds = Math.abs(milliseconds) / 1000,
				minutes = seconds / 60,
				hours = minutes / 60,
				days = hours / 24,
				years = days / 365;
			return seconds < 45 && substituteTimeAgo('ss', seconds | 0) ||
				seconds < 90 && substituteTimeAgo('m') ||
				minutes < 45 && substituteTimeAgo('mm', minutes | 0) ||
				minutes < 90 && substituteTimeAgo('h') ||
				hours < 24 && substituteTimeAgo('hh', hours | 0) ||
				hours < 48 && substituteTimeAgo('d') ||
				days < 30 && substituteTimeAgo('dd', days | 0) ||
				days < 60 && substituteTimeAgo('n') ||
				days < 350 && substituteTimeAgo('nn', days / 30 | 0) ||
				years < 2 && substituteTimeAgo('y') ||
				substituteTimeAgo('yy', years | 0);
		},
		timeDiff : function(_time, _now) {
			var time = makeInputADate(_time),
				now = makeInputADate(_now);
			return time.getTime() - now.getTime();
		},
		timeFromNow : function(_time, _now) {
			var difference = _d.timeDiff(_time, _now),
				string = difference < 0 ? wordsTimeAgo.past : wordsTimeAgo.future;
			return string.replace(/%s/i, _d.timeAsWords(difference));
		},
		setTimeI18N : function(i18n) {
			if (i18n.weekdays && _.isArray(i18n.weekdays) && i18n.weekdays.length == 7) {
				wordsWeekdays = i18n.weekdays;
			}
			if (i18n.months && _.isArray(i18n.months) && i18n.months.length == 12) {
				wordsMonths = i18n.months;
			}
			if (i18n.timeago) {
				_.extend(wordsTimeAgo, i18n.timeago);
			}
			if (i18n.ordinal && _.isFunction(i18n.ordinal)) {
				createOrdinal = i18n.ordinal;
			}
		}
	};
	
	// make global object
	root._d = _d;
	
	// integrate with underscore.js
    if (root._) {
        root._.mixin(_d);
    }
	

}());
