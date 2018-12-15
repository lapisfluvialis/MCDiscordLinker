const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: Intentional Game Design\n/ ,
            text: {
                ja_jp: '`ゲームの仕様`',
                en_us: '`Intentional Game Design`',
            },
        };
    }
}