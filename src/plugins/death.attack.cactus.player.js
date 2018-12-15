const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) walked into a cactus whilst trying to escape (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s から逃げようとしてサボテンにぶつかった`',
                en_us: '`%s walked into a cactus whilst trying to escape %s`',
            },
        };
    }
}