module.exports = {
    command: {
        type: 'input',
        name: 'action',
        message: 'Enter a command [use HELP for a list of acceptable commands]: '
    },
    commandType: {
        type: 'list',
        name: 'cmdType',
        message: 'How would you like to input the commands?',
        choices: [
           {
               name: 'File',
               value: 0
           },
           {
               name: 'Command Prompt',
               value: 1
           }
        ]
    }    
}