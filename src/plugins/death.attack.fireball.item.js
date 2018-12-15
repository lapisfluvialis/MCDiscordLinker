const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was fireballed by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s で火だるまにされた`',
                en_us: '`%s was fireballed by %s using %s`',
            },
        };
    }
}