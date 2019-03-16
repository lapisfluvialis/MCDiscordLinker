import { readFileSync } from "fs";
import MCDLConfig from "./MCDLConfig";
import MinecraftServer from "./MinecraftServer";
import DiscordClient from "./DiscordClient";

export default class MCDiscordLinker {
    private readonly serverPath: string;
    private readonly config: MCDLConfig;
    private readonly minecraftServer: MinecraftServer;
    private readonly discordClient: DiscordClient;
    public static readonly version: string = '0.0.13';
    constructor(args :string[]) {
        MCDiscordLinker.logger('INFO', `Starting MCDiscordLinker Version ${MCDiscordLinker.version}`);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        this.serverPath = process.cwd();
        this.config = JSON.parse(readFileSync(`${this.serverPath}/mcdl-config.json`).toString());
        this.discordClient = new DiscordClient(this.config);
        this.minecraftServer = new MinecraftServer(args, this.config);

        this.discordClient.on('ready', () => this.init());
        this.minecraftServer.on('end', () => this.exit());
    }
    private exit() {
        process.exit(0);
    }
    private init() {
        MCDiscordLinker.logger('INFO', 'Loading plugins');
        this.minecraftServer.loadMinecraftPlugins(this.discordClient);
        this.discordClient.loadDiscordPlugins(this.minecraftServer);
    }
    public static logger(category: string, log: string) {
        console.log(`[${new Date().toLocaleTimeString(undefined, {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'})}] [MCDiscordLinker/${category}]: ${log}`);
    }
}