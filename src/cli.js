module.exports = class {
    /**
     * @param {Object} options
     * @param {string} options.prompt The prompt string to use. Default: '> '.
     * @param {string} options.bullet The bullet for the list. Default: '• '.
     */
    constructor(options = {}) {
        this.readline = require('readline');
        this.options = options;
    }
    input() {
        const rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.options.prompt,
        });
        rl.prompt();
        return new Promise(resolve => {
            rl.once('line', input => {
                rl.close();
                resolve(input);
            });
        });
    }
    /** @param {string[]} items The items to show. */
    select(items) {
        const rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const bullet = this.options.bullet || '• ';
        this.readline.emitKeypressEvents(process.stdin);

        let isFirst = true;
        const selectItem = index => {
            isFirst
            ? isFirst = false
            : console.log('\x1B[%dA',items.length + 1);
            for (let i in items) {
                if (i == index) {
                    console.log('\x1b[7m%s%s\x1b[0m\x1B[K', bullet, items[i]);
                }else{
                    console.log('%s%s\x1B[K', bullet, items[i]);
                }
            }
        }
        let index = 0;
        selectItem(index);
        process.stdin.setRawMode(true);
        return new Promise(resolve => {
            process.stdin.on('keypress',function self(key,ch){
                switch (ch.sequence) {
                    case '\r':
                        process.stdin.removeListener('keypress',self);
                        process.stdin.setRawMode(false);
                        rl.close();
                        console.log('\x1B[2A');
                        resolve(items[index]);
                        break;
                    case '\u001b[A':
                        if (index > 0) {
                            index--;
                            selectItem(index);
                        }
                        break;
                    case '\u001b[B':
                        if (index < items.length - 1) {
                            index++;
                            selectItem(index);
                        }
                        break;
                    case '\u0003':
                        process.stdin.removeListener('keypress',self);
                        process.stdin.setRawMode(false);
                        rl.close();
                        process.exit(0);
                        break;
                    default:
                        break;
                }
            });
        });
    }
    /**
     * @param {number} value The default value. Default: `0`.
     * @param {number} min The minimum value. Default: `Number.MIN_SAFE_INTEGER`.
     * @param {number} max The maximum value. Default: `Number.MAX_SAFE_INTEGER`.
     */
    spin(value = 0, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
        const rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.readline.emitKeypressEvents(process.stdin);
        const spin = value => console.log(value + '\x1B[K\x1B[1A');
        spin(value);
        process.stdin.setRawMode(true);
        return new Promise(resolve => {
            process.stdin.on('keypress',function self(key,ch){
                switch (ch.sequence) {
                    case '\r':
                        process.stdin.removeListener('keypress', self);
                        process.stdin.setRawMode(false);
                        rl.close();
                        resolve(value);
                        break;
                    case '\u001b[A':
                        if (value < max) {
                            value++;
                            spin(value);
                        }
                        break;
                    case '\u001b[B':
                        if (value > min) {
                            value--;
                            spin(value);
                        }
                        break;
                    case '\u0003':
                        process.stdin.removeListener('keypress',self);
                        process.stdin.setRawMode(false);
                        rl.close();
                        process.exit(0);
                        break;
                    default:
                        break;
                }
            });
        });
    }
}