const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was struck by lightning whilst fighting (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と戦いながら雷に打たれた`',
                en_us: '`%s was struck by lightning whilst fighting %s`',
            },
        };
    }
}