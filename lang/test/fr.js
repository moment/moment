
/**************************************************
  French
 *************************************************/

module("lang:fr");

test("parse", 96, function() {
    moment.lang('fr');
    var tests = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('fr');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, février 14ème 2010, 3:25:50 pm'],
            ['ddd, hA',                            'dim., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2ème 02 février févr.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14ème 14'],
            ['d do dddd ddd',                      '0 0ème dimanche dim.'],
            ['DDD DDDo DDDD',                      '45 45ème 045'],
            ['w wo ww',                            '8 8ème 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ème day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 février 2010'],
            ['LLL',                                '14 février 2010 15:25'],
            ['LLLL',                               'dimanche 14 février 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('fr');
    equal(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
    equal(moment([2011, 0, 2]).format('DDDo'), '2ème', '2ème');
    equal(moment([2011, 0, 3]).format('DDDo'), '3ème', '3ème');
    equal(moment([2011, 0, 4]).format('DDDo'), '4ème', '4ème');
    equal(moment([2011, 0, 5]).format('DDDo'), '5ème', '5ème');
    equal(moment([2011, 0, 6]).format('DDDo'), '6ème', '6ème');
    equal(moment([2011, 0, 7]).format('DDDo'), '7ème', '7ème');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ème', '8ème');
    equal(moment([2011, 0, 9]).format('DDDo'), '9ème', '9ème');
    equal(moment([2011, 0, 10]).format('DDDo'), '10ème', '10ème');

    equal(moment([2011, 0, 11]).format('DDDo'), '11ème', '11ème');
    equal(moment([2011, 0, 12]).format('DDDo'), '12ème', '12ème');
    equal(moment([2011, 0, 13]).format('DDDo'), '13ème', '13ème');
    equal(moment([2011, 0, 14]).format('DDDo'), '14ème', '14ème');
    equal(moment([2011, 0, 15]).format('DDDo'), '15ème', '15ème');
    equal(moment([2011, 0, 16]).format('DDDo'), '16ème', '16ème');
    equal(moment([2011, 0, 17]).format('DDDo'), '17ème', '17ème');
    equal(moment([2011, 0, 18]).format('DDDo'), '18ème', '18ème');
    equal(moment([2011, 0, 19]).format('DDDo'), '19ème', '19ème');
    equal(moment([2011, 0, 20]).format('DDDo'), '20ème', '20ème');

    equal(moment([2011, 0, 21]).format('DDDo'), '21ème', '21ème');
    equal(moment([2011, 0, 22]).format('DDDo'), '22ème', '22ème');
    equal(moment([2011, 0, 23]).format('DDDo'), '23ème', '23ème');
    equal(moment([2011, 0, 24]).format('DDDo'), '24ème', '24ème');
    equal(moment([2011, 0, 25]).format('DDDo'), '25ème', '25ème');
    equal(moment([2011, 0, 26]).format('DDDo'), '26ème', '26ème');
    equal(moment([2011, 0, 27]).format('DDDo'), '27ème', '27ème');
    equal(moment([2011, 0, 28]).format('DDDo'), '28ème', '28ème');
    equal(moment([2011, 0, 29]).format('DDDo'), '29ème', '29ème');
    equal(moment([2011, 0, 30]).format('DDDo'), '30ème', '30ème');

    equal(moment([2011, 0, 31]).format('DDDo'), '31ème', '31ème');
});

test("format month", 12, function() {
    moment.lang('fr');
    var expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('fr');
    var expected = 'dimanche dim._lundi lun._mardi mar._mercredi mer._jeudi jeu._vendredi ven._samedi sam.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('fr');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "quelques secondes", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "une minute",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "une minute",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutes",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutes", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "une heure",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "une heure",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 heures",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 heures",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 heures",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un jour",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un jour",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 jours",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un jour",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 jours",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 jours",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mois",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mois",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mois",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mois",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mois",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mois",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mois",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mois",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mois",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "une année",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "une année",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 années",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "une année",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 années",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('fr');
    equal(moment(30000).from(0), "dans quelques secondes", "prefix");
    equal(moment(0).from(30000), "il y a quelques secondes", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('fr');
    equal(moment().add({s:30}).fromNow(), "dans quelques secondes", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "dans 5 jours", "in 5 days");
});


test("same day", 6, function() {
    moment.lang('fr');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Ajourd'hui à 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Ajourd'hui à 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Ajourd'hui à 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Demain à 02:00",         "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Ajourd'hui à 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Hier à 02:00",           "yesterday at the same time");
});

test("same next week", 15, function() {
    moment.lang('fr');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days end of day");
    }
});

test("same last week", 15, function() {
    moment.lang('fr');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days end of day");
    }
});

test("same all else", 4, function() {
    moment.lang('fr');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});
