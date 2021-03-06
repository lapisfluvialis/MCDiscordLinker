import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackFireworks extends MinecraftPlugin {
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: (.+) went off with a bang\n/ ;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`%s は花火の爆発に巻き込まれた`',
        'en_US': '`%s went off with a bang`',
    }
}