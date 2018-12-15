const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was blown up by (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s に爆破された`',
                en_us: '`%s was blown up by %s`',
            },
        };
    }
}