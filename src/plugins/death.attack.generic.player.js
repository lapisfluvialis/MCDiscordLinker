const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) died because of (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s によって死亡した`',
                en_us: '`%s died because of %s`',
            },
        };
    }
}