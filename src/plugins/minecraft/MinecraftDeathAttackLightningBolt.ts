import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackLightningBolt extends MinecraftPlugin {
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: (.+) was struck by lightning\n/ ;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`%s は雷に打たれた`',
        'en_US': '`%s was struck by lightning`',
    }
}