import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackHotFloor extends MinecraftPlugin {
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: (.+) discovered the floor was lava\n/ ;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`%s は床が溶岩だったと気付いた`',
        'en_US': '`%s discovered the floor was lava`',
    }
}