const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was squashed by a falling anvil\n/ ,
            text: {
                ja_jp: '`%s は落下してきた金床に押しつぶされた`',
                en_us: '`%s was squashed by a falling anvil`',
            },
        };
    }
}