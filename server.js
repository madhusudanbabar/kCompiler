const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")
const bodyParser = require('body-parser');
const fs = require('fs');
const { spawn, spawnSync } = require("child_process")

app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        fileName = path.basename(file.originalname)
        console.log(fileName);

        cb(null, fileName)
    }
})

app.use(express.static(path.join(__dirname, "dist", "compiler")))

app.use(express.json())

var upload = multer({
    storage: storage
}).single("file")

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        lang = req.body.lang;
        // console.log(lang);
        var tmpFile;
        switch (lang) {
            case "c":
                tmpFile = "tmp.c";
                break;
            case "c++":
                tmpFile = "tmp.cpp";
                break;
            case "python":
                tmpFile = "tmp.py";
                break;
        }


        // try {
        //     fs.unlinkSync(path.join(__dirname, "uploads", tmpFile));
        // } catch (error) {
        //     // res.json(error)
        // }

        console.log("im here");
        
        try {
            fs.writeFileSync(path.join(__dirname, "uploads", tmpFile), req.body.code);
            console.log("file written");
            
        } catch (error) {
            res.json(error)
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
        } else if (lang == "cpp") {
            try {
                mid = spawnSync('g++', ['tmp.cpp']);
                console.log("file written successfully");
            } catch (error) {
                res.json(error)
            }
            compiler = spawn('./a.out');
        }
        else if (lang == "python") {
            compiler = spawn('python3', [path.join(__dirname, "uploads/") + 'tmp.py']);
        }
        compiler.stdout.on('data', (data) => {
            str = String(data)
            console.log(`stdout: ${str}`);
            // res.write(JSON.stringify(`process exited with code ${str}`))
            // res.write(JSON.stringify("stdout"))
            op.out = str;
        });

        compiler.stderr.on('data', (data) => {
            str = String(data)
            console.error(`stderr: ${str}`);
            // res.write(JSON.stringify(str));
            // res.send("stderr")
            op.err = str;
        });

        compiler.on('close', (code) => {
            console.log(`process exited with code ${code}`);
            // res.end(JSON.stringify(`process exited with code ${code}`));
            res.status(200).json(op)
        });
    })
});

app.listen(3000, () => {
    console.log("running on port 3000");
})