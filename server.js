const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const { spawn, spawnSync } = require("child_process")

app.use(bodyParser.json())
app.use(multer().single())

app.use(express.static(path.join(__dirname, "dist", "compiler")))
var programFile;

app.post("/upload", (req, res) => {
    var lang = req.body.lang;
    console.log(lang);
    
    switch (lang) {
        case "c":
            programFile = path.join(__dirname,"uploads","tmp.c");
            break;
        case "c++":
            programFile = path.join(__dirname,"uploads","tmp.cpp");
            break;
        case "python":
            programFile = path.join(__dirname,"uploads","tmp.py");
            break;
    }

    try {
        if (fs.existsSync(path.join(__dirname), "uploads")) {
            console.log("folder exists");
        }else{
            fs.mkdirSync(path.join(__dirname, "uploads"))
            console.log("folder created");
            
        }
        var exists = fs.existsSync(programFile);        
    } catch (error) {
        console.log(error);
    }
    if (exists) {
        console.log("files exists: "+programFile);
    } else {
        console.log("file does not exists");
        fs.writeFileSync(programFile, req.body.code, { mode: 777 })
    }

    var compiler = null;
    var op = new Object;
    if (lang == "c") {
        try {
            mid = spawnSync('gcc', ['tmp.c']);
            console.log("file written successfully");
        } catch (error) {
            res.json(error)
        }
        compiler = spawn('./a.out');
    } else if (lang == "c++") {
        try {
            var mid = spawnSync('g++', [programFile, "-o", path.join(__dirname, "uploads", 'tmp.out')]);            
        } catch (error) {
            console.log(error);
        }
        compiler = spawn(path.join(__dirname, "uploads", './tmp.out'));
        prepareOp(compiler, res, programFile)
    }
    else if (lang == "python") {
        compiler = spawn('python3', [programFile]);
        prepareOp(compiler,res,programFile);
    }
});

app.listen(3000, () => {
    console.log("running on port 3000");
})

function prepareOp(compiler, res,programFile) {
    var op = new Object;
    compiler.stdout.on('data', (data) => {
        str = String(data)
        console.log(`stdout: ${str}`);
        op.out = str;
    });

    compiler.stderr.on('data', (data) => {
        str = String(data)
        console.error(`stderr: ${str}`);
        op.err = str;
    });

    compiler.on('close', (code) => {
        op.end = `process exited with code ${code}`
        console.log(op.end);
        try {
            var cleanup = fs.unlinkSync(programFile)
            res.json(op);
        } catch (error) {
            console.log(error);
        }
    });
    return op;
} 