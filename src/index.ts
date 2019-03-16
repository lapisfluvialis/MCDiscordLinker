#!/usr/bin/env node

import MCDiscordClientLinker from "./MCDiscordLinker";

new MCDiscordClientLinker(process.argv.slice(2));