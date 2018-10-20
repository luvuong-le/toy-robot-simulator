const argv = require('yargs')
	.usage('Usage: $0 <command> [Options]')
    .command('run', 'Run the simulation', {
        prompt: {
            alias: 'p',
            description: 'Run commands through prompt'
        },
        file: {
            alias: 'f',
            description: 'Run commands from a text file'
        }
    })
    .check((argv) => {
        return argv.f === true ? new Error('Error no file was passed through') : true;
    })
	.example('run', 'Run commands automatically from prompt')
	.example('run -p', 'Run commands from prompt')
	.example('run -f src/commands.txt', 'Run instructions from a txt file')
	.options({
		help: {
			alias: 'h',
			describe: 'Get the help screen',
		}
	})
    .demandCommand(1, 'You need at least the run command to begin the app').argv;

const Simulation = require('./modules/Simulation');

const simulation = new Simulation({x: 5, y: 5}, argv.file || null);

simulation.run();