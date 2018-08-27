#!/usr/bin/env node
const commander = require('commander');
const pkg = require('../package');

commander
  .version(pkg.version, "-V, --version")
  .usage("<command>")

commander
  .command('init')
  .description('generation a react project')
  .action((name) => {
    require('../lib/init')(name)
  })



commander.on('--help', function () {
  console.log('\n Examples:');
  console.log('');
  console.log('  $ osj -h');
  console.log('  $ osj init my-demo ');
  console.log('');
})

commander.parse(process.argv)

if(!process.argv.length) {
  commander.help();
}