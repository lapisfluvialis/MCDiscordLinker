const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: There are .* of a max .* players online(:.*)/,
            text: {
                ja_jp: '`オンライン%s`',
                en_us: '`Online%s`',
            },
        };
        this.discord = {
            ...this.discord,
            re: /(\/list)/,
            command: '%s'
        };
    }
}