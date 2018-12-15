const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: Actually, message was too long to deliver fully. Sorry! Here's stripped version: (.+)\n/ ,
            text: {
                ja_jp: '`メッセージが長過ぎたため、配信することができませんでした。以下はその一部です：%s`',
                en_us: '`Actually, message was too long to deliver fully. Sorry! Here\'s stripped version: %s`',
            },
        };
    }
}