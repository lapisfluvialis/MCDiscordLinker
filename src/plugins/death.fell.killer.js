const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was doomed to fall\n/ ,
            text: {
                ja_jp: '`%s は落ちる運命だった`',
                en_us: '`%s was doomed to fall`',
            },
        };
    }
}