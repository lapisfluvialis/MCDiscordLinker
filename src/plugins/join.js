const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+?) joined the game/,
            text: {
                ja_jp: '[INFO]: %s がゲームに参加しました',
                en_us: '[INFO]: %s joined the game',
            },
        };
    }
}