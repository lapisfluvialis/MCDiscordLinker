import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";
import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";

export default class DiscordOpCommandPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = true;
    public readonly matcher: RegExp = /.+/;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    protected matched(message: Message): void {
        this.minecraftServer.send(`${message.content}\n`);
    }
}