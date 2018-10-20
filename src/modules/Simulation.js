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
        info('\nToy Robot Help Screen');
        info('\n-----------------------------');
        info('\nList of available commands are as follows: ');
        info('\nPLACE: Place the robot on the grid ');
        info('\nMOVE: Move the robot forward one step');
        info('\nLEFT: Turn the robot 90deg left');
        info('\nRIGHT: Turn the robot 90deg right');
        info('\nEXIT: Exit the application \n');

        this.showMenuPrompt();
    }

    async showMenuPrompt() {
        info('No Input File Detected, Switching to prompt mode');
        const cmd = await inquirer.prompt(command);

        log('\nCommand To Execute: ', cmd.action.toUpperCase());

        if (cmd.action.toUpperCase() === 'HELP') return this.showHelpScreen();

        if (cmd.action.toUpperCase() === 'EXIT') return this.exit();

        if (!this.robot.placed && !cmd.action.toUpperCase().includes('PLACE')) {
			error('\nRobot must be placed with the PLACE command before making any moves\n');
			return this.showMenuPrompt();
		}

        readCommandsFromPrompt(cmd.action.toUpperCase());
    };

    parseCommandsFromFile (filePath) {
        // Read command actions from file
        info('File Argument Detected!')
        info('Reading File');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                error('[ERROR]: File could not be read');
                return;
            };
            let commands = data.split(/\r\n/);

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

    parseCommandsFromPrompt(command) {

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
                    info('Current Location');
                    console.log(this.robot.report());
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
        return process.exit(1);
    }
}