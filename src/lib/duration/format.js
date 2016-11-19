import { createDuration } from './create';
import each from '../utils/each';
import extend from '../utils/extend';
import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import indexOf from '../utils/index-of';
import keys from '../utils/keys';
import map from '../utils/map';
import zeroFill from '../utils/zero-fill';

// formatDuration([template] [, precision] [, settings])
export function formatDuration() {
    var tokenizer, tokens, types, typeMap, momentTypes, foundFirst, trimIndex,
        args = [].slice.call(arguments),
        settings = extend({}, this.format.defaults),
        // keep a shadow copy of this moment for calculating remainders
        remainder = createDuration(this);

    // add a reference to this duration object to the settings for use
    // in a template function
    settings.duration = this;

    // parse arguments
    each.call(args, function (arg) {
        if (typeof arg === 'string' || typeof arg === 'function') {
            settings.template = arg;
            return;
        }

        if (typeof arg === 'number') {
            settings.precision = arg;
            return;
        }

        if (isObject(arg)) {
            extend(settings, arg);
        }
    });

    // types
    types = settings.types = (isArray(settings.types) ? settings.types : settings.types.split(' '));

    // template
    if (typeof settings.template === 'function') {
        settings.template = settings.template.apply(settings);
    }

    // decimalSeparator
    if (typeof settings.decimalSeparator === 'function') {
        settings.decimalSeparator = settings.decimalSeparator.apply(settings);
    }

    // tokenizer regexp
    tokenizer = new RegExp(map(types, function (type) {
        return settings[type].source;
    }).join('|'), 'g');

    // token type map function
    typeMap = function (token) {
        for (var i = 0; i < types.length; ++i) {
            if (settings[types[i]].test(token)) {
                return types[i];
            }
        }
    };

    // tokens array
    tokens = map(settings.template.match(tokenizer), function (token, index) {
        var type = typeMap(token);
        var length = token.length;
        var stopTrim = false;

        if (token.slice(0, 1) === '*') {
            token = token.slice(1);
            stopTrim = true;
        }


        return {
            index: index,
            length: length,
            stopTrim: stopTrim,

            // replace escaped tokens with the non-escaped token text
            token: (type === 'escape' ? token.replace(settings.escape, '$1') : token),

            // ignore type on non-moment tokens
            type: ((type === 'escape' || type === 'general') ? null : type)
        };
    }, this);

    // unique moment token types in the template (in order of descending magnitude)
    momentTypes = [];
    each.call(tokens, function (token) {
        if (indexOf.call(types, token.type) > -1 && indexOf.call(momentTypes, token.type) === -1) {
            momentTypes.push(token.type);
        }
    });

    // exit early if there are no momentTypes
    if (!momentTypes.length) {
        return map(tokens, function (v) {
            return v.token;
        }).join('');
    }

    // calculate values for each token type in the template
    each.call(momentTypes, function (momentType, index) {
        var value, wholeValue, decimalValue, isLeast, isMost, truncMethod, decVal;

        // is this the least-significant moment token found?
        isLeast = (index === (momentTypes.length - 1));

        // is this the most-significant moment token found?
        isMost = (index === 0);

        // get the value in the current units
        value = remainder.as(momentType);

        // determine the truncation method
        // take floor for positive numbers, ceiling for negative numbers
        truncMethod = (value > 0 ? 'floor' : 'ceil');
 // rounding up errors? TODO
        // calculate integer and decimal value portions
        if (isLeast) {
            // apply precision to least significant token value
            if (settings.precision < 0) {
                wholeValue = Math[settings.trunc ? truncMethod : 'round'](value * Math.pow(10, settings.precision)) * Math.pow(10, -settings.precision);
                decimalValue = 0;
            } else if (settings.precision === 0) {
                wholeValue = Math[settings.trunc ? truncMethod : 'round'](value);
                decimalValue = 0;
            } else { // settings.precision > 0
                wholeValue = Math[truncMethod](value);

                if (settings.trunc) {
                    decVal = value - wholeValue;
                } else {
                    decVal = Math.round((value - wholeValue) * Math.pow(10, settings.precision)) * Math.pow(10, -settings.precision);
                }

                decVal = decVal.toString().replace(/^\-/, '').split(/\.|e\-/);

                // not sure how to handle this...
                switch (decVal.length) {
                    case 1:
                        decimalValue = (decVal[0] + zeroFill(0, settings.precision)).slice(0, settings.precision);
                        break;

                    case 2:
                        decimalValue = (decVal[1] + zeroFill(0, settings.precision)).slice(0, settings.precision);
                        break;

                    // case 3:
                    //     decimalValue = padZero(repeatZero((+decVal[2]) - 1) + (decVal[0] || '0') + decVal[1], settings.precision, true).slice(0, settings.precision);
                    //     break;

                    default:
                        throw 'Moment Duration Format: unable to parse token decimal value.';
                }
            }
        } else {
            wholeValue = Math[truncMethod](value);
            decimalValue = value - wholeValue;
        }

        // update tokens array
        // using this algorithm to not assume anything about
        // the order or frequency of any tokens
        each.call(tokens, function (token) {
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
                    // if the template is 'h:mm:ss' and the moment value is 5 minutes, the user-friendly output is '5:00', not '05:00'
                    // shouldn't pad the `minutes` token even though it has length of two
                    // if the template is 'h:mm:ss' and the minutes output should always include the leading zero
                    // even when the hour is trimmed then set `{ forceLength: true }` to output '05:00'
                    // if the template is 'hh:mm:ss', the user clearly wanted everything padded so we should output '05:00'
                    // if the user wanted the full padded output, they can use template 'hh:mm:ss' and set `{ trim: false }` to get '00:05:00'
                }
            }
        });

        // update remainder
        remainder.subtract(wholeValue, momentType);
    });

    // // trim tokens array
    // if (settings.trim) {
    //     tokens = (settings.trim === 'left' ? rest : initial)(tokens, function (token) {
    //         // return `true` if:
    //         // the token is not the least moment token (don't trim the least moment token)
    //         // the token is not flagged to stop trimming
    //         // the token is a moment token that does not have a value (don't trim moment tokens that have a whole value)
    //         return !(token.isLeast || token.stopTrim || (token.type != null && token.wholeValue));
    //     });
    // }


    // build output

    // the first moment token can have special handling
    foundFirst = false;

    // // run the map in reverse order if trimming from the right
    // if (settings.trim === 'right') {
    //     tokens.reverse();
    // }

    tokens = map(tokens, function (token, index) {
        var val,
            decVal;

        if (!token.type) {
            // if it is not a moment token, use the token as its own value
            return token.token;
        }

        // remove negative sign from the beginning
        val = token.wholeValue.toString().replace(/^\-/, '');

        // apply token length formatting
        // special handling for the first moment token that is not the most significant in a trimmed template
        if (token.length > 1 && (foundFirst || token.isMost || settings.forceLength)) {
            val = zeroFill(val, token.length);
        }

        // add decimal value if precision > 0
        if (token.isLeast && (settings.precision > 0)) {
            decVal = token.decimalValue.toString();
            val += settings.decimalSeparator + decVal;
        }

        // add a negative sign if the value is negative and token is the first one
        if (token.value < 0 && !index) {
            val = '-' + val;
        }

        foundFirst = true;

        return val;
    });

    // // undo the reverse if trimming from the right
    // if (settings.trim === 'right') {
    //     tokens.reverse();
    // }

    return tokens.join('');
}

