LANG_ALL = lang/*.js
TEST_ALL = test/prefix/prefix.js test/non-lang-tests.js test/lang/*.js test/prefix/suffix.js 

all: langs moment

moment:
	uglifyjs -o min/moment.min.js moment.js

langs: langtests
	cat $(LANG_ALL) | uglifyjs -o min/lang-all.min.js
	find lang -name "*.js" -exec uglifyjs -o min/'{}' '{}' \;

langtests:
	cat $(TEST_ALL) > test/all-tests.js

size: moment langs
# FILESIZE FOR ALL LANGS
	cp min/lang-all.min.js min/lang-all.min.gzip.js
	gzip min/lang-all.min.gzip.js
	gzip -l min/lang-all.min.gzip.js.gz
	rm min/lang-all.min.gzip.js.gz
# FILESIZE FOR LIBRARY
	cp min/moment.min.js min/moment.min.gzip.js
	gzip min/moment.min.gzip.js
	gzip -l min/moment.min.gzip.js.gz
	rm min/moment.min.gzip.js.gz

test: moment
	nodeunit ./test/non-lang ./test/lang

testmoment: moment
	nodeunit ./test/non-lang

testlang: 
	nodeunit ./test/lang