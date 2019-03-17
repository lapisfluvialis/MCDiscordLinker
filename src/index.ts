#!/usr/bin/env node

import MCDiscordClientLinker from "./MCDiscordLinker";

const config = require(`./config`);

(async () => {
    if(process.argv[2]) {
        try {
            new MCDiscordClientLinker(process.argv.slice(2));
        } catch (error) {
            await config();
            new MCDiscordClientLinker(process.argv.slice(2));
        }
    }else{
        await config();
    }
})();