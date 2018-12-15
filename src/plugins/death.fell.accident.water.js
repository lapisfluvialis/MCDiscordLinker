const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) fell out of the water\n/ ,
            text: {
                ja_jp: '`%s は水から落ちた`',
                en_us: '`%s fell out of the water`',
            },
        };
    }
}