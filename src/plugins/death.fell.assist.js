const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was doomed to fall by (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s に落とされる運命だった`',
                en_us: '`%s was doomed to fall by %s`',
            },
        };
    }
}