const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

if (fs.existsSync('./build')) {
    fse.removeSync('./build');
}

childProcess.execSync('react-scripts build', { stdio: 'inherit' });

fse.copySync(path.resolve('build'), path.resolve('server/build'), {
    overwrite: true,
});
fse.removeSync(path.resolve('build'));
