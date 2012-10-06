var moment = require("../../moment");


    /**************************************************
      Indonesia
     *************************************************/

exports["lang:id"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('id');
        var tests = 'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Agu_September Sep_Oktober Okt_November Nov_Desember Des'.split("_");
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
        test.expect(17);
        moment.lang('id');
        var a = [
                ['dddd, DD MMMM YYYY, HH:mm:ss',       'Minggu, 14 Februari 2010, 15:25:50'],
                ['ddd, HH:mm',                         'Min, 15:25'],
                ['M Mo MM MMMM MMM',                   '2 2 02 Februari Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 Minggu Min Min'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['\\h\\ari ke-DDDo \\d\\al\\a\\m \\set\\a\\hun', 'hari ke-45 dalam setahun'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Februari 2010'],
                ['LLL',                                '14 Februari 2010 15:25'],
                ['LLLL',                               'Minggu, 14 Februari 2010 15:25']
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
        moment.lang('id');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1st');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2nd');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3rd');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4th');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5th');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6th');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7th');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8th');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9th');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10th');
    
        test.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11th');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12th');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13th');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14th');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15th');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16th');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17th');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18th');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19th');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20th');
    
        test.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21st');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22nd');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23rd');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24th');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25th');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26th');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27th');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28th');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29th');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30th');
    
        test.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31st');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('id');
        var expected = 'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Agu_September Sep_Oktober Okt_November Nov_Desember Des'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('id');
        var expected = 'Minggu Min Min_Senin Sen Sen_Selasa Sel Sel_Rabu Rab Rab_Kamis Kam Kam_Jumat Jum Jum_Sabtu Sab Sab'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('id');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "beberapa detik", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "semenit",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "semenit",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 menit",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 menit",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "sejam",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "sejam",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 jam",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 jam",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 jam",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "sehari",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "sehari",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 hari",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "sehari",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 hari",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 hari",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "sebulan",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "sebulan",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "sebulan",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 bulan",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 bulan",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 bulan",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "sebulan",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 bulan",      "5 bulan = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 bulan",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "setahun",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "setahun",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 tahun",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "setahun",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 tahun",       "5 years = 5 years ");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('id');
        test.equal(moment(30000).from(0), "beberapa detik lagi",  "prefix");
        test.equal(moment(0).from(30000), "beberapa detik yang lalu", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('id');
        test.equal(moment().fromNow(), "beberapa detik yang lalu",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('id');
        test.equal(moment().add({s:30}).fromNow(), "beberapa detik lagi", "in a few seconds");
        test.equal(moment().add({d:5}).fromNow(), "5 hari lagi", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('id');
    
        var a = moment().hours(2).minutes(0).seconds(0);
    
        test.equal(moment(a).calendar(),                     "Hari ini jam 02:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Hari ini jam 02:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Hari ini jam 03:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Besok jam 02:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Hari ini jam 01:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Kemarin jam 02:00", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('id');
    
        var i;
        var m;
    
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [jam] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [jam] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [jam] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('id');
    
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('dddd [pekan lalu] [jam] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [pekan lalu] [jam] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [pekan lalu] [jam] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('id');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "seminggu yang lalu");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "seminggu lagi");
    
        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });
        
        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 minggu yang lalu");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "2 minggu lagi");
        test.done();
    }
};
