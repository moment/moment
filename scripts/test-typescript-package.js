const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageDir = path.resolve(process.argv[2] || '.');
const fixtureDir = path.resolve('build/typing-tests');

if (!fs.existsSync(path.join(packageDir, 'package.json'))) {
    throw new Error('Package not found: ' + packageDir);
}

fs.rmSync(fixtureDir, { recursive: true, force: true });
for (const project of ['legacy', 'modern']) {
    fs.cpSync(
        path.join('typing-tests', project),
        path.join(fixtureDir, project),
        { recursive: true }
    );
}

function rewriteImports(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(
        function (entry) {
            const file = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                rewriteImports(file);
            } else if (file.endsWith('.ts')) {
                const source = fs.readFileSync(file, 'utf8');
                fs.writeFileSync(
                    file,
                    source
                        .replace("require('../../moment')", "require('moment')")
                        .replace("require('../../')", "require('moment')")
                );
            }
        }
    );
}

rewriteImports(fixtureDir);
fs.mkdirSync(path.join(fixtureDir, 'node_modules'), { recursive: true });
fs.symlinkSync(packageDir, path.join(fixtureDir, 'node_modules/moment'), 'dir');

const tests = [
    ['1.8', 'node_modules/typescript1/lib/tsc.js', ['--project', 'legacy']],
    [
        '2.9',
        'node_modules/typescript2/lib/tsc.js',
        [
            '--project',
            'legacy',
            '--types',
            'empty',
            '--typeRoots',
            'legacy/types',
        ],
    ],
    [
        '3.0',
        'node_modules/typescript3_0/lib/tsc.js',
        [
            '--project',
            'legacy',
            '--types',
            'empty',
            '--typeRoots',
            'legacy/types',
        ],
    ],
    ['3.1', 'node_modules/typescript3_1/lib/tsc.js', ['--project', 'modern']],
    ['3.9', 'node_modules/typescript3/lib/tsc.js', ['--project', 'modern']],
    ['4.9', 'node_modules/typescript4/bin/tsc', ['--project', 'modern']],
    ['5.9', 'node_modules/typescript5/bin/tsc', ['--project', 'modern']],
    ['6', 'node_modules/typescript6/bin/tsc', ['--project', 'modern']],
    ['7', 'node_modules/typescript/bin/tsc', ['--project', 'modern']],
];

tests.forEach(function ([version, compiler, args]) {
    console.log('TypeScript ' + version);
    const result = spawnSync(
        process.execPath,
        [path.resolve(compiler)].concat(args),
        {
            cwd: fixtureDir,
            stdio: 'inherit',
        }
    );
    if (result.status !== 0) {
        throw new Error('TypeScript ' + version + ' declaration test failed');
    }
});
