const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) drowned\n/ ,
            text: {
                ja_jp: '`%s は溺れ死んだ`',
                en_us: '`%s drowned`',
            },
        };
    }
}