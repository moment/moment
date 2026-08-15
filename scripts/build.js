const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');

const ROOT = path.resolve(__dirname, '..');
const TMP_DIR = 'build/tmp';
const headerCache = {};

process.chdir(ROOT);

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, contents) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, contents);
}

function listFiles(directory) {
    return fs
        .readdirSync(directory, { withFileTypes: true })
        .flatMap(function (entry) {
            const file = path.join(directory, entry.name);
            return entry.isDirectory() ? listFiles(file) : [file];
        })
        .sort();
}

function collectComments(filename) {
    return read(filename)
        .split('\n')
        .filter(function (line) {
            return line.startsWith('//!');
        })
        .join('\n');
}

function stripMetadataComments(code) {
    let removedMetadata = false;
    return code
        .split('\n')
        .filter(function (line) {
            const comment = line.trim();
            if (
                comment.startsWith('//!') &&
                comment !== '//! moment.js' &&
                comment !== '//! moment.js locale configuration'
            ) {
                removedMetadata = true;
                return false;
            }
            if (removedMetadata && comment === '') {
                removedMetadata = false;
                return false;
            }
            removedMetadata = false;
            return true;
        })
        .join('\n');
}

function getHeader(headerFile) {
    if (headerFile === 'none') {
        return '';
    }
    if (!(headerFile in headerCache)) {
        headerCache[headerFile] = read(headerFile);
    }
    return headerCache[headerFile];
}

async function rollupBundle(options) {
    const inputOptions = {
        input: options.entry,
        strictDeprecations: true,
        onwarn: function (warning, defaultHandler) {
            if (warning.code !== 'CIRCULAR_DEPENDENCY') {
                defaultHandler(warning);
            }
        },
    };
    const outputOptions = {
        format: options.format || 'umd',
        name: options.umdName || 'not_used',
    };

    if (options.skipMoment) {
        inputOptions.external = [
            './moment',
            '../moment',
            '../../moment',
            path.resolve('src/moment'),
            path.resolve('build/tmp/moment'),
        ];
        outputOptions.globals = {};
        outputOptions.globals[path.resolve('src/moment')] = 'moment';
        outputOptions.globals[path.resolve('build/tmp/moment')] = 'moment';
    }

    const bundle = await rollup(inputOptions);
    const result = await bundle.generate(outputOptions);
    await bundle.close();
    return result.output[0].code;
}

async function transpile(options) {
    const headerFile = options.headerFile || 'templates/default.js';
    const header = getHeader(headerFile);
    const skipLines = options.skipLines == null ? 5 : options.skipLines;
    const entry = path.join(options.base, options.entry);
    let code = await rollupBundle({
        entry: entry,
        skipMoment: options.skipMoment || false,
        umdName:
            options.headerFile != null && options.headerFile !== 'none'
                ? 'not_used'
                : options.umdName,
        format: options.format,
    });
    code = stripMetadataComments(code);

    if (header && code.endsWith('\n}));\n')) {
        code = code.slice(0, -5) + '})));\n';
    }
    code = header + code.split('\n').slice(skipLines).join('\n');
    if (options.moveComments) {
        code = collectComments(entry) + '\n\n' + code;
    }
    write(options.target, code);
}

async function transpileLocales(localeFiles) {
    const batchSize = 50;
    for (let i = 0; i < localeFiles.length; i += batchSize) {
        await Promise.all(
            localeFiles.slice(i, i + batchSize).map(function (file) {
                return transpile({
                    base: 'src',
                    entry: file,
                    headerFile: 'templates/locale-header.js',
                    skipMoment: true,
                    moveComments: true,
                    target: path.join('build/umd', file),
                });
            })
        );
    }
}

function prepareTemp() {
    listFiles('src')
        .filter(function (file) {
            return file.endsWith('.js');
        })
        .forEach(function (file) {
            const target = path.join(TMP_DIR, path.relative('src', file));
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.copyFileSync(file, target);
        });
}

async function generateLocales(target, localeFiles, skipMoment) {
    const code = ['import moment from "./moment";', 'export default moment;']
        .concat(
            localeFiles.map(function (file) {
                const identifier = path.basename(file, '.js').replace('-', '_');
                return 'import ' + identifier + ' from "./' + file + '";';
            })
        )
        .concat(["moment.locale('en');"])
        .join('\n');
    const entry = path.basename(target);

    write(path.join(TMP_DIR, entry), code);
    await transpile({
        base: TMP_DIR,
        entry: entry,
        target: target,
        skipMoment: skipMoment,
        headerFile: skipMoment
            ? 'templates/locale-header.js'
            : 'templates/default.js',
    });
}

function getRequestedLocales() {
    const optionIndex = process.argv.indexOf('--locales');
    let value;

    if (optionIndex !== -1) {
        value = process.argv[optionIndex + 1];
    } else {
        const option = process.argv.find(function (arg) {
            return arg.startsWith('--locales=');
        });
        value = option && option.slice('--locales='.length);
    }
    if (!value) {
        return null;
    }
    return value.split(',').map(function (locale) {
        const file = 'locale/' + locale + '.js';
        if (!fs.existsSync(path.join('src', file))) {
            throw new Error('could not find locale: ' + locale);
        }
        return file;
    });
}

async function build() {
    const localeFiles = listFiles('src/locale').map(function (file) {
        return path.relative('src', file);
    });
    const customLocales = getRequestedLocales();

    fs.rmSync('build', { recursive: true, force: true });
    await transpile({
        base: 'src',
        entry: 'moment.js',
        umdName: 'moment',
        target: 'build/umd/moment.js',
        moveComments: true,
    });
    console.log('build/umd/moment.js');

    await transpile({
        base: 'src',
        entry: 'moment.js',
        umdName: 'moment',
        headerFile: 'templates/empty.js',
        target: 'build/esm/moment.js',
        format: 'es',
        skipLines: 0,
        moveComments: true,
    });
    console.log('build/esm/moment.js');

    await transpileLocales(localeFiles);
    console.log('build/umd/locale/*.js');

    prepareTemp();
    await generateLocales('build/umd/min/locales.js', localeFiles, true);
    console.log('build/umd/min/locales.js');
    await generateLocales(
        'build/umd/min/moment-with-locales.js',
        localeFiles,
        false
    );
    console.log('build/umd/min/moment-with-locales.js');

    if (customLocales) {
        await generateLocales(
            'build/umd/min/locales.custom.js',
            customLocales,
            true
        );
        await generateLocales(
            'build/umd/min/moment-with-locales.custom.js',
            customLocales,
            false
        );
        const moment = require('../build/umd/min/moment-with-locales.custom.js');
        if (
            moment.locales().filter(function (locale) {
                return locale !== 'en';
            }).length !== customLocales.length
        ) {
            throw new Error(
                "Some requested locales depend on a parent locale that wasn't included"
            );
        }
        console.log('build/umd/min/*.custom.js');
    }
}

build().catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
