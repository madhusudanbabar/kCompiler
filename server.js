const express = require("express")
const app = express()
const spawn = require("child_process").spawnSync;
const sleep = require("sleep")
app.use(express.urlencoded({ extended:true}))
const fs = require("fs")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
app.use(express.json())

let upload = multer({ storage: storage }).single('profile_pic');


app.listen(3000,()=>{
    console.log("running on port 3000");
    
})

app.post("*", (req, res)=>{
    upload(req, res,(err)=>{
        res.send(err)
        console.log(req.body);    
    
    sleep.sleep(2);
    // console.log(lang);
    // res.send("recieved")
    })
})