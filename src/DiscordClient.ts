import { Client, Message, TextChannel } from 'discord.js';
import { EventEmitter } from 'events';
import MCDLConfig from './MCDLConfig';
import { format } from 'util';
import MCDLLocalizableString from './MCDLLocalizableString';
import { readdirSync, statSync, PathLike } from 'fs';
import DiscordPlugin from './DiscordPlugin';
import MinecraftServer from './MinecraftServer';
import MCDiscordLinker from './MCDiscordLinker';

export default class DiscordClient extends EventEmitter{
    private readonly config: MCDLConfig;
    private readonly client: Client;
    private pluginPath: PathLike;
    private plugins: DiscordPlugin[] | null = null ;
    constructor(config: MCDLConfig) {
        super();
        this.config = config;
        this.pluginPath = `${__dirname}/plugins/discord`
        this.client = new Client();
        this.client.login(this.config.token);

        this.client.on('ready', () => this.onReady());
        process.on('exit', () => this.exit());
    }
    private onReady() {
        this.client.on('message', message => this.onMessage(message));
        this.emit('ready');
    }
    private onMessage(message: Message) {
        const matchedPlugin = this.plugins!.find(plugin => plugin.matcher.test(message.content) && (message.channel.id === this.config.opChannelId) === plugin.onOpChannel);
        if (!matchedPlugin) return;
        matchedPlugin.exec(message);
    }
    public sendf(localizableString: MCDLLocalizableString, arg: string[] = [], toOpChannel?: boolean) {
        const formattableString = localizableString[this.config.lang];
        const message = format(formattableString, ...arg);
        this.send(message, toOpChannel);
    }
    public send(message: string, toOpChannel?: boolean) {
        const channelID = toOpChannel ? this.config.opChannelId : this.config.channelId;
        const channel = this.client.channels.get(channelID);
        if (channel instanceof TextChannel) channel.send(message);
    }
    public setActivity(name: string | null, type?: number | 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | undefined) {
        this.client.user.setActivity(name, {type})
    }
    private exit() {
        this.client.destroy();
    }
    public loadDiscordPlugins(minecraftServer: MinecraftServer) {
        this.plugins = readdirSync(this.pluginPath)
            .filter(name => statSync(`${this.pluginPath}/${name}`).isFile())
            .map(filename => filename.replace(/\.js/,''))
            .sort()
            .map(file => {
                const DiscordPlugin: {new(discordClient: DiscordClient, minecraftServer: MinecraftServer): DiscordPlugin} = require(`${this.pluginPath}/${file}`)['default'];
                return new DiscordPlugin(this, minecraftServer);
            });
        MCDiscordLinker.logger('INFO', `Loaded ${this.plugins.length} Discord plugins`);
    }
}