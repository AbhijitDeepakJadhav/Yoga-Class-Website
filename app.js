const express = require("express");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/abhisyoga', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//defining mongoose Schema
var contactSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Gender: String,
    Address: String,
    Email: String,
    ContactNumber: String
});
var Contact = mongoose.model('Contact', contactSchema);


//Express specific stuff
app.use('/static',express.static('static'));  //for serving static files in directory named static
app.use(express.urlencoded());


//endpoints
app.get('/', (req, res) => {
    // const params = { }
    res.sendFile('./static/index.html',{root: __dirname}); //send html page
})

app.get('/contact', (req, res) => {
    // const params = { }
    res.sendFile('./static/contact.html',{root: __dirname}); //send html page
})

app.get('/fcalci', (req, res) => {
    // const params = { }
    res.sendFile('./static/fcalci.html',{root: __dirname}); //send html page
})

app.post('/contact', (req, res) =>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This data has been send to database");
        console.log("data saved");
    }).catch(()=>{
        res.status(200).send("data was not saved");
        // console.log("not saved");
    });
})

app.post('/fcalci', async(req, res) =>{
    try{
        var weight = req.body.weight;
        var height = req.body.height;
        console.log(weight)
        document.getElementById("bmi").innerHTML = "11"
    }catch(err){
        console.log(err)
    }
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started succesfully on port ${port} `);
})
