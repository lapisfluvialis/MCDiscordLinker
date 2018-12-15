const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was pummeled by (.+) using (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s の %s でぺしゃんこにされた`',
                en_us: '`%s was pummeled by %s using %s`',
            },
        };
    }
}