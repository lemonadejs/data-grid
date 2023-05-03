#! /usr/bin/env node

require('jsdom-global')(undefined, { url: 'https://localhost' });
const lemonade = require("lemonadejs");
const Datagrid = require("./src/datagrid.js");

global.lemonade = lemonade;
global.Datagrid = Datagrid;
global.root =  document.createElement('div');
global.root.style.width = '100%';
global.root.style.height = '100%';
document.body.appendChild(global.root);

exports.mochaHooks = {
    afterEach(done) {
        // destroy datagrid component
        done();
    },
};
