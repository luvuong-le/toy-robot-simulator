const chalk = require('chalk');
const figlet = require('figlet');

const error = chalk.bold.red;
const success = chalk.bold.green;
const info = chalk.bold.blue;

module.exports = {
    error: (text) => console.log(error(text)),
    info: (text) => console.log(info(text)),
    success: (text) => console.log(success(text)),
    log: (text, items) => console.log(text, items || ""),
    logTitle: (title) => console.log(figlet.textSync(title)),
    exit: () => {
        success('\nExiting...');
        process.exit(0);
    }
}