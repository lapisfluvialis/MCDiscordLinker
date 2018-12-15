const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) starved to death\n/ ,
            text: {
                ja_jp: '`%s は飢え死にした`',
                en_us: '`%s starved to death`',
            },
        };
    }
}