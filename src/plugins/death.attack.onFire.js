const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) burned to death\n/ ,
            text: {
                ja_jp: '`%s はこんがりと焼けた`',
                en_us: '`%s burned to death`',
            },
        };
    }
}