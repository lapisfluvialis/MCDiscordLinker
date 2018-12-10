module.exports = class {
    constructor(discord, minecraft, config) {
        this.discord = discord;
        this.minecraft = minecraft;
        this.config = config;
        this.channel = this.discord.channels.get(this.config.channelId);
        this.opChannel = this.discord.channels.get(this.config.opChannelId);
        this.format = require('util').format;
    }
    sendToDiscord(text, options) {
        const message = options? this.format(text, ...options): text;
        this.channel.send(message);
    }
    sendToMinecraft(text, options) {
        const command = options? this.format(text, ...options): text;
        this.minecraft.stdin.write(`${command}\n`);
    }
}