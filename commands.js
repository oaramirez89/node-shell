var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(func){
    func(process.cwd());
  },
  date: function(func){
    var date = new Date();
    func(date.toString());
  },
  ls: function(func){
    var output = "";
    fs.readdir('.', function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        output += file.toString() + "\n";
      })
      func(output);
    });
  },
  echo: function(func, input){
    func(input);
  },
  cat: function(func, filenames) {
    filenames = filenames.split(' ');
    const texts = [];
    var count = 0;
    filenames.forEach(function(filename, i){
      fs.readFile(filename, 'utf-8', function(err, data) {
        if (err) throw err;
        texts[i] = data;
        if (count === filenames.length){
          func(data);
        }
      })
    })
  },
  head: function(func, filename) {
    fs.readFile(filename, 'utf-8', function(err, data) {
      if (err) throw err;
      data = data.split('\n').slice(0, 5).join('\n');
      func(data);
    })
  },
  tail: function(func, filename) {
    fs.readFile(filename, 'utf-8', function(err, data) {
      if (err) throw err;
      data = data.split('\n').slice(-5).join('\n');
      func(data);
    })
  },
  curl: function(func, url){
    request('http://www.google.com', function (error, response, body) {
    if (error) throw error;
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    func(body); // Print the HTML for the Google homepage.
});
  }
}
