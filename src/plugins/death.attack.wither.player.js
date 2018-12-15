const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) withered away whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながら干からびた`',
                en_us: '`%s withered away whilst fighting %s`',
            },
        };
    }
}