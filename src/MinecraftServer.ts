import { ChildProcess, spawn } from "child_process";
import { EventEmitter } from "events";
import { decode } from "iconv-lite";
import MCDLConfig from "./MCDLConfig";
import DiscordClient from "./DiscordClient";
import { readdirSync, statSync, PathLike } from "fs";
import MinecraftPlugin from "./MinecraftPlugin";
import MCDiscordLinker from "./MCDiscordLinker";

export default class MinecraftServer extends EventEmitter {
    private readonly config: MCDLConfig
    private readonly minecraft: ChildProcess;
    private readonly pluginPath: PathLike;
    private plugins: MinecraftPlugin[] | null = null;
    constructor(args: string[], config: MCDLConfig) {
        super();
        this.config = config;
        this.minecraft = spawn('java', args, {stdio: 'pipe'});
        this.pluginPath = `${__dirname}/plugins/minecraft`
        this.minecraft.stdout!.on('data', log => this.onServerLog(log));
        this.minecraft.stdout!.on('end', () => this.end());
        process.stdin.on('data', chunk => this.send(chunk));
        process.on('exit', () => this.exit());
    }
    private onServerLog(log: Buffer) {
        const logString = this.config.encoding === 'SHIFT-JIS' ? decode(log, 'SHIFT-JIS') : log.toString();
        process.stdout.write(logString);
        const matchedPlugin = this.plugins!.find(plugin => plugin.matcher.test(logString));
        if (!matchedPlugin) return;
        matchedPlugin.exec(logString);
    }
    public send(message: string) {
        this.minecraft.stdin!.write(message);
    }
    private end() {
        this.emit('end');
    }
    private exit() {
        this.minecraft.kill();
    }
    public loadMinecraftPlugins(discordClient: DiscordClient) {
        this.plugins = readdirSync(this.pluginPath)
            .filter(name => statSync(`${this.pluginPath}/${name}`).isFile())
            .map(filename => filename.replace(/\.js/,''))
            .sort()
            .map(file => {
                const MinecraftPlugin: {new(discordClient: DiscordClient, minecraftServer: MinecraftServer): MinecraftPlugin} = require(`${this.pluginPath}/${file}`)['default'];
                return new MinecraftPlugin(discordClient, this);
            });
        MCDiscordLinker.logger('INFO', `Loaded ${this.plugins.length} Minecraft plugins`);
    }
}