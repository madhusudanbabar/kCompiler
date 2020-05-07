const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")
const bodyParser = require('body-parser');

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
    // console.log(req);

    upload(req, res, (err) => {   
        console.log(req.body);
        if (err) {
            console.log(err);
            res.json(err)
        }
        else {
            res.json("file recieved");
        }
    })
})

app.listen(3000, () => {
    console.log("running on port 3000");
})