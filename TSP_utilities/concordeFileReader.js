var concordeFilePath;

module.exports = {
  verify: verify,

  readFile: readFile
}

function verify(args, path) {

  // Verify that a single file name was entered.
  console.log('Verifying file.');

  // Throw error if more than 1 file selected
  if (args.length > 2) {
    console.error("Too many arguments. Please select only a single file to process.");
    process.exit(1);
  }

  // One file was detected. Check that it exists.
  if (args.length > 1) {
    var pathToTest = path + 'assignment-files/' + args[1].toString();

    verifyFileExists(pathToTest);

    concordeFilePath = pathToTest;
  }
  else {
    console.log('No file specified.');
    concordeFilePath = '';
  }

  console.log('Path recognized as: ' + concordeFilePath);
  return concordeFilePath;
};

function verifyFileExists(pathToTest) {
  try {
    require("fs").accessSync(pathToTest);
    console.log('File found. Ready to parse.');
  }catch(e){
    console.error('File not found. Check spelling and verify that file is located in the \'assignment-files\' folder for the agent being used.');
    process.exit(1);
  }
};

function readFile(path) {
  var fs = require('fs');
  console.log('Parsing data from: ' + path);
  var array = fs.readFileSync(path).toString().split("\n");
  var line;
  var concordeData = {
    name: {},
    dimension: {},
    cities: {}
  };

  // Check name
  if (array[0].split(' ')[0] === 'NAME:') {
    concordeData.name = array[0].split(' ')[1];
  }
  else {
    throwError('1st Line Should hold data-set NAME');
  }

  // Check dimension
  if (array[4].split(' ')[0] === 'DIMENSION:') {
    concordeData.dimension = array[4].split(' ')[1];
  }
  else {
    throwError('5th Line Should hold DIMENSION');
  }

  // Gather the distance values
  var cities = array.slice(7);
  var i;
  for (i in cities) {
    if (typeof cities[i] === 'string') {
      concordeData.cities[i] = cities[i].split(' ');

      concordeData.cities[i][1] = parseFloat(concordeData.cities[i][1]);
      concordeData.cities[i][2] = parseFloat(concordeData.cities[i][2]);
    }
  }

  return concordeData;
};

var throwError = function(message) {
  console.error('Failure to parse concorde file. Error: ' + message.toString());
};