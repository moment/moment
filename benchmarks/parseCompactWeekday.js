var moment = require('./../build/umd/moment.js');

module.exports = {
    name: 'parse compact locale weekday',
    tests: {
        'compact strict': {
            fn: function () {
                moment('21530', 'eHHmm', true);
            },
            async: false,
        },
        'compact non-strict': {
            fn: function () {
                moment('21530', 'eHHmm');
            },
            async: false,
        },
        'padded strict': {
            fn: function () {
                moment('021530', 'eHHmm', true);
            },
            async: false,
        },
        'padded non-strict': {
            fn: function () {
                moment('021530', 'eHHmm');
            },
            async: false,
        },
    },
};
