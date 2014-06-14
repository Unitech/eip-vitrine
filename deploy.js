
var fs    = require('fs');
var spawn = require('child_process').spawn;

function deployForEnv(conf_file, env, args) {
  var conf    = fs.readFileSync(conf_file);
  var outData = JSON.stringify(JSON.parse(conf)['deploy'][env]);

  console.log(arguments);
  var shellSyntaxCommand = "echo '" + outData + "' | ./deploy " + args;
  spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
}

var args = process.argv;

if (args.indexOf('deploy') == -1)
  throw new Error('deploy argument not found');

args.splice(0, args.indexOf('deploy') + 1);

deployForEnv('app.json', args[1], args);
