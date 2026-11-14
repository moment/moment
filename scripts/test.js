const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { rollup } = require('rollup');

const outputDir = path.resolve('build/qunit');
const momentEntry = path.resolve('src/moment.js');

function onwarn(warning, defaultHandler) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        defaultHandler(warning);
    }
}

function testFiles(group) {
    return fs
        .readdirSync(path.resolve('src/test', group))
        .filter((file) => file.endsWith('.js'))
        .sort()
        .map((file) => path.join(group, file.slice(0, -3)));
}

function selectedTests() {
    const onlyArgument = process.argv.find((argument) =>
        argument.startsWith('--only=')
    );

    if (!onlyArgument) {
        return testFiles('moment').concat(testFiles('locale'));
    }

    return onlyArgument
        .slice('--only='.length)
        .split(',')
        .flatMap((test) => {
            if (test === 'moment' || test === 'locale') {
                return testFiles(test);
            }
            return [test.replace(/\.js$/, '')];
        });
}

async function main() {
    const tests = selectedTests();

    fs.rmSync(outputDir, { force: true, recursive: true });

    const momentBundle = await rollup({
        input: momentEntry,
        onwarn,
        strictDeprecations: true,
    });
    await momentBundle.write({
        file: path.join(outputDir, 'moment.js'),
        format: 'cjs',
        sourcemap: true,
    });
    await momentBundle.close();

    const localeInput = Object.fromEntries(
        fs
            .readdirSync(path.resolve('src/locale'))
            .filter((file) => file.endsWith('.js'))
            .map((file) => [
                file.slice(0, -3),
                path.resolve('src/locale', file),
            ])
    );
    const localeBundle = await rollup({
        input: localeInput,
        external: (id) => id === momentEntry,
        onwarn,
    });
    await localeBundle.write({
        dir: path.join(outputDir, 'locale'),
        entryFileNames: '[name].js',
        format: 'cjs',
        paths: { [momentEntry]: '../moment' },
        sourcemap: true,
    });
    await localeBundle.close();

    for (let start = 0; start < tests.length; start += 20) {
        await Promise.all(
            tests.slice(start, start + 20).map(async (test) => {
                const bundle = await rollup({
                    input: path.resolve('src/test', test + '.js'),
                    external: (id) => id === momentEntry,
                    onwarn,
                });
                await bundle.write({
                    file: path.join(outputDir, 'test', test + '.js'),
                    format: 'cjs',
                    paths: { [momentEntry]: '../../moment' },
                    sourcemap: true,
                });
                await bundle.close();
            })
        );
    }

    const result = spawnSync(
        process.execPath,
        [
            require.resolve('qunit/bin/qunit'),
            '--reporter',
            path.resolve('scripts/qunit-reporter.js'),
        ].concat(
            tests.map((test) => path.join(outputDir, 'test', test + '.js'))
        ),
        { stdio: 'inherit' }
    );

    if (result.error) {
        throw result.error;
    }
    if (result.signal) {
        throw new Error('QUnit exited due to signal ' + result.signal);
    }
    process.exitCode = result.status;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
