const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) hit the ground too hard\n/ ,
            text: {
                ja_jp: '`%s は地面と強く激突した`',
                en_us: '`%s hit the ground too hard`',
            },
        };
    }
}