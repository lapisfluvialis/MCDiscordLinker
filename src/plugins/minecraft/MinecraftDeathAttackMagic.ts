import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackMagic extends MinecraftPlugin {
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: (.+) was killed by magic\n/ ;
    protected matched(match: string[]): void {
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`%s は魔法で殺された`',
        'en_US': '`%s was killed by magic`',
    }
}