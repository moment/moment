LANG_ALL = $(wildcard lang/*.js)
MIN_LANG_ALL = $(addprefix min/,$(LANG_ALL))


.PHONY: all
all: moment langs

min/:
	mkdir min/

min/lang/:
	mkdir -p min/lang/

.PHONY: moment pretty
moment: min/ min/moment.min.js pretty

pretty: min/ min/moment.min.pretty.js

min/moment.min.js: moment.js
	node_modules/.bin/uglifyjs -o $@ $<

min/moment.min.pretty.js: moment.js
	node_modules/.bin/uglifyjs -b -o $@ $<

min/lang/%: lang/%
	node_modules/.bin/uglifyjs -o $@ $<

min/lang-all.min.js: $(LANG_ALL)
	cat $^ | node_modules/.bin/uglifyjs -o $@

.PHONY: langs
langs: min/lang/ $(MIN_LANG_ALL) min/lang-all.min.js

.PHONY: size
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

.PHONY: size-history
size-history: moment
	node test/filesize-history.js

size-diff: moment
	node test/filesize-diff.js


.PHONY: test hint test-moment test-lang
test: hint test-moment test-lang

hint:
	node_modules/.bin/jshint moment.js

test-moment:
	node_modules/.bin/nodeunit ./test/moment

test-lang:
	node_modules/.bin/nodeunit ./test/lang

.PHONY: clean
clean:
	rm -rf min/
