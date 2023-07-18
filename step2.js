// Step 2
// Copy over your step1.js code to step2.js

// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error reading: ${path}`, err)
            process.exit(1)
        } 
        console.log('Data:', data)
    });
}

// cat(process.argv[2])

// call via the command line 
// node step1.js one.txt

async function webCat(url) {
    try {
   let response = await axios.get(url);
   console.log('response:', response)
   console.log(response.data)
    } catch (err) {
    console.error('ERROR', err)
    process.exit(1)
    }
}

let path = process.argv[2]

firstFour = path.slice(0, 4)

if(firstFour === 'http') {
    webCat(path)
} else {
    cat(path)
}
