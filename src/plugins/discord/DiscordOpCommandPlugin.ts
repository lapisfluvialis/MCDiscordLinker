import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";

export default class DiscordOpCommandPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = true;
    public readonly matcher: RegExp = /.+/;
    protected matched(message: Message): void {
        this.minecraftServer.send(`${message.content}\n`);
    }
}