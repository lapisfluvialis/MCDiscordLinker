import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";
import MCDiscordLinker from "../../MCDiscordLinker";

export default class DiscordVersionPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = false;
    public readonly matcher: RegExp = /\/version/;
    protected matched(message: Message): void {
        this.discordClient.send(`\`MCDiscordLinker version ${MCDiscordLinker.version}\``);
    }
}