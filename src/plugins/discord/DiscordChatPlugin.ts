import DiscordPlugin from "../../DiscordPlugin";
import DiscordClient from "../../DiscordClient";
import MinecraftServer from "../../MinecraftServer";
import { Message } from "discord.js";
import MCDiscordLinker from "../../MCDiscordLinker";

export default class DiscordChatPlugin extends DiscordPlugin {
    public readonly onOpChannel: boolean = false;
    public readonly matcher: RegExp = /^(?!\/).+/;
    constructor(discordClient: DiscordClient, minecraftServer: MinecraftServer) {
        super(discordClient, minecraftServer);
    }
    protected matched(message: Message): void {
        MCDiscordLinker.logger('DISCORD', `<${message.member.nickname || message.author.username}> ${message.content}`)
        const body = [{
            text: '<'
        },{
            color: 'blue',
            text: (message.member.nickname || message.author.username)
        },{
            color: 'white',
            text: `> ${message.content}`
        }];
        if (message.attachments.keyArray().length) {
            const attachment = {
                text: `${message.attachments.map(MessageAttachment => MessageAttachment.filename)}`,
                underlined: true,
                clickEvent:{
                    action: 'open_url',
                    value: `${message.attachments.map(MessageAttachment => MessageAttachment.url)}`
                }
            }
            body.push(attachment);
        }
        this.minecraftServer.send(`tellraw @a ${JSON.stringify(body)}\n`);
    }

}