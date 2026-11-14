const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const hooksPath = childProcess
    .execFileSync(
        'git',
        ['rev-parse', '--path-format=absolute', '--git-path', 'moment-hooks'],
        { cwd: root, encoding: 'utf8' }
    )
    .trim();

fs.mkdirSync(hooksPath, { recursive: true });

['post-checkout', 'pre-commit'].forEach(function (hook) {
    const destination = path.join(hooksPath, hook);

    fs.copyFileSync(path.join(root, '.githooks', hook), destination);
    fs.chmodSync(destination, 0o755);
});

childProcess.execFileSync(
    'git',
    ['config', '--local', 'core.hooksPath', hooksPath],
    { cwd: root }
);

console.log('Installed Git hooks in ' + hooksPath);
