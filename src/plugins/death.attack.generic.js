const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) died\n/ ,
            text: {
                ja_jp: '`%s は死んだ`',
                en_us: '`%s died`',
            },
        };
    }
}