import glob from 'glob';
import pathNode from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import get from 'lodash/get';

const DIRNAME = __dirname;
const scriptPaths = glob.sync(`${__dirname}/*/index.js`, {
  realpath: true,
});

const getScriptName = (path) => {
    return pathNode.dirname(path).match(/([^\/]*)\/*$/)[0]
}

const requirePathForScripts = scriptPaths.reduce((acc, path) => {
    return {
        ...acc,
        [getScriptName(path)]: path,
    }
}, {})

console.log(chalk.red(figlet.textSync('SCRIPTS', { horizontalLayout: 'full' })));

const chooseScriptToRun = () => {
    const questions = [
        {
            type: 'list',
            name: 'script',
            message: 'Choose script to run:',
            choices: Object.keys(requirePathForScripts),
        }
    ];
    return inquirer.prompt(questions);
};

const askForParameters = (listOfParameter) => {
    const questions = listOfParameter.map((parameter) => {

        const { name, type } = parameter;
        const defaultValue = get(parameter, 'defaultValue', null);

        return {
            type: 'input',
            name,
            default: defaultValue,
            message: `${name} (${type}):`,
        }
    });
    return inquirer.prompt(questions);
};

const run = async () => {
  const { script } = await chooseScriptToRun();
  const importedScript = require(requirePathForScripts[script]);
  const parameterValues = await askForParameters(importedScript.parameters);
  importedScript.default(parameterValues)
};

run();