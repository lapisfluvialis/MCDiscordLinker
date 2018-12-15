const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was impaled by (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s によって突き抜かれた`',
                en_us: '`%s was impaled by %s`',
            },
        };
    }
}