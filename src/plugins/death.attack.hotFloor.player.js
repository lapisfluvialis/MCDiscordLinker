const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) walked into danger zone due to (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s に妨害されて危険地帯に足を踏み入れた`',
                en_us: '`%s walked into danger zone due to %s`',
            },
        };
    }
}