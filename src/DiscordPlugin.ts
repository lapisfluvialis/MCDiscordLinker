import MinecraftServer from "./MinecraftServer";
import DiscordClient from "./DiscordClient";
import { Message } from "discord.js";

export default abstract class DiscordPlugin {
    public abstract readonly matcher: RegExp;
    public abstract readonly onOpChannel: boolean;
    protected readonly discordClient: DiscordClient;
    protected readonly minecraftServer: MinecraftServer;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        this.discordClient = discordClient;
        this.minecraftServer = minecraftServer;
    }
    public exec(message: Message): void {
        this.matched(message);
    }
    protected abstract matched(message: Message) :void;
}