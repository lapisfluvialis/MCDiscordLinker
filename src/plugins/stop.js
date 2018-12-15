const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server Shutdown Thread\/INFO\]: Stopping server/,
            text: {
                ja_jp: '`[INFO]: サーバーが閉鎖されました`',
                en_us: '`[INFO]: Server closed`',
            },
        };
    }
}