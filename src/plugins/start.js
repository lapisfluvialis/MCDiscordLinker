const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: Starting minecraft server version (\S.+)/,
            text: {
                ja_jp: '`[INFO]: Minecraft サーバー バージョン %s を起動中`',
                en_us: '`[INFO]: Starting minecraft server version %s`',
            },
        };
    }
    sendToDiscord(text, options) {
        super.sendToDiscord(text, options);
        this.discord.user.setActivity(`Minecraft ${options[0]}`, {type:'PLAYING'});
    }
}