const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) fell too far and was finished by (.+)\n/ ,
            text: {
                ja_jp: '`%s は高いところから落下し、%s によってとどめを刺された`',
                en_us: '`%s fell too far and was finished by %s`',
            },
        };
    }
}