const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")

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
        if (err) {
            console.log(err);
            res.json(err)
        }
        else {
            res.redirect("")
        }
    })
})

app.listen(3000, () => {
    console.log("running on port 3000");
})