let msg, config;
try {
    config = require(`${process.cwd()}/mcdl-config.json`);
    msg = require(`./lang/${config.lang}.json`);
    console.log(msg.change);
} catch (error) {
    msg = require(`./lang/en_us.json`);
    console.log(msg.new);
}

const Cli = require('./cli');
class ChangeConfigCli extends Cli {
    async input(currentValue) {
        console.log(msg.current_value + (currentValue || msg.undefined));
        console.log(msg.keep_setting);
        const input = await super.input();
        if (input !== '') {
            console.log(msg.changed, input);
            return input;
        }else{
            console.log(msg.nochange);
            return currentValue;
        }
    }
    async select(items, currentValue) {
        console.log(msg.current_value + (currentValue || msg.undefined));
        const selected = await super.select(items);
        console.log(msg.changed, selected);
        return selected;
    }
}
const cli = new ChangeConfigCli();

module.exports = async () => {

    const fs = require('fs');

    // 言語設定
    console.log(msg.lang);
    config.lang = await cli.select(['en_US','ja_JP'], config.lang);
    msg = require(`./lang/${config.lang}.json`);

    // 文字コード設定
    console.log(msg.encoding);
    config.encoding = await cli.select(['UTF-8','SHIFT-JIS'], config.encoding);

    // トークン
    console.log(msg.token);
    config.token = await cli.input(config.token);

    // チャンネルID
    console.log(msg.channel_id)
    config.channelId = await cli.input(config.channelId);

    // 管理用チャンネルID
    console.log(msg.op_channel_id);
    config.opChannelId = await cli.input(config.opChannelId);

    // 保存
    try {
        fs.writeFileSync(`${process.cwd()}/mcdl-config.json`, JSON.stringify(config, null, 4));
        console.log(msg.saved);
    } catch (error) {
        console.log(error);
    }

    return require(`${process.cwd()}/mcdl-config.json`);
}