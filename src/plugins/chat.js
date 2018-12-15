const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: ([<\[]\S+?[>\]]) (.+)/,
            text: {
                ja_jp: '**%s** %s',
                en_us: '**%s** %s',
            },
        };
    }
}