var Benchmark = require('benchmark'),
    moment = require("./../moment.js"),
    base = moment('2013-05-25');


module.exports = {
    name: 'clone',
    tests: {
        isBefore_true: {
            onComplete: function(){},
            fn: function(){base.isBefore('2013-06-25');},
            async: true
        },
        isBefore_self: {
            onComplete: function(){},
            fn: function(){base.isBefore('2013-05-25');},
            async: true
        },
        isBefore_false: {
            onComplete: function(){},
            fn: function(){base.isBefore('2013-04-25');},
            async: true
        },
        isAfter_true: {
            onComplete: function(){},
            fn: function(){base.isAfter('2013-04-25');},
            async: true
        },
        isAfter_self: {
            onComplete: function(){},
            fn: function(){base.isAfter('2013-05-25');},
            async: true
        },
        isAfter_false: {
            onComplete: function(){},
            fn: function(){base.isAfter('2013-06-25');},
            async: true
        }
    }
};
