const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) starved to death whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながら飢え死にした`',
                en_us: '`%s starved to death whilst fighting %s`',
            },
        };
    }
}