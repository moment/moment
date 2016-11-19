/*! Moment Duration Format v2.0.0dev
 *  https://github.com/jsmreese/moment-duration-format
 *  Date: 2015-02-21
 *
 *  Duration format plugin function for the Moment.js library
 *  http://momentjs.com/
 *
 *  Copyright 2015 John Madhavan-Reese
 *  Released under the MIT license
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['moment'], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(require('moment'));
	} else {
		// Browser globals
		root.momentDurationFormat = factory(root.moment);
	}
})(this, function (moment) {

	// repeatZero(qty)
	// returns "0" repeated qty times
	function repeatZero(qty) {
		var result = "";

		// exit early
		// if qty is 0 or a negative number
		// or doesn't coerce to an integer
		qty = parseInt(qty, 10);
		if (!qty || qty < 1) { return result; }

		while (qty) {
			result += "0";
			qty -= 1;
		}

		return result;
	}

	// padZero(str, len [, isRight])
	// pads a string with zeros up to a specified length
	// will not pad a string if its length is aready
	// greater than or equal to the specified length
	// default output pads with zeros on the left
	// set isRight to `true` to pad with zeros on the right
	function padZero(str, len, isRight) {
		if (str == null) { str = ""; }
		str = "" + str;

		return (isRight ? str : "") + repeatZero(len - str.length) + (isRight ? "" : str);
	}

	// isArray
	function isArray(array) {
		return Object.prototype.toString.call(array) === "[object Array]";
	}

	// isObject
	function isObject(obj) {
		return Object.prototype.toString.call(obj) === "[object Object]";
	}

	// findLast
	function findLast(array, callback) {
		var index = array.length;

		while (index -= 1) {
			if (callback(array[index])) { return array[index]; }
		}
	}

	// find
	function find(array, callback) {
		var index = 0,
			max = array.length,
			match;

		if (typeof callback !== "function") {
			match = callback;
			callback = function (item) {
				return item === match;
			};
		}

		while (index < max) {
			if (callback(array[index])) { return array[index]; }
			index += 1;
		}
	}

	// each
	function each(array, callback) {
		var index = 0,
			max = array.length;

		if (!array || !max) { return; }

		while (index < max) {
			if (callback(array[index], index) === false) { return; }
			index += 1;
		}
	}

	// map
	function map(array, callback) {
		var index = 0,
			max = array.length,
			ret = [];

		if (!array || !max) { return ret; }

		while (index < max) {
			ret[index] = callback(array[index], index);
			index += 1;
		}

		return ret;
	}

	// pluck
	function pluck(array, prop) {
		return map(array, function (item) {
			return item[prop];
		});
	}

	// compact
	function compact(array) {
		var ret = [];

		each(array, function (item) {
			if (item) { ret.push(item); }
		});

		return ret;
	}

	// unique
	function unique(array) {
		var ret = [];

		each(array, function (_a) {
			if (!find(ret, _a)) { ret.push(_a); }
		});

		return ret;
	}

	// intersection
	function intersection(a, b) {
		var ret = [];

		each(a, function (_a) {
			each(b, function (_b) {
				if (_a === _b) { ret.push(_a); }
			});
		});

		return unique(ret);
	}

	// rest
	function rest(array, callback) {
		var ret = [];

		each(array, function (item, index) {
			if (!callback(item)) {
				ret = array.slice(index);
				return false;
			}
		});

		return ret;
	}

	// initial
	function initial(array, callback) {
		var reversed = array.slice().reverse();

		return rest(reversed, callback).reverse();
	}

	// extend
	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) { a[key] = b[key]; }
		}

		return a;
	}

	// durationFormat([template] [, precision] [, settings])
	function durationFormat() {

		var tokenizer, tokens, types, typeMap, momentTypes, foundFirst, trimIndex,
			args = [].slice.call(arguments),
			settings = extend({}, this.format.defaults),
			// keep a shadow copy of this moment for calculating remainders
			remainder = moment.duration(this);

		// add a reference to this duration object to the settings for use
		// in a template function
		settings.duration = this;

		// parse arguments
		each(args, function (arg) {
			if (typeof arg === "string" || typeof arg === "function") {
				settings.template = arg;
				return;
			}

			if (typeof arg === "number") {
				settings.precision = arg;
				return;
			}

			if (isObject(arg)) {
				extend(settings, arg);
			}
		});

		// types
		types = settings.types = (isArray(settings.types) ? settings.types : settings.types.split(" "));

		// template
		if (typeof settings.template === "function") {
			settings.template = settings.template.apply(settings);
		}

		// decimalSeparator
		if (typeof settings.decimalSeparator === "function") {
			settings.decimalSeparator = settings.decimalSeparator.apply(settings);
		}

		// tokenizer regexp
		tokenizer = new RegExp(map(types, function (type) {
			return settings[type].source;
		}).join("|"), "g");

		// token type map function
		typeMap = function (token) {
			return find(types, function (type) {
				return settings[type].test(token);
			});
		};

		// tokens array
		tokens = map(settings.template.match(tokenizer), function (token, index) {
			var type, length, stopTrim;

			type = typeMap(token);
			stopTrim = false;

			if (token.slice(0, 1) === "*") {
				token = token.slice(1);
				stopTrim = true;
			}

			length = token.length;

			return {
				index: index,
				length: length,
				stopTrim: stopTrim,

				// replace escaped tokens with the non-escaped token text
				token: (type === "escape" ? token.replace(settings.escape, "$1") : token),

				// ignore type on non-moment tokens
				type: ((type === "escape" || type === "general") ? null : type)
			};
		}, this);

		// unique moment token types in the template (in order of descending magnitude)
		momentTypes = intersection(types, unique(compact(pluck(tokens, "type"))));

		// exit early if there are no momentTypes
		if (!momentTypes.length) {
			return pluck(tokens, "token").join("");
		}

		// calculate values for each token type in the template
		each(momentTypes, function (momentType, index) {
			var value, wholeValue, decimalValue, isLeast, isMost, truncMethod, decVal;

			// is this the least-significant moment token found?
			isLeast = ((index + 1) === momentTypes.length);

			// is this the most-significant moment token found?
			isMost = (!index);

			// get the value in the current units
			value = remainder.as(momentType);

			// determine the truncation method
			// take floor for positive numbers, ceiling for negative numbers
			truncMethod = (value > 0 ? "floor" : "ceil");

			// calculate integer and decimal value portions
			if (isLeast) {
				// apply precision to least significant token value
				if (settings.precision < 0) {
					wholeValue = Math[settings.trunc ? truncMethod : "round"](value * Math.pow(10, settings.precision)) * Math.pow(10, -settings.precision);
					decimalValue = 0;
				} else if (settings.precision === 0) {
					wholeValue = Math[settings.trunc ? truncMethod : "round"](value);
					decimalValue = 0;
				} else { // settings.precision > 0
					wholeValue = Math[truncMethod](value);

					if (settings.trunc) {
						decVal = value - wholeValue;
					} else {
						decVal = Math.round((value - wholeValue) * Math.pow(10, settings.precision)) * Math.pow(10, -settings.precision)
					}

					decVal = decVal.toString().replace(/^\-/, "").split(/\.|e\-/);

					switch (decVal.length) {
						case 1:
							decimalValue = padZero(decVal[0], settings.precision, true).slice(0, settings.precision);
							break;

						case 2:
							decimalValue = padZero(decVal[1], settings.precision, true).slice(0, settings.precision);
							break;

						case 3:
							decimalValue = padZero(repeatZero((+decVal[2]) - 1) + (decVal[0] || "0") + decVal[1], settings.precision, true).slice(0, settings.precision);
							break;

						default:
							throw "Moment Duration Format: unable to parse token decimal value.";
					}
				}
			} else {
				wholeValue = Math[truncMethod](value);
				decimalValue = value - wholeValue;
			}


			// update tokens array
			// using this algorithm to not assume anything about
			// the order or frequency of any tokens
			each(tokens, function (token) {
				if (token.type === momentType) {
					extend(token, {
						value: value,
						wholeValue: wholeValue,
						decimalValue: decimalValue,
						isLeast: isLeast,
						isMost: isMost
					});

					if (isMost) {
						// note the length of the most-significant moment token:
						// if it is greater than one and forceLength is not set, default forceLength to `true`
						if (settings.forceLength == null && token.length > 1) {
							settings.forceLength = true;
						}

						// rationale is this:
						// if the template is "h:mm:ss" and the moment value is 5 minutes, the user-friendly output is "5:00", not "05:00"
						// shouldn't pad the `minutes` token even though it has length of two
						// if the template is "h:mm:ss" and the minutes output should always include the leading zero
						// even when the hour is trimmed then set `{ forceLength: true }` to output "05:00"
						// if the template is "hh:mm:ss", the user clearly wanted everything padded so we should output "05:00"
						// if the user wanted the full padded output, they can use template "hh:mm:ss" and set `{ trim: false }` to get "00:05:00"
					}
				}
			});

			// update remainder
			remainder.subtract(wholeValue, momentType);
		});

		// trim tokens array
		if (settings.trim) {
			tokens = (settings.trim === "left" ? rest : initial)(tokens, function (token) {
				// return `true` if:
				// the token is not the least moment token (don't trim the least moment token)
				// the token is not flagged to stop trimming
				// the token is a moment token that does not have a value (don't trim moment tokens that have a whole value)
				return !(token.isLeast || token.stopTrim || (token.type != null && token.wholeValue));
			});
		}


		// build output

		// the first moment token can have special handling
		foundFirst = false;

		// run the map in reverse order if trimming from the right
		if (settings.trim === "right") {
			tokens.reverse();
		}

		tokens = map(tokens, function (token, index) {
			var val,
				decVal;

			if (!token.type) {
				// if it is not a moment token, use the token as its own value
				return token.token;
			}

			// remove negative sign from the beginning
			val = token.wholeValue.toString().replace(/^\-/, "");

			// apply token length formatting
			// special handling for the first moment token that is not the most significant in a trimmed template
			if (token.length > 1 && (foundFirst || token.isMost || settings.forceLength)) {
				val = padZero(val, token.length);
			}

			// add decimal value if precision > 0
			if (token.isLeast && (settings.precision > 0)) {
				decVal = token.decimalValue.toString();
				val += settings.decimalSeparator + decVal;
			}

			// add a negative sign if the value is negative and token is the first one
			if (token.value < 0 && !index) {
				val = "-" + val;
			}

			foundFirst = true;

			return val;
		});

		// undo the reverse if trimming from the right
		if (settings.trim === "right") {
			tokens.reverse();
		}

		return tokens.join("");
	}

	// defaultFormatTemplate
	function defaultFormatTemplate() {
		var dur, lastType;

		dur = this.duration;

		lastType = findLast(this.types, function (type) {
			return dur._data[type];
		});

		// default template strings for each duration dimension type
		switch (lastType) {
			case "seconds":
				return "h:mm:ss";
			case "minutes":
				return "d[d] h:mm";
			case "hours":
				return "d[d] h[h]";
			case "days":
				return "M[m] d[d]";
			case "weeks":
				return "y[y] w[w]";
			case "months":
				return "y[y] M[m]";
			case "years":
				return "y[y]";
			default:
				return "y[y] M[m] d[d] h:mm:ss";
		}
	}

	// defaultDecimalSeparator
	// http://stackoverflow.com/questions/1074660/with-a-browser-how-do-i-know-which-decimal-separator-does-the-client-use
	function defaultDecimalSeparator() {
		return /^1(.+)1$/.exec((1.1).toLocaleString())[1];
	}

	// init
	function init(context) {
		if (!context) {
			throw "Moment Duration Format init cannot find moment instance.";
		}

		context.duration.fn.format = durationFormat;

		context.duration.fn.format.defaults = {
			// token definitions
			escape: /\[(.+?)\]/,
			years: /\*?[Yy]+/,
			months: /\*?M+/,
			weeks: /\*?[Ww]+/,
			days: /\*?[Dd]+/,
			hours: /\*?[Hh]+/,
			minutes: /\*?m+/,
			seconds: /\*?s+/,
			milliseconds: /\*?S+/,
			general: /.+?/,

			// token type names
			// in order of descending magnitude
			// can be a space-separated token name list or an array of token names
			types: "escape years months weeks days hours minutes seconds milliseconds general",

			// format options

			// trim
			// "left" - template tokens are trimmed from the left until the first moment token that has a value >= 1
			// "right" - template tokens are trimmed from the right until the first moment token that has a value >= 1
			// (the final moment token is not trimmed, regardless of value)
			// `false` - template tokens are not trimmed
			trim: "left",

			// precision
			// number of decimal digits to include after (to the right of) the decimal point (positive integer)
			// or the number of digits to truncate to 0 before (to the left of) the decimal point (negative integer)
			precision: 0,

			// trunc
			// default behavior in version 2.0.0 rounds final token value
			// set to `true` to truncate final token value (this was the default behavior in version 1)
			trunc: false,

			// force first moment token with a value to render at full length even when template is trimmed
			// and first moment token has length of 1
			// defaulted to `null` to distinguish between 'not set' and 'set to `false`'
			forceLength: null,

			// template used to format duration
			// may be a function or a string
			// template functions are executed with the `this` binding of the settings object
			// so that template strings may be dynamically generated based on the duration object
			// (accessible via `this.duration`) or any of the other settings
			template: defaultFormatTemplate,

			// decimalSeparator
			// can be a string or a function
			// by default will use the decimal separator set in the environment
			decimalSeparator: defaultDecimalSeparator
		};
	}

	// initialize duration format on the global moment instance
	init(moment);

	// return the init function so that duration format can be
	// initialized on other moment instances
	return init;
});