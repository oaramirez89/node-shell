var commands = require('./commands');

function writer(output){
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var argArray = cmd.split(' ');
  commands[argArray[0]](writer, argArray.slice(1).join(' '));

  //process.stdout.write('\nprompt > ');

});
