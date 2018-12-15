const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was shot by (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s に射抜かれた`',
                en_us: '`%s was shot by %s`',
            },
        };
    }
}