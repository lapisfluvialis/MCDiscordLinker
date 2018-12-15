const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was fireballed by (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s に火だるまにされた`',
                en_us: '`%s was fireballed by %s`',
            },
        };
    }
}