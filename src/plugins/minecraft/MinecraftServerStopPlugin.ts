import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftServerStopPlugin extends MinecraftPlugin {
    public readonly matcher: RegExp = /\[..:..:..\] \[.+?\/INFO\]: Stopping server/;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`[INFO]: サーバーが閉鎖されました`',
        'en_US': '`[INFO]: Server closed`',
    }
}