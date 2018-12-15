const Plugin = require('../plugin');
module.exports = class extends Plugin {
    constructor(discord, minecraft, config) {
        super(discord, minecraft, config);
        this.minecraft = {
            ...this.minecraft,
            re: /\[..:..:..\] \[Server thread\/INFO\]: (.+) discovered the floor was lava\n/ ,
            text: {
                ja_jp: '`%s は床が溶岩だったと気付いた`',
                en_us: '`%s discovered the floor was lava`',
            },
        };
    }
}