import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftDeathAttackAnvilPlayerPlugin extends MinecraftPlugin {
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: ([<\[]\S+?[>\]]) (.+)/;
    protected matched(match: string[]): void {
        match[1] = match[1].replace(/<@(.+?)>/g, (match, p1, offset, string) => this.replaceUserId(match, p1, offset, string));
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '**%s** %s',
        'en_US': '**%s** %s',
    }
    private replaceUserId(_match: string, p1: string, _offset: string, _string: string): string {
        const id = this.discordClient.members.get(p1);
        return id ? `<@${id}>` : `@${p1}`;
    }
}