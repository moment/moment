var https = require("https"),
	zlib = require('zlib'),
	path = require('path'),
	fs = require('fs');


var stable = '1.6.1';

function getVersion(path, cb) {
	var data = '',
		
		req = https.request({
		host: 'raw.github.com',
		port: 443,
		path: '/timrwood/moment/' + path
	}, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function(e) {
			zlib.gzip(data, function(error, result) {
				cb(data.length, result.length);
			});
		});
	});
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	req.end();
}

function printDiffs(stableLen, stableGzip, currentLen, currentGzip) {
	var diff = currentLen - stableLen,
		gzipDiff = currentGzip - stableGzip;

	console.log("Filesize difference from current branch to " + stable);
	console.log(stable + "   " + stableLen + ' / ' + stableGzip);
	console.log("curr    " + currentLen + ' / ' + currentGzip);
	console.log("diff    " + (diff > 0 ? '+' : '') + diff);
	console.log("gzip    " + (gzipDiff > 0 ? '+' : '') + gzipDiff);
}

(function(){
	fs.readFile(path.normalize(__dirname + '/../min/moment.min.js'), 'utf8', function(err, data){
		if (err) {
			throw err;
		}
		zlib.gzip(data, function(error, result) {
			getVersion(stable + '/min/moment.min.js', function (stableLength, stableGzipLength) {
				printDiffs(stableLength, stableGzipLength, data.length, result.length);
			});
		});
	});
}());