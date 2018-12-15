const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) went off with a bang\n/ ,
            text: {
                ja_jp: '`%s は花火の爆発に巻き込まれた`',
                en_us: '`%s went off with a bang`',
            },
        };
    }
}