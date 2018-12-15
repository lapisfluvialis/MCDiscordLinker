const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) was pricked to death\n/ ,
            text: {
                ja_jp: '`%s はサボテンが刺さって死んだ`',
                en_us: '`%s was pricked to death`',
            },
        };
    }
}