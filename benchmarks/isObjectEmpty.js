var Benchmark = require('benchmark'),
    moment = require("./../moment.js");

var isObjectEmpty_getOwnPropertyNames = function(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
};

var isObjectEmpty_keys = function(obj) {
    if (Object.keys) {
        return (Object.keys(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
};

var isObjectEmpty_forIn = function(obj) {
    var k;
    for (k in obj) {
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
};
    
module.exports = {
    name: 'isObjectEmpty',
    tests: {
        "isObjectEmpty -> for..in": {
            onComplete: function(){},
            fn: function(){        
                isObjectEmpty_forIn(moment());
            },
            async: false
        },
        "isObjectEmpty -> Object.keys": {
            onComplete: function(){},
            fn: function(){        
                isObjectEmpty_keys(moment());
            },
            async: false
        },
        "isObjectEmpty -> Object.getOwnPropertyNames": {
            onComplete: function(){},
            fn: function(){        
                isObjectEmpty_getOwnPropertyNames(moment());
            },
            async: false
        }    
    }
};
