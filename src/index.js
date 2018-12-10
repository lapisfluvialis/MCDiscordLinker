#!/usr/bin/env node

(async () => {
    const args = process.argv;
    const main = require('./main');
    if(args[2]) {
        const options = args.slice(2);
        try {
            main(options);
        } catch (error) {
            await require(`./config`)();
            main(options);
        }
    }else{
        await require(`./config`)();
    }
})();