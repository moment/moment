import { makeGetSet } from '../moment/get-set';
import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addRegexToken, match1, match2, match3, match1to3, matchUnsigned } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MILLISECOND } from './constants';
import toInt from '../utils/to-int';

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);
addRegexToken('SSSS', matchUnsigned);
addRegexToken('SSSSS', matchUnsigned);
addRegexToken('SSSSSS', matchUnsigned);
addRegexToken('SSSSSSS', matchUnsigned);
addRegexToken('SSSSSSSS', matchUnsigned);
addRegexToken('SSSSSSSSS', matchUnsigned);
addParseToken(
        'S SS SSS SSSS SSSSS SSSSSS SSSSSSS SSSSSSSS SSSSSSSSS'.split(' '),
        function (input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
});

// MOMENTS

export var getSetMillisecond = makeGetSet('Milliseconds', false);
