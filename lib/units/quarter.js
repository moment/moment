import { addFormatToken } from "../format/format";
import { addUnitAlias } from "./aliases";
import { addRegexToken, match1 } from "../parse/regex";
import { addParseToken } from "../parse/token";
import toInt from "../utils/to-int";

// FORMATTING

addFormatToken("Q", 0, 0, "quarter");

// ALIASES

addUnitAlias("quarter", "Q");

// PARSING

addRegexToken("Q", match1);
addParseToken("Q", function (input, array) {
    array[1] = (toInt(input) - 1) * 3; // TODO: use a constant for MONTH
});

// MOMENTS

export function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
