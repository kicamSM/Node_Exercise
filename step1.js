// Step 1
// In step1.js, write a function, cat.

// It should take one argument, path, and it should read the file with that path, and print the contents of that file.

// Then, write some code that calls that function, allowing you to specify the path argument via the command line. For example:

const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error reading: ${path}`, err)
            process.exit(1)
        } 
        console.log('Data:', data)
    })
}

cat(process.argv[2])

// call via the command line 
// node step1.js one.txt


// Step 2
// Copy over your step1.js code to step2.js

// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

