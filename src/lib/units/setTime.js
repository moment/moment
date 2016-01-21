import { expandFormat, formatTokenFunctions, formattingTokens } from '../format/format';
import { getParseRegexForToken, isoTimes }   from '../parse/regex';
import { addTimeToArrayFromToken } from '../parse/token';
import { HOUR, MINUTE, SECOND, MILLISECOND } from './constants';
import getParsingFlags from '../create/parsing-flags';
import { meridiemFixWrap } from '../create/from-string-and-format';


export function setTime(input, format) {
    var string = '' + input, tokens, i,
        token, parsedInput, skipped, totalParsedInputLength,
        parsedArr = [], stringLength = string.length;
    //numeric inputs add minutes to start of day
    if (typeof input === 'number')
    {
        return this.startOf('day').add(input, 'm');
    }


    if (!format)
    {
        format = findIsoFormat(input);
    }
    //should this mark the date invalid? not sure what the desired behavior is
    if (!format) {
        this._isValid = false;
        return;
    }


    tokens = expandFormat(format, this._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, this)) || [])[0];
        if (parsedInput)
        {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0 && this._strict)
            {
                getParsingFlags(this).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(this).empty = false;
            }
            else {
                getParsingFlags(this).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, parsedArr, this);
        }
        else if (this._strict && !parsedInput) {
            getParsingFlags(this).unusedTokens.push(token);
        }
    }

    getParsingFlags(this).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(this).unusedInput.push(string);
    }

    parsedArr[HOUR] = meridiemFixWrap(this._locale, parsedArr[HOUR], this._meridiem);
    this.hour(parsedArr[HOUR]);
    this.minute(parsedArr[MINUTE] ? parsedArr[MINUTE] : 0);
    this.second(parsedArr[SECOND] ? parsedArr[SECOND] : 0);
    this.millisecond(parsedArr[MILLISECOND] ? parsedArr[MILLISECOND] : 0);
    this._meridiem = null;
    return this;
}


function findIsoFormat(input) {
    for (var i = 0; i < isoTimes.length; i++)
    {
        if(isoTimes[i][1].exec(input)) {
            return isoTimes[i][0];
        }
    }
}
