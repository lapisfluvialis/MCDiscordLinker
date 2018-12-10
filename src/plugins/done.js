const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: Done \((.+?)s\)! For help, type "help"/,
            text: {
                ja_jp: '[INFO]: 完了 (%s秒)!',
                en_us: '[INFO]: Done (%ss)!',
            },
        };
    }
}