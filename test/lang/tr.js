var moment = require("../../moment");


    /**************************************************
      Turkish
     *************************************************/

exports["lang:tr"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('tr');
        var tests = 'Ocak Oca_Şubat Şub_Mart Mar_Nisan Nis_Mayıs May_Haziran Haz_Temmuz Tem_Ağustos Ağu_Eylül Eyl_Ekim Eki_Kasım Kas_Aralık Ara'.split("_");
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
        moment.lang('tr');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Pazar, Şubat 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Paz, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 Şubat Şub'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd',                      '0 0th Pazar Paz'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '8 8th 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45th day of the year'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 Şubat 2010'],
                ['LLL',                                '14 Şubat 2010 15:25'],
                ['LLLL',                               'Pazar, 14 Şubat 2010 15:25']
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
        moment.lang('tr');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');
    
        test.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');
    
        test.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');
    
        test.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('tr');
        var expected = 'Ocak Oca_Şubat Şub_Mart Mar_Nisan Nis_Mayıs May_Haziran Haz_Temmuz Tem_Ağustos Ağu_Eylül Eyl_Ekim Eki_Kasım Kas_Aralık Ara'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('tr');
        var expected = 'Pazar Paz_Pazartesi Pts_Salı Sal_Çarşamba Çar_Perşembe Per_Cuma Cum_Cumartesi Cts'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('tr');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "birkaç saniye", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "bir dakika",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "bir dakika",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 dakika",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 dakika",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "bir saat",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "bir saat",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 saat",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 saat",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 saat",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "bir gün",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "bir gün",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 gün",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "bir gün",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 gün",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 gün",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "bir ay",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "bir ay",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "bir ay",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 ay",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 ay",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 ay",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "bir ay",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 ay",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 ay",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "bir yıl",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "bir yıl",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 yıl",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "bir yıl",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 yıl",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('tr');
        test.equal(moment(30000).from(0), "birkaç saniye sonra",  "prefix");
        test.equal(moment(0).from(30000), "birkaç saniye önce", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('tr');
        test.equal(moment().fromNow(), "birkaç saniye önce",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('tr');
        test.equal(moment().add({s:30}).fromNow(), "birkaç saniye sonra", "in a few seconds");
        test.equal(moment().add({d:5}).fromNow(), "5 gün sonra", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('tr');
    
        var a = moment().hours(2).minutes(0).seconds(0);
    
        test.equal(moment(a).calendar(),                     "bugün saat 02:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "bugün saat 02:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "bugün saat 03:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "yarın saat 02:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "bugün saat 01:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "dün 02:00", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('tr');
    
        var i;
        var m;
    
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('[haftaya] dddd [saat] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[haftaya] dddd [saat] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[haftaya] dddd [saat] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('tr');
    
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[geçen hafta] dddd [saat] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[geçen hafta] dddd [saat] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[geçen hafta] dddd [saat] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('tr');
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