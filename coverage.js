var bunker = require('bunker');
var fs = require('fs');

var Open = "(function(){\
    var module = { exports : null },\
        require = function(){ return module.exports; },\
        QUnit = { module : function(){} },\
        ok = function (a, b, c) {\
            if (typeof a == 'function') {\
                a();\
            }\
            if (typeof b == 'function') {\
                b();\
            }\
            if (typeof c == 'function') {\
                c();\
            }\
        },\
        test = ok,\
        deepEqual = ok,\
        equal = ok;";
var src = fs.readFileSync('./moment.js', 'utf8');
var srcTest = fs.readFileSync('./site/js/test.min.js', 'utf8');
var srcTest = fs.readFileSync('./sitesrc/js/unit-tests.js', 'utf8');
var Close = '})();';

var counts = {};
var topNode;

var b = bunker(Open + src + srcTest + Close);

function rightPad(input, length) {
    while (input.length < length) {
        input += ' ';
    }
    return input;
}

/*
 *  Bind event listener
 */

b.on('node', function (node) {
    if (!counts[node.id]) {
        counts[node.id] = { 
            times : 0, 
            node : node 
        };
    }
    counts[node.id].times ++;
});

/*
 *  Run the source
 */

b.run();

/*
 *  Backfill
 */

b.nodes.forEach(function(node) {
    if (!counts[node.id]) {
        counts[node.id] = { 
            times : 0, 
            node : node 
        };
    }
});

/*
 *  Get the output
 */

console.log('-- Missed Nodes --');

var total = 0;
var missed = 0;

Object.keys(counts).forEach(function (key) {
    var count = counts[key],
        output = '';
    if (count.times === 0) {
        output += '[';
        output += (count.node.start.line + 1) + ':';
        output += (count.node.start.col) + '] ';
        output = rightPad(output, 15);
        if (count.node.source().length > 100) {
            output += count.node.source().substring(0, 97) + '...';
        } else {
            output += count.node.source();
        }
        console.log(output);
        missed ++;
    }
    total ++;
});

console.log('--              --');
if (missed === 0) {
    console.log('YAY! No lines missed!');
} else {
    console.log('OOPS, you missed ' + missed + ' lines of ' + total + ' (' + (Math.round((missed / total) * 1000) / 10) + '%)');
}