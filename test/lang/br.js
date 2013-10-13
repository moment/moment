var moment = require("../../moment");


    /**************************************************
      Breton
     *************************************************/

exports["lang:br"] = {
    setUp : function (cb) {
        moment.lang('br');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('br');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);
        var tests = "Genver Gen_C'hwevrer C'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker".split("_"), i;
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

    "format" : function (test) {
        test.expect(17);
        moment.lang('br');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      "Sul, C'hwevrer 14vet 2010, 3:25:50 pm"],
                ['ddd, h A',                            'Sul, 3 PM'],
                ['M Mo MM MMMM MMM',                   "2 2vet 02 C'hwevrer C'hwe"],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14vet 14'],
                ['d do dddd ddd dd',                   '0 0vet Sul Sul Su'],
                ['DDD DDDo DDDD',                      '45 45vet 045'],
                ['w wo ww',                            '6 6vet 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['DDDo [devezh] [ar] [vloaz]',       '45vet devezh ar vloaz'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 "14 a viz C'hwevrer 2010"],
                ['LLL',                                "14 a viz C'hwevrer 2010 3e25 PM"],
                ['LLLL',                               "Sul, 14 a viz C'hwevrer 2010 3e25 PM"]
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(31);
        moment.lang('br');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1añ', '1añ');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2vet', '2vet');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3vet', '3vet');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4vet', '4vet');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5vet', '5vet');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6vet', '6vet');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7vet', '7vet');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8vet', '8vet');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9vet', '9vet');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10vet', '10vet');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11vet', '11vet');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12vet', '12vet');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13vet', '13vet');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14vet', '14vet');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15vet', '15vet');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16vet', '16vet');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17vet', '17vet');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18vet', '18vet');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19vet', '19vet');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20vet', '20vet');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21vet', '21vet');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22vet', '22vet');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23vet', '23vet');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24vet', '24vet');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25vet', '25vet');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26vet', '26vet');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27vet', '27vet');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28vet', '28vet');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29vet', '29vet');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30vet', '30vet');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31vet', '31vet');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);
        moment.lang('br');
        var expected = "Genver Gen_C'hwevrer C'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker".split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);
        moment.lang('br');
        var expected = "Sul Sul Su_Lun Lun Lu_Meurzh Meu Me_Merc'her Mer Mer_Yaou Yao Ya_Gwener Gwe Gw_Sadorn Sad Sa".split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);
        moment.lang('br');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "un nebeud segondennoù", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "ur vunutenn",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "ur vunutenn",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 vunutenn",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 munutenn",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "un eur",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "un eur",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 eur",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 eur",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 eur",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "un devezh",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "un devezh",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 zevezh",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "un devezh",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 devezh",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 devezh",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "ur miz",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "ur miz",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "ur miz",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 viz",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 viz",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 miz",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "ur miz",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 miz",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 miz",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "ur bloaz",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "ur bloaz",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 vloaz",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "ur bloaz",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 bloaz",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        moment.lang('br');
        test.equal(moment(30000).from(0), "a-benn un nebeud segondennoù",  "prefix");
        test.equal(moment(0).from(30000), "un nebeud segondennoù 'zo", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);
        moment.lang('br');
        test.equal(moment().fromNow(), "un nebeud segondennoù 'zo",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);
        moment.lang('br');
        test.equal(moment().add({s: 30}).fromNow(), "a-benn un nebeud segondennoù", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "a-benn 5 devezh", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);
        moment.lang('br');

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Hiziv da 2e00 AM",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Hiziv da 2e25 AM",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Hiziv da 3e00 AM",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Warc'hoazh da 2e00 AM",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Hiziv da 1e00 AM",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Dec'h da 2e00 AM", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);
        moment.lang('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [da] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [da] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [da] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);
        moment.lang('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('dddd [paset da] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [paset da] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [paset da] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        test.expect(4);
        moment.lang('br');
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
        test.done();
    },

    "special mutations for years": function (test) {
        test.expect(12);
        moment.lang('br');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true), "ur bloaz", "mutation 1 year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 2}), true), "2 vloaz", "mutation 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 3}), true), "3 bloaz", "mutation 3 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 4}), true), "4 bloaz", "mutation 4 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), "5 bloaz", "mutation 5 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 9}), true), "9 bloaz", "mutation 9 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 10}), true), "10 vloaz", "mutation 10 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 21}), true), "21 bloaz", "mutation 21 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 22}), true), "22 vloaz", "mutation 22 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 133}), true), "133 bloaz", "mutation 133 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 148}), true), "148 vloaz", "mutation 148 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 261}), true), "261 bloaz", "mutation 261 years");
        test.done();
    },
    
    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/br'), 'br', "module should export br");
        }
        
        test.done();
    }
};
