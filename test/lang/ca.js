var moment = require("../../moment");


    /**************************************************
      Català
     *************************************************/

exports["lang:ca"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('ca');
    
        var tests = "Gener Gen._Febrer Febr._Març Mar._Abril Abr._Maig Mai._Juny Jun._Juliol Jul._Agost Ag._Setembre Set._Octubre Oct._Novembre Nov._Desembre Des.".split("_");
    
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

    "format ordinal" : function(test) {
        test.expect(31);
        moment.lang('ca');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');
    
        test.equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');
    
        test.equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');
    
        test.equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('ca');
        var expected = "Gener Gen._Febrer Febr._Març Mar._Abril Abr._Maig Mai._Juny Jun._Juliol Jul._Agost Ag._Setembre Set._Octubre Oct._Novembre Nov._Desembre Des.".split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('ca');
        var expected = "Diumenge Dg._Dilluns Dl._Dimarts Dt._Dimecres Dc._Dijous Dj._Divendres Dv._Dissabte Ds.".split("_");
    
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('ca');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "uns segons", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minut",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minut",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuts",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuts",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "una hora",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "una hora",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 hores",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 hores",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 hores",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un dia",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un dia",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dies",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un dia",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dies",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dies",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mes",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mes",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mes",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mesos",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mesos",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mesos",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mes",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mesos",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mesos",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un any",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un any",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anys",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un any",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anys",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('ca');
        test.equal(moment(30000).from(0), "en uns segons",  "prefix");
        test.equal(moment(0).from(30000), "fa uns segons", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('ca');
        test.equal(moment().fromNow(), "fa uns segons",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('ca');
        test.equal(moment().add({s:30}).fromNow(), "en uns segons", "en uns segons");
        test.equal(moment().add({d:5}).fromNow(), "en 5 dies", "en 5 dies");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(7);
        moment.lang('ca');
    
        var a = moment().hours(2).minutes(0).seconds(0);
    
        test.equal(moment(a).calendar(),                         "avui a les 2:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),          "avui a les 2:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),           "avui a les 3:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),           "demà a les 2:00",  "tomorrow at the same time");
        test.equal(moment(a).add({ d: 1, h : -1 }).calendar(),   "demà a la 1:00",   "tomorrow minus 1 hour");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),      "avui a la 1:00",      "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),      "ahir a les 2:00",    "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('ca');
    
        var i;
        var m;
    
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('ca');
    
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('ca');
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