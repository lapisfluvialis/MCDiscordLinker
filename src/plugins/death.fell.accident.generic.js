const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) fell from a high place\n/ ,
            text: {
                ja_jp: '`%s は高い所から落ちた`',
                en_us: '`%s fell from a high place`',
            },
        };
    }
}