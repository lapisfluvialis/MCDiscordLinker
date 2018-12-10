const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+?) left the game/,
            text: {
                ja_jp: '[INFO]: %s がゲームを退出しました',
                en_us: '[INFO]: %s left the game',
            },
        };
    }
}