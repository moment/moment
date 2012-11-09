var moment = require("../../moment");

exports.past_future = {
    "isPast" : function(test) {
        test.expect(3);

		var pastDate = moment();
        pastDate.year(2011);
        pastDate.month(9);
        pastDate.date(12);
        pastDate.hours(6);
        pastDate.minutes(7);
        pastDate.seconds(8);
        pastDate.milliseconds(500);

        var futureDate = moment();
        futureDate.year(3011);
        futureDate.month(9);
        futureDate.date(12);
        futureDate.hours(6);
        futureDate.minutes(7);
        futureDate.seconds(8);
        futureDate.milliseconds(500);

        test.equal(pastDate.isPast(pastDate), false, 'A momemnt is not in the past of itself')
        test.equal(pastDate.isPast(futureDate), true, 'A moment is in the past of a future moment')
        test.equal(futureDate.isPast(futureDate), false, 'A moment is not in the past of a past moment')
    	test.done();
    },

    "isFuture" : function(test) {
        test.expect(3);

		var pastDate = moment();
        pastDate.year(2011);
        pastDate.month(9);
        pastDate.date(12);
        pastDate.hours(6);
        pastDate.minutes(7);
        pastDate.seconds(8);
        pastDate.milliseconds(500);

        var futureDate = moment();
        futureDate.year(3011);
        futureDate.month(9);
        futureDate.date(12);
        futureDate.hours(6);
        futureDate.minutes(7);
        futureDate.seconds(8);
        futureDate.milliseconds(500);

        test.equal(futureDate.isFuture(futureDate), false, 'A momemnt is not in the future of itself')
        test.equal(futureDate.isFuture(pastDate), true, 'A moment is in the future of a past moment')
        test.equal(pastDate.isFuture(futureDate), false, 'A moment is not in the future of a future moment')
        test.done();
    }

}