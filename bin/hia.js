#!/usr/bin/env node

require('babel-core/register');
require('babel-polyfill');
const hia = require('./../dist/index.js').default;
hia();
