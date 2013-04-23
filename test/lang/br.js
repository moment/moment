var moment = require("../../moment");


    /**************************************************
      English
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
    }
};
