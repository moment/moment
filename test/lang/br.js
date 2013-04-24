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

    "parse" : function(test) {
        test.expect(96);
        var tests = "Genver Gen_C'hwevrer C'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker".split("_");
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
    } ,

    "format" : function(test) {
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
                ['DDDo \\devez\\h \\ar v\\lo\\az',       '45vet devezh ar vloaz'],
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

    "format ordinal" : function(test) {
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

    "format month" : function(test) {
        test.expect(12);
        moment.lang('br');
        var expected = "Genver Gen_C'hwevrer C'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker".split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    }
};
