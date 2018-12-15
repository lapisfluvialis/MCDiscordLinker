const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) tried to swim in lava\n/ ,
            text: {
                ja_jp: '`%s は溶岩遊泳を試みた`',
                en_us: '`%s tried to swim in lava`',
            },
        };
    }
}