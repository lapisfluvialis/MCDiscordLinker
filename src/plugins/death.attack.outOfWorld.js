const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) fell out of the world\n/ ,
            text: {
                ja_jp: '`%s は奈落の底へ落ちた`',
                en_us: '`%s fell out of the world`',
            },
        };
    }
}