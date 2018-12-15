const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) tried to swim in lava to escape (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s から逃れようと溶岩遊泳を試みた`',
                en_us: '`%s tried to swim in lava to escape %s`',
            },
        };
    }
}