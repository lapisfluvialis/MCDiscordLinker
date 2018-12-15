const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) walked into fire whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながら火の中へ踏み入った`',
                en_us: '`%s walked into fire whilst fighting %s`',
            },
        };
    }
}