import MCDLConfig from "./MCDLConfig";
import Cli from "./cli";
import fs from "fs";

let msg: {
    new: string,
    change: string,
    lang: string,
    current_value: string,
    undefined: string,
    changed: string,
    keep_setting: string,
    nochange: string,
    encoding: string,
    token: string,
    channel_id: string,
    op_channel_id: string,
    saved: string,
};
let config: MCDLConfig;
try {
    config = require(`${process.cwd()}/mcdl-config.json`);
    msg = require(`./lang/${config.lang}`);
} catch (error) {
    msg = require(`./lang/en_us`);
}

class ChangeConfigCli extends Cli {
    async input(currentValue: string) {
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
    async select<T>(items: string[], currentValue?: string): Promise<T> {
        console.log(msg.current_value + (currentValue || msg.undefined));
        const selected = await super.select<T>(items);
        console.log(msg.changed, selected);
        return selected;
    }
}
const cli = new ChangeConfigCli();

export default async () => {
    if (config) {
        console.log(msg.change);
    } else {
        console.log(msg.new);
    }

    // 言語設定
    console.log(msg.lang);
    config.lang = await cli.select(['en_US','ja_JP'], config.lang);
    msg = require(`./lang/${config.lang}`);

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