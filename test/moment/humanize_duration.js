var moment = require("../../moment");

exports.humanize_duration = {
    "humanize duration" : function(test) {
        test.expect(32);
        moment.lang('en');
        // this syntax is deprecated.
        // see moment.duration instead.
        test.equal(moment.humanizeDuration(44, "seconds"),  "a few seconds", "44 seconds = a few seconds");
        test.equal(moment.humanizeDuration(45, "seconds"),  "a minute",      "45 seconds = a minute");
        test.equal(moment.humanizeDuration(89, "seconds"),  "a minute",      "89 seconds = a minute");
        test.equal(moment.humanizeDuration(90, "seconds"),  "2 minutes",     "90 seconds = 2 minutes");
        test.equal(moment.humanizeDuration(44, "minutes"),  "44 minutes",    "44 minutes = 44 minutes");
        test.equal(moment.humanizeDuration(45, "minutes"),  "an hour",       "45 minutes = an hour");
        test.equal(moment.humanizeDuration(89, "minutes"),  "an hour",       "89 minutes = an hour");
        test.equal(moment.humanizeDuration(90, "minutes"),  "2 hours",       "90 minutes = 2 hours");
        test.equal(moment.humanizeDuration(5, "hours"),     "5 hours",       "5 hours = 5 hours");
        test.equal(moment.humanizeDuration(21, "hours"),    "21 hours",      "21 hours = 21 hours");
        test.equal(moment.humanizeDuration(22, "hours"),    "a day",         "22 hours = a day");
        test.equal(moment.humanizeDuration(35, "hours"),    "a day",         "35 hours = a day");
        test.equal(moment.humanizeDuration(36, "hours"),    "2 days",        "36 hours = 2 days");
        test.equal(moment.humanizeDuration(1, "days"),      "a day",         "1 day = a day");
        test.equal(moment.humanizeDuration(5, "days"),      "5 days",        "5 days = 5 days");
        test.equal(moment.humanizeDuration(1, "weeks"),     "7 days",        "1 week = 7 days");
        test.equal(moment.humanizeDuration(25, "days"),     "25 days",       "25 days = 25 days");
        test.equal(moment.humanizeDuration(26, "days"),     "a month",       "26 days = a month");
        test.equal(moment.humanizeDuration(30, "days"),     "a month",       "30 days = a month");
        test.equal(moment.humanizeDuration(45, "days"),     "a month",       "45 days = a month");
        test.equal(moment.humanizeDuration(46, "days"),     "2 months",      "46 days = 2 months");
        test.equal(moment.humanizeDuration(74, "days"),     "2 months",      "75 days = 2 months");
        test.equal(moment.humanizeDuration(76, "days"),     "3 months",      "76 days = 3 months");
        test.equal(moment.humanizeDuration(1, "months"),    "a month",       "1 month = a month");
        test.equal(moment.humanizeDuration(5, "months"),    "5 months",      "5 months = 5 months");
        test.equal(moment.humanizeDuration(344, "days"),    "11 months",     "344 days = 11 months");
        test.equal(moment.humanizeDuration(345, "days"),    "a year",        "345 days = a year");
        test.equal(moment.humanizeDuration(547, "days"),    "a year",        "547 days = a year");
        test.equal(moment.humanizeDuration(548, "days"),    "2 years",       "548 days = 2 years");
        test.equal(moment.humanizeDuration(1, "years"),     "a year",        "1 year = a year");
        test.equal(moment.humanizeDuration(5, "years"),     "5 years",       "5 years = 5 years");
        test.equal(moment.humanizeDuration(7200000),        "2 hours",     "7200000 = 2 minutes");
        test.done();
    },

    "humanize duration with suffix" : function(test) {
        test.expect(3);
        moment.lang('en');
        test.equal(moment.humanizeDuration(44, "seconds", true),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(moment.humanizeDuration(-44, "seconds", true),  "a few seconds ago", "44 seconds = a few seconds");
        test.equal(moment.humanizeDuration(44000, true),  "in a few seconds", "44000 milliseconds = a few seconds");
        test.done();
    }
};
