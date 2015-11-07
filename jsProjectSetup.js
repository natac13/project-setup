#!/usr/bin/env babel-node

import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';

/*** Promise.wrap method which will turn callbacks into Promises ***/
import './utils/PromiseWrapper';

var Dependencies = require('./utils/Dependencies');
var devDepend = Dependencies.dev;
var proDepend = Dependencies.pro;

var npmInstallDev = `npm install --save-dev ${devDepend.join(' ')}`;
var npmInstallDep = `npm install --save ${proDepend.join(' ')}`;

import eslintRules from './contents/eslintRules';
import gulpTasks   from './contents/gulpTasks';
import nodemon     from './contents/nodemon';
import npm         from './contents/npm';

/*==============================================
=            Promisify fs functions            =
===============================================*/
const mkdir     = Promise.wrap(fs.mkdir);
const open      = Promise.wrap(fs.open);
const writeFile = Promise.wrap(fs.writeFile);
/*=====  End of Promisify fs functions  ======*/


const fail = (err) => { console.log(err); }



// exec(npmInstallDev, function(error, stdout, stderr) {
//     if(error) { throw error; }
//     console.log(stdout);
// });

/*===============================
=            Folders            =
===============================*/


mkdir('./app')
    .then(() => { console.log('Created app/'); }, fail);

mkdir('./public')
    .then(mkdir('./public/js'), fail)
    .then(mkdir('./public/css'), fail)
    .then(() => {
        console.log('Created public/, public/js/ and public/css/ folders');
    }, fail);




// var wwwFile = `
// #!/usr/bin/env node

// var app = require('./../server');
// var port = process.env.PORT || 3000;

// app.listen(port, function() {
//     console.log('Listening on Port ' + port);
// });
// `
// mkdir('./bin', function(err, data) {
//     if (err) { throw err; }
//     writeFile('./bin/www', wwwFile, function(err, data) {
//         if (err) { throw err; }
//         console.log('created the www file inside bin');
//     })
//     console.log('bin directory created');
// });



/*=====  End of Folders  ======*/


/*====================================
=            config files            =
====================================*/

const babelPresets = `
{
    "presets": [
        "es2015",
        "react"
    ]
}`;

writeFile('.babelrc', babelPresets)
    .then(() => {
        console.log('Created .babelrc with presets react and es2015');
    }, fail);

const gitignore = `
node_modules/
bower_components
`;

writeFile('.gitignore', gitignore)
    .then(() => { console.log('Created .gitignore'); }, fail);

writeFile('.eslintrc', eslintRules)
    .then(() => { console.log('Created .eslintrc'); }, fail);

writeFile('nodemon.json', nodemon)
    .then(() => { console.log('Created nodemon.json');}, fail);

/*=====  End of config files  ======*/

/*====================================
=            package.json            =
====================================*/

writeFile('package.json', npm)
    .then(() => {
        console.log('Created package.json ---> Run: npm install')
    }, fail);

/*=====  End of package.json  ======*/


/*================================
=            Gulpfile            =
================================*/

writeFile('gulpfile.babel.js', gulpTasks)
    .then(() => { console.log('Created basic gulpfile'); });

/*=====  End of Gulpfile  ======*/

open('README.md', 'wx')
    .then(() => { console.log('Created README.md'); }, fail);

open('server.js', 'wx')
    .then(() => { console.log('Created empty server.js'); }, fail);

/*====================================
=            Licence file            =
====================================*/

const date = new Date()
const mitLicence = `
Copyright (c) ${date.getFullYear()} Sean Campbell


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
`;

writeFile('LICENCE', mitLicence)
    .then(() => { console.log('LICENCE created'); }, fail);

/*=====  End of Licence file  ======*/

