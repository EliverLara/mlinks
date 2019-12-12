#! /usr/bin/env node

'use strict';

const execa = require('execa')
const argv = require('yargs')
    .options({
        't': {
            alias: 'target',
            demandOption: true,
            type: 'string'
        },
        'o': {
            alias: 'output',
            demandOption: true,
            type: 'array'
        }
    })
    .usage("@0 -t TARGET -o lINK1 LINK2 ... -- <ln options>")
    .help('help')
    .argv


let links = argv.o.map(link => execa('ln', [...argv._, argv.t, link]))

Promise.all(links)
       .then(res => { if(res) console.log('Done')})
       .catch(err => console.error(err.stderr))