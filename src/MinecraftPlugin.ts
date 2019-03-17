import MinecraftServer from "./MinecraftServer";
import DiscordClient from "./DiscordClient";

export default abstract class MinecraftPlugin {
    public abstract readonly matcher: RegExp;
    protected readonly discordClient: DiscordClient;
    protected readonly minecraftServer: MinecraftServer;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        this.discordClient = discordClient;
        this.minecraftServer = minecraftServer;
    }
    public exec(logStr: string): void {
        const match = logStr.match(this.matcher);
        if (!match) return;
        this.matched(match.slice(1));
    }
    protected abstract matched(match: string[]) :void;
}