var terminal = require('child_process').spawn('bash'),
	path = require('path'),
    util = require('util'),
	nodeunit = require('nodeunit');

var ZONES;


/******************************
	Get Timezone
******************************/

var currentTimezone = '';

function getTimezone() {
	var term = require('child_process').spawn('bash');

	term.stdout.on('data', function (data) {
		currentTimezone = data.toString().replace('Time Zone: ', '');
		getTimezoneList();
	});

	term.stdin.write('systemsetup gettimezone');
	term.stdin.end();
}

function getTimezoneList() {
	var term = require('child_process').spawn('bash'),
		data = '';

	term.stdout.on('data', function (d) {
		data += d;
	});

	term.stdout.on('end', function () {
		data = data.replace('Time Zones:', '');
		ZONES = data.match(/\S+/g);
		// console.log(ZONES);
		startTests();
	});

	term.stdin.write('systemsetup listtimezones');
	term.stdin.end();

}



/******************************
	Set Timezone
******************************/

var currentTimezone = '';

function setTimezone() {
	terminal.stdin.write('systemsetup settimezone ' + currentTimezone);
	terminal.stdin.end();
}


/******************************
	Tests
******************************/


var files = ['test/moment'],
	paths = files.map(function (p) {
		return path.join(process.cwd(), p);
	});

var globalfailures = '';

var f = 0;
var p = 0;

function errorLog(assertion) {
	if (!assertion.error) {
		return assertion;
	}

	var e = assertion.error;
	if (e.actual && e.expected) {
		var actual = util.inspect(e.actual, false, 10).replace(/\n$/, ''),
			expected = util.inspect(e.expected, false, 10).replace(/\n$/, ''),
			multiline = (actual.indexOf('\n') !== -1 || expected.indexOf('\n') !== -1),
			spacing = (multiline ? '\n' : ' ');
		e._message = e.message;
		e.stack = (
			e.name + ':' + spacing +
			actual + spacing + e.operator + spacing +
			expected + '\n' +
			e.stack.split('\n').slice(1).join('\n')
		);
	}
	return assertion;
}

var zone = '',
	nextZone = '';

function runTestIfNeeded() {
	if (zone === nextZone) {
		return;
	}
	nextZone = zone;

	console.log("-----------------------");
	console.log(zone + " testing started...");
	nodeunit.runFiles(paths, {
		testDone: function (name, assertions) {
			if (assertions.failures()) {
				console.log('\nFAILURE: ' + name);
				assertions.forEach(function (a) {
					if (a.failed()) {
						a = errorLog(a);
						if (a.error && a.message) {
							console.log('Assertion Message: ' + a.message);
						}
						console.log(a.error.stack);
					}
				});
			}
		},
		done: function (assertions) {
			if (assertions.failures()) {
				console.log('\n' + zone + ' had ' + assertions.failures() + ' failures');
				globalfailures += zone + ' had ' + assertions.failures() + ' failures\n';
				f++;
			} else {
				console.log(zone + ' passed all tests!');
				p++;
			}
			console.log("-----------------------");
			nextTest();
		}
	});
}

function runTest(zoned) {
	zone = zoned;
	terminal.stdin.write('systemsetup settimezone ' + zone + '\n');
}

terminal.stdout.on('data', function(d) {
	setTimeout(runTestIfNeeded, 100);
});


var i = 0;

function startTests() {
	nextTest();
	//setTimezone();
}

function nextTest() {
	if (i < ZONES.length) {
		runTest(ZONES[i]);
	} else {
		console.log("----------------------");
		console.log("----------------------");
		console.log(globalfailures);
		console.log("----------------------");
		console.log("----------------------");
		console.log("--- Total Failing " + f);
		console.log("----------------------");
		console.log("--- Total Passing " + p);
		console.log("----------------------");
		console.log("----------------------");
		setTimezone();
	}
	i++;
}


/******************************
	Start it off
******************************/


getTimezone();