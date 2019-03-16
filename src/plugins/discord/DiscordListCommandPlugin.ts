import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";
import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";

export default class DiscordListCommandPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = false;
    public readonly matcher: RegExp = /\/list/;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    protected matched(message: Message): void {
        this.minecraftServer.send('list\n');
    }
}