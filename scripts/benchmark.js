const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');

const requested = process.argv.slice(2);
const files = (requested.length ? requested : fs.readdirSync('benchmarks'))
    .map(function (file) {
        return file.endsWith('.js') ? file : file + '.js';
    })
    .filter(function (file) {
        return fs.existsSync(path.join('benchmarks', file));
    });

async function run(file) {
    const benchmark = require('../benchmarks/' + file);
    const tests = Array.isArray(benchmark.tests)
        ? benchmark.tests
        : Object.keys(benchmark.tests).map(function (name) {
              const test = benchmark.tests[name];
              return Object.assign({ name: name }, test);
          });
    const suite = new Benchmark.Suite(benchmark.name);

    tests.forEach(function (test, index) {
        suite.add(Object.assign({ name: '<Test #' + (index + 1) + '>' }, test));
    });
    suite.on('cycle', function (event) {
        console.log(String(event.target));
    });
    console.log('\n' + benchmark.name + ' [' + file + ']');
    await new Promise(function (resolve) {
        suite.on('complete', resolve).run({ async: true });
    });
}

files.reduce(function (promise, file) {
    return promise.then(function () {
        return run(file);
    });
}, Promise.resolve());
