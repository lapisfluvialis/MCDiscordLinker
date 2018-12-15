const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) hit the ground too hard whilst trying to escape (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s から逃れようとして地面に強く激突した`',
                en_us: '`%s hit the ground too hard whilst trying to escape %s`',
            },
        };
    }
}