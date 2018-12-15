const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was slain by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で殺害された`',
                en_us: '`%s was slain by %s using %s`',
            },
        };
    }
}