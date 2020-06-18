var Benchmark = require('benchmark'),
    moment = require("./../moment.js");

module.exports = {
    name: 'load missing locale',
    tests: [{
        fn: function() {
            // falls back to en
            moment.locale('en-US');
        },
        async: true,
    }],
};
