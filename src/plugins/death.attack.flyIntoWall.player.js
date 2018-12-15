const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) experienced kinetic energy whilst trying to escape (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s から逃れようとして運動エネルギーを体験した`',
                en_us: '`%s experienced kinetic energy whilst trying to escape %s`',
            },
        };
    }
}