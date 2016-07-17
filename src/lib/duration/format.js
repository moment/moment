import { createDuration } from './create';
import each from '../utils/each';
import extend from '../utils/extend';
import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import indexOf from '../utils/index-of';
import keys from '../utils/keys';
import map from '../utils/map';
import zeroFill from '../utils/zero-fill';


// formatDuration([template] [, settings])
export function formatDuration () {
    var tokenizer, tokens, types, typeMap, momentTypes, foundFirst, trimIndex, i,
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

    // tokenizer regexp
    tokenizer = new RegExp(map(types, function (type) {
        return settings[type].source;
    }).join('|'), 'g');

    // token type map function: find the type whose regex matches token
    typeMap = function (token) {
        for (var i = 0; i < types.length; ++i) {
            if (settings[types[i]].test(token)) {
                return types[i];
            }
        }
    };

    // tokens array
    tokens = map(settings.template.match(tokenizer), function (token, index) {
        var type = typeMap(token),
            length = token.length;

        return {
            index: index,
            length: length,

            // replace escaped tokens with the non-escaped token text
            token: (type === 'escape' ? token.replace(settings.escape, '$1') : token),

            // ignore type on non-moment tokens
            type: ((type === 'escape' || type === 'general') ? null : type)

            // calculate base value for all moment tokens
            //baseValue: ((type === 'escape' || type === 'general') ? null : this.as(type))
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
        var value, wholeValue, decimalValue, isLeast, isMost;

        // calculate integer and decimal value portions
        value = remainder.as(momentType);
        wholeValue = (value > 0 ? Math.floor(value) : Math.ceil(value));
        decimalValue = value - wholeValue;

        // is this the least-significant moment token found?
        isLeast = ((index + 1) === momentTypes.length);

        // is this the most-significant moment token found?
        isMost = (!index);

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
                    // if the template is 'hh:mm:ss', the user clearly wanted everything padded so we should output '05:00'
                    // if the user wanted the full padded output, they can set `{ trim: false }` to get '00:05:00'
                }
            }
        });

        // update remainder
        remainder.subtract(wholeValue, momentType);
    });

    // trim tokens array:
    // - don't trim the least moment token)
    // - don't trim moment tokens that have a whole value
    function shouldTrimToken (token) {
        return !token.isLeast && (token.type == null || !token.wholeValue);
    }
    if (settings.trim === 'left') {
        while (shouldTrimToken(tokens[0])) {
            tokens.shift();
        }
    } else if (settings.trim === 'right') {
        while (shouldTrimToken(tokens[tokens.length - 1])) {
            tokens.pop();
        }
    }


    // build output

    // the first moment token can have special handling
    foundFirst = false;

    // run the map in reverse order if trimming from the right
    if (settings.trim === 'right') {
        tokens.reverse();
    }

    tokens = map(tokens, function (token) {
        var val,
            decVal;

        if (!token.type) {
            // if it is not a moment token, use the token as its own value
            return token.token;
        }

        val = token.wholeValue.toString();

        // remove negative sign from the beginning
        val = val.replace(/^\-/, '');

        // apply token length formatting
        // special handling for the first moment token that is not the most significant in a trimmed template
        if (token.length > 1 && (foundFirst || token.isMost || settings.forceLength)) {
            val = zeroFill(val, token.length);
        }

        // add a negative sign if the value is negative and token is most significant
        if (token.isMost && token.value < 0) {
            val = '-' + val;
        }

        foundFirst = true;

        return val;
    });

    // undo the reverse if trimming from the right
    if (settings.trim === 'right') {
        tokens.reverse();
    }

    return tokens.join('');
}

formatDuration.defaults = {
    // token definitions
    escape: /\[(.+?)\]/,
    years: /[Yy]+/,
    months: /M+/,
    weeks: /[Ww]+/,
    days: /[Dd]+/,
    hours: /[Hh]+/,
    minutes: /m+/,
    seconds: /s+/,
    milliseconds: /S+/,
    general: /.+?/,

    // token type names
    // in order of descending magnitude
    // can be a space-separated token name list or an array of token names
    types: 'escape years months weeks days hours minutes seconds milliseconds general',

    // format options

    // trim
    // 'left' - template tokens are trimmed from the left until the first moment token that has a value >= 1
    // 'right' - template tokens are trimmed from the right until the first moment token that has a value >= 1
    // (the final moment token is not trimmed, regardless of value)
    // `false` - template tokens are not trimmed
    trim: 'left',

    // force first moment token with a value to render at full length even when template is trimmed and first moment token has length of 1
    forceLength: null,

    // template used to format duration
    // may be a function or a string
    // template functions are executed with the `this` binding of the settings object
    // so that template strings may be dynamically generated based on the duration object
    // (accessible via `this.duration`)
    // or any of the other settings
    template: function () {
        var types = this.types,
            dur = this.duration,
            lastType;

        // find the last matching type (AKA the smallest-magnitude unit with data)
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
