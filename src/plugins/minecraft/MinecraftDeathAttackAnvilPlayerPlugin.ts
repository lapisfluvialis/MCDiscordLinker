import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackAnvilPlayerPlugin extends MinecraftPlugin {
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: (.+) was squashed by a falling anvil whilst fighting (.+)\n/ ;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`%s は %s と戦いながら落ちてきた金床に押しつぶされた`',
        'en_US': '`%s was squashed by a falling anvil whilst fighting %s`',
    }
}