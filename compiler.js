const fs = require('fs');
const { spawn} = require("child_process")

const ls = spawn('python', ['tbd.py']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`process exited with code ${code}`);
});