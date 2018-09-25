const downloadGitTmp = require('download-git-repo');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');

const path = require('path');
const templates = {
  jq: 'https://github.com:huaibaomengxiang/jq-template',
  react: 'https://github.com:huaibaomengxiang/react-template'
}

function init(name) {
  const frameChoices = ['react','jq'];
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'what name do u want',
      default: name,
    },
    // {
    //   type: 'input',
    //   name: 'templateUrl',
    //   message: 'what template do u want',
    //   default: defaultTem['react'],
    // }
    {
      type: 'list',
      name: 'frame',
      message: 'what frame do u want use',
      choices: frameChoices
    },
  ]
  inquirer.prompt(questions)
    .then(answer => {
      if (answer.frame === 'vue') {
        console.log(chalk.red('no vue template, u can input yourself git repo to comple'))
      } else {
        downloadTmp(templates[answer.frame], answer.projectName)
      }
    })
}

function downloadTmp(url, name) {
  const gitUrl = url;
  const dirPath = path.resolve(`${process.cwd()}/${name}`)
  const spinner = ora('正在下载项目模板,请等候...');
  spinner.start();
  downloadGitTmp(gitUrl, dirPath, { clone: true }, (err) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(err));
    } else {
      spinner.succeed();
      console.log(chalk.blue('项目创建成功'))
      console.log(chalk.yellow(`项目地址是${dirPath}`))
    }
  })
}



module.exports = init;