const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was killed by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で殺された`',
                en_us: '`%s was killed by %s using %s`',
            },
        };
    }
}