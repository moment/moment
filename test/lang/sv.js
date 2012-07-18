var moment = require("../../moment");


    /**************************************************
      English
     *************************************************/

exports["lang:sv"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('sv');
        var tests = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split("_");
        var i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    "format" : function(test) {
        test.expect(18);
        moment.lang('sv');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'söndag, februari 14e 2010, 3:25:50 pm'],
                ['ddd, hA',                            'sön, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2a 02 februari feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14e 14'],
                ['d do dddd ddd dd',                   '0 0e söndag sön sö'],
                ['DDD DDDo DDDD',                      '45 45e 045'],
                ['w wo ww',                            '8 8e 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45e day of the year'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '14 februari 2010'],
                ['LLL',                                '14 februari 2010 15:25'],
                ['LLLL',                               'söndag 14 februari 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function(test) {
        test.expect(31);
        moment.lang('sv');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1a', '1a');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2a', '2a');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');
    
        test.equal(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');
    
        test.equal(moment([2011, 0, 21]).format('DDDo'), '21a', '21a');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22a', '22a');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');
    
        test.equal(moment([2011, 0, 31]).format('DDDo'), '31a', '31a');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('sv');
    	var expected = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('sv');
        var expected = 'söndag sön sö_måndag mån må_tisdag tis ti_onsdag ons on_torsdag tor to_fredag fre fr_lördag lör lö'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('sv');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "några sekunder", "44 sekunder = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "en minut",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "en minut",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuter",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuter",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "en timme",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "en timme",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 timmar",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 timmar",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 timmar",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "en dag",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "en dag",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dagar",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "en dag",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dagar",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dagar",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "en månad",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "en månad",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "en månad",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 månader",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 månader",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 månader",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "en månad",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 månader",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 månader",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "ett år",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "ett år",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 år",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "ett år",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 år",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('sv');
        test.equal(moment(30000).from(0), "om några sekunder",  "prefix");
        test.equal(moment(0).from(30000), "för några sekunder sen", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('sv');
        test.equal(moment().fromNow(), "för några sekunder sen",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('sv');
        test.equal(moment().add({s:30}).fromNow(), "om några sekunder", "in a few seconds");
        test.equal(moment().add({d:5}).fromNow(), "om 5 dagar", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('sv');
    
        var a = moment().hours(2).minutes(0).seconds(0);
    
        test.equal(moment(a).calendar(),                     "Idag klockan 02:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Idag klockan 02:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Idag klockan 03:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Imorgon klockan 02:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Idag klockan 01:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Igår klockan 02:00",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('sv');
    
        var i;
        var m;
    
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('sv');
    
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[Förra] dddd[en klockan] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[Förra] dddd[en klockan] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[Förra] dddd[en klockan] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('sv');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");
    
        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
    test.done();
    }
};
