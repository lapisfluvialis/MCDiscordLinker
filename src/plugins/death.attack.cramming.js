const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was squished too much\n/ ,
            text: {
                ja_jp: '`%s は押しつぶされた`',
                en_us: '`%s was squished too much`',
            },
        };
    }
}