const fs = require('fs');
const Robot = require('./Robot');
const inquirer = require('inquirer');
const { log, error, info, logTitle, exit, success, buildPlaceObject } = require('../helpers/utils');
const { command } = require('../helpers/questions');

module.exports = class Simulation {
    constructor(grid, filepath) {
        this.filePath = filepath;
        this.robot = null;
        this.grid = grid;
    }

    showHelpScreen() {
        info('Toy Robot Help Screen');
        info('-----------------------------');
        info('Available commands are as follows: ');
        info('PLACE x,y,direction: Place the robot on the grid ');
        info('MOVE: Move the robot forward one step');
        info('LEFT: Turn the robot 90deg left');
        info('RIGHT: Turn the robot 90deg right');
        info('REPORT: Display the current position and direction of the robot');
        info('EXIT: Exit the application \n');

        this.showMenuPrompt();
    }

    async showMenuPrompt() {
        const cmd = await inquirer.prompt(command);

        log('\nCommand To Execute: ', cmd.action.toUpperCase());

        if (cmd.action.toUpperCase() === 'HELP') return this.showHelpScreen();

        if (cmd.action.toUpperCase() === 'EXIT') return this.exit();

        if (!this.robot.placed && !cmd.action.toUpperCase().includes('PLACE')) {
			error('\nRobot must be placed with the PLACE command before making any moves\n');
			return this.showMenuPrompt();
		}

        this.parseCommandsFromPrompt(cmd.action.toUpperCase());
    };

    parseCommandsFromFile (filePath) {
        info('File Argument Detected!')
        info('Reading File');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                error('[ERROR]: File could not be read');
                return;
            };
            const commands = data.split(/\r\n/);

            success('Beginning Execution of Commands');

            for (const command of commands) {
                if (!command.includes('PLACE') && !this.robot.placed) {
                    info(`Skipping command ${command}, robot must be placed first`);
                    continue;
                }
                info(`Executing ${command.trim()}`);
                this.executeCommand(command.trim());
            }

            info('Command Execution Completed');
        })
    }

    hasMultipleInputs(command) {
        if (/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command)) {
            return command.replace(/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/, '').trim().split(' ').length > 1;
        } else if (!/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command) && command.split(" ").length > 1) {
            return true;
        } 
        return false;
    }

    parseCommandsFromPrompt(command) {        
        if (this.hasMultipleInputs(command)) {
            error('[ERROR] Please enter one command only');
			return this.showMenuPrompt();
        }

        if (!command.includes('PLACE') && !this.robot.placed) {
            info(`Skipping command ${command}, robot must be placed first`);
        }

        info(`Executing ${command.trim()}`);

        this.executeCommand(command.trim());

        info('Command Execution Completed');
        return this.showMenuPrompt();
    }

    executeCommand(command) {
        if (command.includes('PLACE')) {
            let placeData = buildPlaceObject(command.split(/[ ,]+/));
            this.robot.place(placeData.x, placeData.y, placeData.direction);
        } else {
            switch (command) {
                case 'MOVE':
                    this.robot.move();
                    break;
                case 'LEFT':
                    this.robot.left();
                    break;
                case 'RIGHT':
                    this.robot.right();
                    break;
                case 'REPORT':
                    success('Reporting Current Location');
                    success(this.robot.report());
                    break;
                default:
                    error('\n[ERROR]: Invalid command detected\n');
                    break;
            }
        } 
    }

    createRobot() {
        this.robot = new Robot(this.grid);
    }

    run() {
        logTitle('Toy Robot \n');
        this.createRobot();
        return this.filePath ? this.parseCommandsFromFile(this.filePath) : this.showMenuPrompt();
    }

    exit() {
        success('Exiting application');
        return process.exit();
    }
}