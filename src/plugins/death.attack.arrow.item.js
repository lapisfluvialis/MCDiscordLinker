const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was shot by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で射抜かれた`',
                en_us: '`%s was shot by %s using %s`',
            },
        };
    }
}