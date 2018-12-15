const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was killed by even more magic\n/ ,
            text: {
                ja_jp: '`%s は魔法の奔流で殺された`',
                en_us: '`%s was killed by even more magic`',
            },
        };
    }
}