import DiscordPlugin from "../../DiscordPlugin";
import { Message } from "discord.js";
import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import MCDiscordLinker from "../../MCDiscordLinker";

export default class DiscordVersionPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = false;
    public readonly matcher: RegExp = /\/version/;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    protected matched(message: Message): void {
        this.discordClient.send(`\`MCDiscordLinker version ${MCDiscordLinker.version}\``);
    }
}