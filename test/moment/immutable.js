var moment = require("../../moment");

exports.immutable = {

    setUp : function(callback){
        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);
        this.mom = a

        moment.immutable = true;
        callback();
    },

    tearDown : function(callback){
        moment.immutable = false;
        callback();
    },

    "instance" : function(test){
        test.expect(2)
        test.notStrictEqual(this.mom.instance(), this.mom);
        test.strictEqual(this.mom.instance(true), this.mom);
        test.done();
    },

    "math" : function(test){
        test.expect(10);
        test.notStrictEqual(this.mom, this.mom.add('d', 1));
        test.notStrictEqual(this.mom, this.mom.subtract('d', 1))

        test.equal(this.mom.add({ms:50}).milliseconds(), 550, 'Add milliseconds');
        test.equal(this.mom.add({s:1}).seconds(), 9, 'Add seconds');
        test.equal(this.mom.add({m:1}).minutes(), 8, 'Add minutes');
        test.equal(this.mom.add({h:1}).hours(), 7, 'Add hours');
        test.equal(this.mom.add({d:1}).date(), 13, 'Add date');
        test.equal(this.mom.add({w:1}).date(), 19, 'Add week');
        test.equal(this.mom.add({M:1}).month(), 10, 'Add month');
        test.equal(this.mom.add({y:1}).year(), 2012, 'Add year');

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
        test.expect(6);
        test.notStrictEqual(this.mom, this.mom.startOf("year"));
        test.notStrictEqual(this.mom, this.mom.endOf("year"));

        m = this.mom.startOf("year")
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "strip out the month");

        m = this.mom.endOf("year")
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 11, "set the month");

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
