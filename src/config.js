const fs = require('fs');
let msg = require('./en.json');

let config = {};

const readline = buf => {
    console.log(msg.config.current_value + (buf || msg.config.undefined));
    return new Promise(resolve => {
        const rl = require('readline').createInterface(process.stdin, process.stdout);
        rl.prompt();
        rl.on('line',line => {
            rl.close();
            if (line !== '') {
                console.log(msg.config.changed.replace('%s',line));
                resolve(line);
            }else{
                console.log(msg.config.nochange)
                resolve(buf);
            }
        })
    });
}

exports.editConfig = async () => {
    try {
        config = require(`${process.cwd()}/mcdl-config.json`);
        msg = require(`./${config.lang}.json`);
        console.log(msg.config.change);
    } catch (error) {
        console.log(msg.config.new);
    }    

    console.log(msg.config.lang);
    config.lang = await readline(config.lang);
    msg = require(`./${config.lang}.json`);

    console.log(msg.config.token);
    config.token = await readline(config.token);
    console.log(msg.config.channel_id)
    config.channelId = await readline(config.channelId);
    console.log(msg.config.op_channel_id);
    config.opChannelId = await readline(config.opChannelId);
    console.log(msg.config.rcon_port);
    config.rconPort = parseInt(await readline(config.rconPort));
    console.log(msg.config.rcon_password);
    config.rconPassword = await readline(config.rconPassword);

    try {
        fs.writeFileSync(`${process.cwd()}/mcdl-config.json`, JSON.stringify(config, null, '    '));
        console.log(msg.config.saved);
    } catch (error) {
        console.log(error);
    }   
}

exports.existsConfig = () => {
    try {
        fs.statSync(`${process.cwd()}/mcdl-config.json`);
        return true;
    } catch (error) {
        return false;
    }
}




