import { getParseRegexForToken, isoTimes }   from '../parse/regex';
import { copyConfig } from '../moment/constructor';
import { parseFromStringAndFormat } from '../create/from-string-and-format';
import { HOUR, MINUTE, SECOND, MILLISECOND } from '../units/constants';
import { isValid } from '../create/valid';
import getParsingFlags from '../create/parsing-flags';


export function setTime(input, format) {
    if (!this.isValid())
    {
        return this;
    }

    if (typeof input === 'number')
    {
        return this.startOf('day').add(input, 'm');
    }

    if (!format)
    {
        format = findIsoFormat(input);
    }

    if (!format) {
        this.invalidFormat = true;
    }

    this._isValid = null;
    var c = {};
    copyConfig(c, this);

    c._f = format;
    c._i = input;


    parseFromStringAndFormat(c);

    //need to update all flags that were toggled by the above function
    getParsingFlags(this).empty = getParsingFlags(c).empty;
    getParsingFlags(this).unusedTokens = getParsingFlags(this).unusedTokens.concat(getParsingFlags(c).unusedTokens);
    getParsingFlags(this).unusedInput = getParsingFlags(this).unusedInput.concat(getParsingFlags(c).unusedInput);
    getParsingFlags(this).charsLeftOver += getParsingFlags(c).charsLefOver;
    getParsingFlags(this).bigHour = getParsingFlags(c).bigHour;

    return this.set({
        hours: c._a[HOUR],
        minutes:(c._a[MINUTE]) ? c._a[MINUTE] : 0,
        seconds: (c._a[SECOND]) ? c._a[SECOND] : 0,
        milliseconds: (c._a[MILLISECOND]) ? c._a[MILLISECOND] : 0
    });
}


function findIsoFormat(input) {
    for (var i = 0; i < isoTimes.length; i++)
    {
        if (isoTimes[i][1].exec(input)) {
            return isoTimes[i][0];
        }
    }
}
