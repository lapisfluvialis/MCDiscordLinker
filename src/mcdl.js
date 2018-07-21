const Discord = require('discord.js');
const Rcon = require('modern-rcon');

const config = require(`${process.cwd()}/mcdl-config.json`);
const msg = require(`./${config.lang}.json`)

const client = new Discord.Client();
const replacer = {
    version:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: Starting minecraft server version (\S.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
    done:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: Done \((.*)s\)! For help, type "help"(?:(?:\r\n|\r|\n)(?:.+))*/,
    info:/\[..:..:..\] \[Server thread\/INFO\]: /g,
    joined:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (.+) joined the game(?:(?:\r\n|\r|\n)(?:.+))*/,
    left:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (.+) left the game(?:(?:\r\n|\r|\n)(?:.+))*/,
    chat:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: (<.+>) (.+)(?:(?:\r\n|\r|\n)(?:.+))*/,
    server:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server thread\/INFO\]: \[Server\] .+(?:(?:\r\n|\r|\n)(?:.+))*/,
    stop:/(?:(?:.+)(?:\r\n|\r|\n))*\[..:..:..\] \[Server Shutdown Thread\/INFO\]: Stopping server(?:(?:\r\n|\r|\n)(?:.+))*/
};

client.login(config.token);

client.on('ready', () => {
    toDiscord()
});

client.on('message', message => {
    toMinecraft(message);
});

const toDiscord = () => {
    const channel = client.channels.get(config.channelId);

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', function(chunk) {
    
        console.log(chunk.replace(/\n$/g, ''));
        chunk = chunk.replace(/\n$/g, '')
    
        if (chunk.match(replacer.version)){
            const serverVersion = chunk.replace(replacer.version, '$1');
            channel.send('`[INFO]: ' + msg.chat.server_starting.replace('%s',serverVersion).replace(/\n$/g, '') + '`');
            client.user.setActivity(`Minecraft ${serverVersion}`, {type:"PLAYING"});
        }
        
        if (chunk.match(replacer.done)) {
            channel.send('`[INFO]: ' + msg.chat.server_started.replace('%s',chunk.replace(replacer.done, '$1')).replace(/\n$/g, '') + '`');
        }
    
        if (chunk.match(replacer.joined)) {
            channel.send('`[INFO]: ' + msg.chat.player_joined.replace('%s',chunk.replace(replacer.joined, '$1')).replace(/\n$/g, '') + '`');
        }

        if (chunk.match(replacer.left)) {
            channel.send('`[INFO]: ' + msg.chat.player_left.replace('%s',chunk.replace(replacer.left, '$1')).replace(/\n$/g, '') + '`');
        }
    
        if (chunk.match(replacer.chat)) {
            channel.send(chunk.replace(replacer.chat, '**$1** $2'));
        }
    
        if (chunk.match(replacer.server)) {
            channel.send(chunk.replace(replacer.info, ''));
        }
    
        if (chunk.match(replacer.stop)) {
            channel.send('`[INFO]: ' + msg.chat.server_shutdown + '`' );
            client.destroy();
        }
    });
    
    process.stdin.on('end', () => {
        process.exit();
    });
}

const toMinecraft = message => {
    if(!message.author.bot) {
        if(message.channel.id === config.channelId) {
            console.log(`<${message.member.nickname || message.author.username}> ` + (message.content).replace(/\n$/g, ''));
    
            const tellraw = ('tellraw @a ' + JSON.stringify([{
                text: '<'
            },{
                color: 'blue',
                text: (message.member.nickname || message.author.username)
            },{
                color: 'white',
                text:`> ${message.content}`
            }]))

            sendCommand(tellraw);
        }else if(message.channel.id === config.opChannelId) {
            sendCommand(message.content);
        }
    }
}

const sendCommand = command => {
    const rcon = new Rcon('localhost', config.rconPort, config.rconPassword);
    rcon.connect().then(() => {
        return rcon.send(command);
    }).then(() => {
        return rcon.disconnect();
    }).catch(error =>{
        console.log(error);
    });
}