#!/usr/bin/env node
'use strict';

const config = require('./config');

if (process.argv[2]) {
    if (process.argv[2] === '--config') {
        config.editConfig();
    }else{
        console.error('Invalid argument');
    }
}else if (config.existsConfig()) {
    const mcdl = require('./mcdl');
    mcdl;
}else{
    console.error('Config not found. Type "stop" to shutdown the Minecraft server.');
    process.exit();
}