let fs = require('fs');
let path = require('path');
let inquirer = require('inquirer');

let DESTINATION = path.join(__dirname, 'plugins/');

let generateTS = (fname, description) => {
    let content = `
    // description: ${description}
    import { PluginComponent } from 'src/interfaces/plugin-component';
    declare var $: any;
    export class ${fname} implements PluginComponent{
    
    }`;
    fs.readdir(DESTINATION, (err, files) => {
        if (err) {
            return console.log('Destination undefined');
        }
        if (!files.includes(fname + '.ts')) {
            let filename = path.join(DESTINATION, fname + '.ts');
            fs.writeFile(filename, content, (err) => {
                if (err) throw err;
                console.log('File created in ', DESTINATION);
            });
        } else {
            console.log('File already exists !!');
        }
    });
};

const questions = [
    {
        type: 'input',
        name: 'filename',
        message: 'Plugin filename: ',
        default: 'Plugin.ts',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:  ',
        default: 'No Description',
    },
];
inquirer
    .prompt(questions)
    .then((ans) => {
        generateTS(ans.filename, ans.description);
    })
    .catch((err) => {
        console.log(err);
    });
