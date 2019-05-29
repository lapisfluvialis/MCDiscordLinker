#!/usr/bin/env node

import MCDiscordClientLinker from "./MCDiscordLinker";
import config from './config';

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