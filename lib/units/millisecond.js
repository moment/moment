import { makeGetSet } from "../moment/get-set";
import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1, match2, match3, match1to3, matchUnsigned } from "../parse/regex";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";

// FORMATTING

addFormatToken("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

function milliseconds (token) {
    addFormatToken(0, [token, 3], 0, "millisecond");
}

milliseconds("SSS");
milliseconds("SSSS");

// ALIASES

addUnitAlias("millisecond", "ms");

// PARSING

addRegexToken("S",    match1to3, match1);
addRegexToken("SS",   match1to3, match2);
addRegexToken("SSS",  match1to3, match3);
addRegexToken("SSSS", matchUnsigned);
addParseToken(["S", "SS", "SSS", "SSSS"], function (input, array) {
    array[6] = toInt(('0.' + input) * 1000); // TODO: use a constant for MILLISECOND
});

// MOMENTS

export var getSetMillisecond = makeGetSet('Milliseconds', false);
