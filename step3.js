



// Step 3
// Copy over your step2.js code to step3.js.

// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.

// Current features should still work the same:

const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** handle output: write to file if out given, else print */

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

/** read file at path and print it out. */

function cat(path, newFile) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, newFile);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, newFile) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, newFile);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let newFile;

if (process.argv[2] === '--out') {
  newFile = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, newFile);
} else {
  cat(path, newFile);
}

// note that when you were trying to refactor you were missing the fact that you could simply relabel the args in an if statement to then move forward to the next if statement. This would allow you to keep your if statments really clean and also allow you to use three functions like you wanted to

// 1. node step3.js one.txt
// 2. node step3.js https://www.google.com/

// 4.  node step3.js --out new.txt https://www.google.com/ 
// 3. node step3.js --out new.txt one.txt



// const fs = require('fs');
// const process = require('process');
// const axios = require('axios');
// const { Console } = require('console');

// function cat(path) {
//     fs.readFile(path, 'utf8', function(err, data) {
//         if(err) {
//             console.log(`Error reading: ${path}`, err)
//             process.exit(1)
//         } 
//         console.log('Data:', data)
//     });
// }

// async function webCat(url) {
//     try {
//    let response = await axios.get(url);
//    console.log('response:', response)
//    console.log(response.data)
//     } catch (err) {
//     console.error('ERROR', err)
//     process.exit(1)
//     }
// }

// async function catWrite(path, newFilename) {
//     fs.readFile(path, 'utf8', function(err, data) {
//         if(err) {
//             console.error(err);
//             process.exit(1)
//         } else {
//             writeToNewFile(data, newFilename)
//         }
//     })
// }

// async function webCatWrite(url, newFilename) {
  
//     let response = await axios.get(url);
//     writeToNewFile(response.data, newFilename)
// }

// async function writeToNewFile(data, newFilename) {
//     fs.writeFile(newFilename, data, 'utf8', function(err) {
//      console.log('writeToNewFile is running')
//      if(err) {
//          console.error(err);
//          process.exit(1)
//      } else {
//          console.log(`The ${data} was written to file ${newFilename} successfully.`)
//      }
//  })
// }

// let path = process.argv[2]
// let newFilename = process.argv[3]
// let outCommand = process.argv[4]

// if(path.slice(0, 4) === 'http') {
//     webCat(path)
// } else if (path.slice(0, 4) !== 'http' && outCommand === undefined) {
//     cat(path)
// } else if(path.slice(0, 4) === '--ou' && outCommand.slice(0, 4) !== 'http') {
//     console.log('else if two is running')
//     let path = process.argv[4]
//     catWrite(path, newFilename)
// } else {
//     console.log('else is running')
//     let url = process.argv[4]
//     webCatWrite(url, newFilename)
// }


// ************************************************************
// note I tried refactoring some different ways.Did not have a lot  of luck went through the solution.



// const fs = require('fs');
// const process = require('process');
// const axios = require('axios');
// const { Console } = require('console');

// function cat(path) {
//     fs.readFile(path, 'utf8', function(err, data) {
//         if(err) {
//             console.log(`Error reading: ${path}`, err)
//             process.exit(1)
//         } 
//         console.log('Data:', data)
//     });
// }

// async function webCat(url) {
//     try {
//    let response = await axios.get(url);
//    console.log('response:', response)
//    console.log(response.data)
//     } catch (err) {
//     console.error('ERROR', err)
//     process.exit(1)
//     }
// }


// async function webCatWrite(url, newFilename) {
  
//     let response = await axios.get(url);
//     writeToNewFile(response.data, newFilename)
// }

// async function returnResponse(url, newFilename) {
//     try {
//         let response = await axios.get(url);
//         if(newFilename !== undefined) {
//             writeToNewFile(response.data, newFilename)
//         } else {
//             console.log(response.data)
//         }
//          } catch (err) {
//          console.error('ERROR', err)
//          process.exit(1)
//          }
// }

// async function catWrite(path, newFilename) {
//     fs.readFile(path, 'utf8', function(err, data) {
//         if(err) {
//             console.error(err);
//             process.exit(1)
//         } else if(newFilename !== undefined) {
//             writeToNewFile(data, newFilename)
//         } else {
//             console.log(data)
//         }
//     })
// }


// async function writeToNewFile(data, newFilename) {
//     fs.writeFile(newFilename, data, 'utf8', function(err) {
//      console.log('writeToNewFile is running')
//      if(err) {
//          console.error(err);
//          process.exit(1)
//      } else {
//          console.log(`The data was written to file ${newFilename} successfully.`)
//      }
//  })
// }

// async function readUrl(url) {
//     await axios.get(url);
// }

// async function readThisFile(fileToBeRead, newFilename) {

//     if(fileToBeRead.slice(0, 4) === 'http') {
//         (console.log('readThisFile is running and fileToBeRead has http'))
//        try { let response = await readUrl(fileToBeRead); 
//     //    console.log('response', response)
//             if(newFilename === undefined) {
//                 console.log(response.data)
//             } else {
//                 writeToNewFile(response.data, newFilename)
//             }
//         } catch(err) {
//             console.log(err);
//         }
//     }else {
//         fs.readFile(fileToBeRead, 'utf8', function(err, data) {
//             if(err) {
//                 console.error(err);
//                 process.exit(1)
//             } else if(newFilename !== undefined) {
//                 writeToNewFile(data, newFilename)
//             } else {
//                 console.log(data)
//             }
//         })
//     }
// }

// let path = process.argv[2]
// let newFilename = process.argv[3]
// let outCommand = process.argv[4]

// note this is the one that currently works
// if(path.slice(0, 4) === 'http') {
//     webCat(path)
// } else if (path.slice(0, 4) !== 'http' && outCommand === undefined) {
//     cat(path)
// } else if(path.slice(0, 4) === '--ou' && outCommand.slice(0, 4) !== 'http') {
//     console.log('else if two is running')
//     let path = process.argv[4]
//     catWrite(path, newFilename)
// } else {
//     console.log('else is running')
//     let url = process.argv[4]
//     webCatWrite(url, newFilename)
// }

// if(newFilename === undefined) {
//     if(path.slice(0, 4) === 'http') {
//         // webCat(path)
//         returnResponse(path)
//     } else {
//         cat(path)
//     }
// } else {
//     if(outCommand.slice(0, 4) !== 'http') {
//         let path = process.argv[4]
//         catWrite(path, newFilename)
//     } else {
//         console.log('else is running')
//         let url = process.argv[4]
//         // webCatWrite(url, newFilename)
//         returnResponse(url, newFilename)

// }
// }

// if(path.slice(0, 4) === 'http' || outCommand.slice(0, 4) === 'http') {
//     let url = path.slice(0, 4) === 'http' ? path : outCommand
//     returnResponse(url, newFilename)
// } else {
//     let fileToBeRead = path.slice(-3) === 'txt' ? path : outCommand
//     catWrite(fileToBeRead, newFilename)
// }


// running commands 

// 1. node step3.js one.txt
// 3. node step3.js --out new.txt one.txt


// 2. node step3.js https://www.google.com/
// 4.  node step3.js --out new.txt https://www.google.com/ 



// if(path === '--out'){
//     fileToBeRead = process.argv[3]
//     newFilename = process.argv[2]
//     readThisFile(fileToBeRead, newFilename)
// } else {
//     fileToBeRead = process.argv[2]
//     readThisFile(fileToBeRead)
// }



// 1. node step3.js one.txt
// 2. node step3.js https://www.google.com/

// 4.  node step3.js --out new.txt https://www.google.com/ 
// 3. node step3.js --out new.txt one.txt
