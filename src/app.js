const fs = require('fs');
const Robot = require('./modules/Robot');
const inquirer = require('inquirer');
const { log, error, info, logTitle, exit, success, buildPlaceObject } = require('./helpers/utils')
const { command } = require('./helpers/questions');

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
    info('No Input File Detected, Switching to prompt mode');
    const cmd = await inquirer.prompt(command);

    log('\nCommand To Execute: ', cmd.action);

    if (cmd.action === 'HELP') return showHelpScreen();

    if (cmd.action === 'EXIT') return exit();

    if (!robot.placed && !cmd.action.includes('PLACE')) {
        error('\nRobot must be placed with the PLACE command before making any moves\n');
        return showMenu();
    }

    readCommandsFromPrompt(cmd.action);
};

const readCommandsFromFile = (filePath) => {
    // Read command actions from file
    info('File Argument Detected!')
    info('Reading File');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        let commands = data.split(/\r\n/);

        // // Have commands, check for PLACE command and if so, 
        // console.log(commands);
        success('Beginning Execution of Commands');

        for (const command of commands) {
            if (!command.includes('PLACE') && !robot.placed) {
                info(`Skipping command ${command}, robot must be placed first`);
                continue;
            }
            info(`Executing ${command}`);
            executeCommands(command);
        }

        info('Command Execution Completed');
    })
}

const readCommandsFromPrompt = (command) => {
    // Read command actions from prompt
}

const executeCommands = (command) => {
    if (command.includes('PLACE')) {
        let placeData = buildPlaceObject(command.split(/[ ,]+/));
        robot.place(placeData.x, placeData.y, placeData.direction);
    } else {
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
                info('Current Location');
                console.log(robot.report());
                break;
            default:
                error('\n[ERROR]: Invalid command detected\n');
                break;
        } 
    } 
};

const startSimulation = async () => {
    logTitle('Toy Robot \n');
    return process.argv.length === 3 ? readCommandsFromFile(process.argv[2]) : showMenuPrompt();
};

startSimulation();