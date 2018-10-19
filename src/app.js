const Robot = require('./modules/Robot');
const inquirer = require('inquirer');
const { log, error, info, success, logTitle, exit } = require('./helpers/utils')
const { command, commandType } = require('./helpers/questions');

const robot = new Robot();

const showHelpScreen = () => {
    info('\nToy Robot Help Screen');
    info('\n-----------------------------');
    info('\nList of available commands are as follows: ');
    info('\nPLACE: Place the robot on the grid ');
    info('\nMOVE: Move the robot forward one step');
    info('\nLEFT: Turn the robot 90deg left');
    info('\nRIGHT: Turn the robot 90deg right');
    info('\nEXIT: Exit the application \n');

    showMenuPrompt();
}

const showMenuPrompt = async () => {
    const cmd = await inquirer.prompt(command);

    info('\nCommand To Execute: ', cmd.action);

    if (cmd.action === 'HELP') return showHelpScreen();

    if (cmd.action === 'EXIT') return exit();

    if (!robot.placed && !cmd.action.includes('PLACE')) {
        error('\nRobot must be placed with the PLACE command before making any moves\n');
        return showMenu();
    }

    executeCommands(cmd.action);

};

const readCommandsFromFile = (filePath) => {
    // Read command actions from file
}

const readCommandsFromPrompt = (command) => {
    // Read command actions from prompt
}

const executeCommands = (command) => {
    switch (command) {
		case 'MOVE':
			robot.move();
			break;
		case 'LEFT':
			robot.left();
			break;
		case 'RIGHT':
			robot.right();
			break;
		case 'REPORT':
			robot.report();
			break;
		default:
			error('\n[ERROR]: Invalid command\n');
			showMenu();
	}
};

const start = async () => {
    logTitle('Toy Robot \n');

    const response = await inquirer.prompt(commandType);

    if (response.cmdType === 1) {
        showMenuPrompt();
    } else {
        readCommandsFromFile();
    }
};

start();