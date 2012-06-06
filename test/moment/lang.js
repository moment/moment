var moment = require("../../moment");

exports.lang = {
    "getter" : function(test) {
        test.expect(4);

        moment.lang('en');
        test.equal(moment.lang(), 'en', 'Lang should return en by default');

        moment.lang('fr');
        test.equal(moment.lang(), 'fr', 'Lang should return the changed language');

        moment.lang('en-gb');
        test.equal(moment.lang(), 'en-gb', 'Lang should return the changed language');

        moment.lang('en');
        test.equal(moment.lang(), 'en', 'Lang should reset');

        test.done();
    },

    "different languages at the same time" : function(test) {
        test.expect(4);

        moment.lang('en');

        var moment_fr = moment.instantiateLibrary();
        moment_fr.lang('fr');

        test.equal(moment.lang(), 'en', 'First moment library instance should be en');
        test.equal(moment_fr.lang(), 'fr', 'Second moment library instance should be fr');

        test.equal(moment([2012, 5, 5]).format('dddd'), 'Tuesday', 'Default moment should format in English');
        test.equal(moment_fr([2012, 5, 5]).format('dddd'), 'mardi', 'Second moment should format in French');

        test.done();
    },
};
