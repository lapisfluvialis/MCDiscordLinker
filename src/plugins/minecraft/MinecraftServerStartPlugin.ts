import MinecraftPlugin from "../../MinecraftPlugin";
import MCDLLocalizableString from "../../MCDLLocalizableString";

export default class MinecraftServerStartPlugin extends MinecraftPlugin {
    public readonly matcher: RegExp = /\[..:..:..\] \[Server thread\/INFO\]: Starting minecraft server version (\S.+)/;
    protected matched(match: string[]): void {
        this.discordClient.setActivity(`Minecraft ${match[0]}`, 'PLAYING');
        this.discordClient.sendf(this.localizable, match);
    }
    private localizable: MCDLLocalizableString = {
        'ja_JP': '`[INFO]: Minecraft サーバー バージョン %s を起動中`',
        'en_US': '`[INFO]: Starting minecraft server version %s`',
    }
}