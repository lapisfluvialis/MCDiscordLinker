const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was impaled by (.+) with (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で突き抜かれた`',
                en_us: '`%s was impaled by %s with %s`',
            },
        };
    }
}