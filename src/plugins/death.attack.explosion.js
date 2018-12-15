const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) blew up\n/ ,
            text: {
                ja_jp: '`%s は爆発に巻き込まれた`',
                en_us: '`%s blew up`',
            },
        };
    }
}