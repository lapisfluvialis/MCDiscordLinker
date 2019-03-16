import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackMessageTooLong extends MinecraftPlugin {
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: Actually; message was too long to deliver fully. Sorry! Here's stripped version: (.+)\n/;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`メッセージが長過ぎたため、配信することができませんでした。以下はその一部です：%s`',
        'en_US': '`Actually, message was too long to deliver fully. Sorry! Here\'s stripped version: %s`',
    }
}