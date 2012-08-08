var moment = require("../../moment");

exports.immutable = {

    setUp : function(callback){
        this.mom = moment();
        moment.immutable = true;
        callback();
    },

    tearDown : function(callback){
        moment.immutable = false;
        callback();
    },

    "instance" : function(test){
        test.expect(1)
        test.notStrictEqual(this.mom.instance(), this.mom);
        test.done();
    },

    "math" : function(test){
        test.expect(2);
        test.notStrictEqual(this.mom, this.mom.add('d', 1));
        test.notStrictEqual(this.mom, this.mom.subtract('d', 1))
        test.done();
    },

    "setters" : function(test) {
        test.expect(8);
        test.notStrictEqual(this.mom, this.mom.milliseconds(3));
        test.notStrictEqual(this.mom, this.mom.seconds(3));
        test.notStrictEqual(this.mom, this.mom.minutes(3));
        test.notStrictEqual(this.mom, this.mom.hours(3));
        test.notStrictEqual(this.mom, this.mom.date(3));
        test.notStrictEqual(this.mom, this.mom.day(3));
        test.notStrictEqual(this.mom, this.mom.month(3));
        test.notStrictEqual(this.mom, this.mom.year(1999));
        test.done();
    },

    "startAndEnd" : function(test){
        test.expect(2);
        test.notStrictEqual(this.mom, this.mom.startOf("year"));
        test.notStrictEqual(this.mom, this.mom.endOf("year"));
        test.done();
    },

    "zone" : function(test){
        test.expect(2);
        test.notStrictEqual(this.mom, this.mom.local());
        test.notStrictEqual(this.mom, this.mom.utc());
        test.done();
    },

    "lang" : function(test){
        test.expect(2);
        test.notStrictEqual(this.mom, this.mom.lang("de"));

        var duration = moment.duration({seconds: 8});
        test.notStrictEqual(duration, duration.lang("de"));
        test.done();
    },
}