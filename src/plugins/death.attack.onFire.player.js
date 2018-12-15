const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was burnt to a crisp whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながらカリカリに焼けた`',
                en_us: '`%s was burnt to a crisp whilst fighting %s`',
            },
        };
    }
}