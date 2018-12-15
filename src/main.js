module.exports = args => {
    const config = require(`${process.cwd()}/mcdl-config.json`);

    const child = require('child_process');
    const DiscordJs = require('discord.js');
    const iconv = require('iconv-lite');
    const fs = require('fs');

    const Plugins = fs.readdirSync(`${__dirname}/plugins`).filter(filename => fs.statSync(`${__dirname}/plugins/${filename}`).isFile()).map(filename => filename.replace(/\.js/,'')).sort().map(filename => require(`./plugins/${filename}`));

    console.log('Please wait...');

    const discord = new DiscordJs.Client();
    const minecraft = child.spawn('java',args,{stdio:'pipe'});

    discord.login(config.token);

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    discord.on('ready', () => {

        const plugins = Plugins.map(Plugin => new Plugin(discord, minecraft, config));

        process.stdin.on('data', chunk => {
            minecraft.stdin.write(`${chunk}`);
        });

        process.on('exit', () => {
            minecraft.kill();
            discord.destroy();
        });

        minecraft.stdout.on('data', chunk => {
            if (config.encoding === 'SHIFT-JIS') {
                chunk = iconv.decode(chunk,'SHIFT-JIS');
            }else{
                chunk = chunk.toString();
            }
            console.log(chunk.replace(/\n$/g, ''));

            const plugin = plugins.filter(plugin => plugin.minecraft).find(plugin => plugin.minecraft.re.test(chunk));
            if (plugin) {
                const options = plugin.minecraft.re.exec(chunk).slice(1);
                if (plugin.minecraft.text) plugin.sendToDiscord(plugin.minecraft.text[config.lang], options);
            }
        });
        minecraft.stdout.on('end', () => {
            process.exit(0);
        });

        discord.on('message', message => {
            if(!message.author.bot) {
                if(message.channel.id === config.channelId) {
                    const plugin = plugins.filter(plugin => plugin.discord).find(plugin => plugin.discord.re.test(message.content));
                    if (plugin) {
                        const options = plugin.discord.re.exec(message.content).slice(1);
                        plugin.sendToMinecraft(plugin.discord.command, options);
                    }else{
                        console.log(`[${new Date().toLocaleTimeString(undefined,{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})}] [MCDiscordLinker/DISCORD]: <${message.member.nickname || message.author.username}> ` + (message.content).replace(/\n$/g, ''));
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
                            body.push({
                                text: `${message.attachments.map(MessageAttachment => MessageAttachment.filename)}`,
                                underlined: true,
                                clickEvent:{
                                    action: 'open_url',
                                    value: `${message.attachments.map(MessageAttachment => MessageAttachment.url)}`
                                }
                            });
                        }
                        minecraft.stdin.write(`tellraw @a ${JSON.stringify(body)}\n`);
                    }
                }else if(message.channel.id === config.opChannelId) {
                    minecraft.stdin.write(`${message.content}\n`);
                }
            }
        });
    });
}