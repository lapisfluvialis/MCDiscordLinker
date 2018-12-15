const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) suffocated in a wall whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながら壁の中で窒息した`',
                en_us: '`%s suffocated in a wall whilst fighting %s`',
            },
        };
    }
}