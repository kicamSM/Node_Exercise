// Step 3
// Copy over your step2.js code to step3.js.

// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.

// Current features should still work the same:

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { Console } = require('console');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error reading: ${path}`, err)
            process.exit(1)
        } 
        console.log('Data:', data)
    });
}

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

async function catWrite(path, newFilename) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(err);
            process.exit(1)
        } else {
            writeToNewFile(data, newFilename)
        }
    })
}

async function webCatWrite(url, newFilename) {
  
    let response = await axios.get(url);
    writeToNewFile(response.data, newFilename)
}

async function writeToNewFile(data, newFilename) {
    fs.writeFile(newFilename, data, 'utf8', function(err) {
     console.log('writeToNewFile is running')
     if(err) {
         console.error(err);
         process.exit(1)
     } else {
         console.log(`The ${data} was written to file ${newFilename} successfully.`)
     }
 })
}

let path = process.argv[2]
let newFilename = process.argv[3]
let outCommand = process.argv[4]

if(path.slice(0, 4) === 'http') {
    webCat(path)
} else if (path.slice(0, 4) !== 'http' && outCommand === undefined) {
    cat(path)
} else if(path.slice(0, 4) === '--ou' && outCommand.slice(0, 4) !== 'http') {
    console.log('else if two is running')
    let path = process.argv[4]
    catWrite(path, newFilename)
} else {
    console.log('else is running')
    let url = process.argv[4]
    webCatWrite(url, newFilename)
}


// running commands 

// 1. node step3.js one.txt

// 2. node step3.js https://www.google.com/

// 3. node step3.js --out new.txt one.txt

// 4.  node step3.js --out new.txt https://www.google.com/ 