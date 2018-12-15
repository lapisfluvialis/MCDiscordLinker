const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was killed by (.+) trying to hurt (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s を傷つけようとして %s に殺された`',
                en_us: '`%s was killed by %s trying to hurt %s`',
            },
        };
    }
}