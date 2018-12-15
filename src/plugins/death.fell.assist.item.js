const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was doomed to fall by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で落とされる運命だった`',
                en_us: '`%s was doomed to fall by %s using %s`',
            },
        };
    }
}