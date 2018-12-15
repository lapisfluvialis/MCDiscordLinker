const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was squashed by a falling block\n/ ,
            text: {
                ja_jp: '`%s は落下してきたブロックに押しつぶされた`',
                en_us: '`%s was squashed by a falling block`',
            },
        };
    }
}