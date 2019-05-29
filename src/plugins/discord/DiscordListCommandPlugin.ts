import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";

export default class DiscordListCommandPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = false;
    public readonly matcher: RegExp = /\/list/;
    protected matched(message: Message): void {
        this.minecraftServer.send('list\n');
    }
}