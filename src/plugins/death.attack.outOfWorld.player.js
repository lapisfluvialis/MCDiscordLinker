const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) didn't want to live in the same world as (.+)\n/ ,
            text: {
                ja_jp: '`%s は %s と同じワールドに住みたくなかった`',
                en_us: '`%s didn\'t want to live in the same world as %s`',
            },
        };
    }
}