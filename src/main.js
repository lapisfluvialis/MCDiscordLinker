'use strict';

let config = {};
let msg;

(async () => {
    if(process.argv[2]) {
        try {
            run(process.argv.slice(2),require(`${process.cwd()}/mcdl-config.json`));
        } catch (error) {
            await setting();
            console.log('Please wait...');
            run(process.argv.slice(2),require(`${process.cwd()}/mcdl-config.json`));
        }
    }else{
        setting();
    }    
})();

function run(args,config) {
    const child = require('child_process');
    const DiscordJs = require('discord.js');
    const iconv = require('iconv-lite');
    const util = require('util');

    msg = require(`./${config.lang}.json`);

    const replacer = {
        version:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: Starting minecraft server version (\S.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
        done:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: Done \((.*)s\)! For help, type "help"(?:(?:\r\n|\r|\n)(?:.+))*/,
        info:/\[..:..:..\] \[Server thread\/INFO\]: /g,
        joined:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (.+) joined the game(?:(?:\r\n|\r|\n)(?:.+))*/,
        left:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (.+) left the game(?:(?:\r\n|\r|\n)(?:.+))*/,
        list:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: There are .* of a max .* players online: (\S.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
        chat:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (<.+>) (.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
        server:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (\[Server\]) (.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
        stop:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server Shutdown Thread\/INFO\]: Stopping server(?:(?:\r\n|\r|\n)(?:.+))*/
    };
    
    const discord = new DiscordJs.Client();
    const minecraft = child.spawn('java',args,{stdio:'pipe'});

    discord.login(config.token);

    process.stdin.resume();
    if (config.encoding !== 'SHIFT-JIS') {
        process.stdin.setEncoding('utf8');
    }
    process.stdin.on('data', chunk => {
        if (config.encoding === 'SHIFT-JIS') {
            chunk = iconv.decode(chunk,'SHIFT-JIS');
        }
        sendToMinecraft(chunk);
    });

    discord.on('ready', () => {
        const channel = discord.channels.get(config.channelId);
        function sendToDiscord(message,...args) {
            // if (args.length > 0) {
                channel.send(util.format(message,...args).replace(/(?:\r\n|\r|\n)/g, ''));
            // }else{
            //     channel.send(message.replace(/(?:\r\n|\r|\n)/g, ''));
            // }
        }

        minecraft.stdout.on('data',chunk => {
            chunk = chunk.toString()
            if (config.encoding === 'SHIFT-JIS') {
                chunk = iconv.decode(chunk,'SHIFT-JIS');
            }
            console.log(chunk.replace(/\n$/g, ''));

            if (chunk.match(replacer.version)){
                const serverVersion = chunk.replace(replacer.version, '$1');
                sendToDiscord(msg.chat.server_starting,serverVersion);
                discord.user.setActivity(`Minecraft ${serverVersion}`, {type:"PLAYING"});
            }
            
            if (chunk.match(replacer.done)) {
                sendToDiscord(msg.chat.server_started,chunk.replace(replacer.done, '$1'));
            }
        
            if (chunk.match(replacer.joined)) {
                sendToDiscord(msg.chat.player_joined,chunk.replace(replacer.joined, '$1'));
            }
    
            if (chunk.match(replacer.left)) {
                sendToDiscord(msg.chat.player_left,chunk.replace(replacer.left, '$1'));
            }

            if(chunk.match(replacer.list)) {
                sendToDiscord(msg.chat.online,chunk.replace(replacer.list, '$1'));
            }
        
            if (chunk.match(replacer.chat)) {
                sendToDiscord(chunk.replace(replacer.chat, '**$1** $2'));
            }
        
            if (chunk.match(replacer.server)) {
                sendToDiscord(chunk.replace(replacer.server, '**$1** $2'));
            }
        
            if (chunk.match(replacer.stop)) {
                sendToDiscord(msg.chat.server_shutdown);
                discord.destroy();
            }
        });
        minecraft.stdout.on('end',() => {
            process.exit(0);
        });
    });

    discord.on('message', message => {
        if(!message.author.bot) {
            if(message.channel.id === config.channelId) {
                if (message.content === '/list') {
                    sendToMinecraft('list');
                }else{
                    console.log(`[${new Date().toLocaleTimeString(undefined,{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})}] [MCDiscordLinker/DISCORD]: <${message.member.nickname || message.author.username}> ` + (message.content).replace(/\n$/g, ''));
            
                    const tellraw = ('tellraw @a ' + JSON.stringify([{
                        text: '<'
                    },{
                        color: 'blue',
                        text: (message.member.nickname || message.author.username)
                    },{
                        color: 'white',
                        text:`> ${message.content}`
                    }]));
                
                    sendToMinecraft(tellraw);
                }
            }else if(message.channel.id === config.opChannelId) {
                sendToMinecraft(message.content);
            }
        }
        
    });
    function sendToMinecraft(command) {
        minecraft.stdin.write(command + '\n');
    }
}

async function setting() {
    const fs = require('fs');
    try {
        config = require(`${process.cwd()}/mcdl-config.json`);
        msg = require(`./${config.lang}.json`);
        console.log(msg.config.change);
    } catch (error) {
        msg = require(`./en.json`);
        console.log(msg.config.new);
    }
    
    // 言語設定
    console.log(msg.config.lang);
    config.lang = await listbox(['en','ja'],config.lang);
    msg = require(`./${config.lang}.json`);

    // 文字コード設定
    console.log(msg.config.encoding);
    config.encoding = await listbox(['UTF-8','SHIFT-JIS'],config.encoding);

    // トークン
    console.log(msg.config.token);
    config.token = await prompt(config.token);

    // チャンネルID
    console.log(msg.config.channel_id)
    config.channelId = await prompt(config.channelId);

    // 管理用チャンネルID
    console.log(msg.config.op_channel_id);
    config.opChannelId = await prompt(config.opChannelId);

    // 保存
    try {
        fs.writeFileSync(`${process.cwd()}/mcdl-config.json`, JSON.stringify(config, null, '    '));
        console.log(msg.config.saved);
    } catch (error) {
        console.log(error);
    }

    function prompt(currentValue) {
        console.log(msg.config.current_value + (currentValue || msg.config.undefined));
        return new Promise(resolve => {
            const rl = require('readline').createInterface(process.stdin, process.stdout);
            rl.prompt();
            rl.on('line',line => {
                rl.close();
                if (line !== '') {
                    console.log(msg.config.changed,line);
                    resolve(line);
                }else{
                    console.log(msg.config.nochange);
                    resolve(currentValue);
                }
            })
        });
    }

    function listbox(items,currentValue) {
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        
        const rl = readline.createInterface({
            input:process.stdin,
            output:process.stdout,
            terminal:false
        });

        let isFirst = true;

        function selectItem(indexOfSelectedItem) {
            isFirst? isFirst=false:console.log('\x1B['+(items.length+1)+'A');
            for (let i in items) {
                if (i == indexOfSelectedItem) {
                    console.log('\x1b[7m• %s\x1b[0m\x1B[K',items[i]);
                }else{
                    console.log('• ' + items[i] + '\x1B[K');
                }
            }
        }

        let value = 0;
        console.log(msg.config.current_value + (currentValue || msg.config.undefined));
        selectItem(value);
        process.stdin.setRawMode(true);

        return new Promise(resolve => {
            process.stdin.on('keypress',function self(key,ch){
                if(ch.name=="return") {
                    process.stdin.removeListener("keypress",self);
                    process.stdin.setRawMode(false);
                    rl.close();
                    console.log(msg.config.changed,items[value]);
                    resolve(items[value]);
                }
                if(ch.name === 'up') {
                    if (value > 0) {
                        value--;
                        selectItem(value);
                    }
                }
                if(ch.name === 'down') {
                    if (value < items.length - 1) {
                        value++;
                        selectItem(value);
                    }
                }
            });
        });
    }
}