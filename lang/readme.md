# Using language files in the browser

The files in this directory are optimized for use with Node.js, hence the `require('../moment')` calls at the beginning of each file.

If you are looking to use these files in the browser, the minified version of these files in `/min/lang/` are a better fit. We do some trickery to make each language file work with or without requirejs. If you are interested in the details, check out `/tasks/minify-lang.js`.
