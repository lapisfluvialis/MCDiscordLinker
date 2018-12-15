const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) went up in flames\n/ ,
            text: {
                ja_jp: '`%s は炎に巻かれた`',
                en_us: '`%s went up in flames`',
            },
        };
    }
}