formatDuration.defaults = {
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
    types: 'escape years months weeks days hours minutes seconds milliseconds general',

    // format options

    // // precision
    // // number of decimal digits to include after (to the right of) the decimal point (positive integer)
    // // or the number of digits to truncate to 0 before (to the left of) the decimal point (negative integer)
    // precision: 0,

    // trunc
    // default behavior in version 2.0.0 rounds final token value
    // set to `true` to truncate final token value (this was the default behavior in version 1)
    trunc: false,

    // force first moment token with a value to render at full length even when template is trimmed
    // and first moment token has length of 1
    // defaulted to `null` to distinguish between 'not set' and 'set to `false`'
    forceLength: null,

    // precision UNUSED
    // number of decimal digits to include after (to the right of) the decimal point (positive integer)
    // or the number of digits to truncate to 0 before (to the left of) the decimal point (negative integer)
    precision: 0,

    // decimalSeparator
    // can be a string or a function
    // by default will use the decimal separator set in the environment
    // http://stackoverflow.com/questions/1074660/with-a-browser-how-do-i-know-which-decimal-separator-does-the-client-use
    decimalSeparator: function () {
        return /^1(.+)1$/.exec((1.1).toLocaleString())[1];
    },

    // template used to format duration
    // may be a function or a string
    // template functions are executed with the `this` binding of the settings object
    // so that template strings may be dynamically generated based on the duration object
    // (accessible via `this.duration`) or any of the other settings
    template: function () {
        var types = this.types,
            dur = this.duration,
            lastType;

        for (var i = types.length - 1; i >= 0; --i) {
            if (dur._data[types[i]]) {
                lastType = types[i];
                break;
            }
        }

        // default template strings for each duration dimension type
        switch (lastType) {
            case 'seconds':
                return 'h:mm:ss';
            case 'minutes':
                return 'd[d] h:mm';
            case 'hours':
                return 'd[d] h[h]';
            case 'days':
                return 'M[m] d[d]';
            case 'weeks':
                return 'y[y] w[w]';
            case 'months':
                return 'y[y] M[m]';
            case 'years':
                return 'y[y]';
            default:
                return 'y[y] M[m] d[d] h:mm:ss';
        }
    }
};
