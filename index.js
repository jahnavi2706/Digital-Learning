const express = require('express')
const app = express()
const port = 3000

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");


var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
    res.render("home");
});

app.get('/signIn', (req, res) => {
    res.render("signIn");
});

app.get('/signinsubmit', (req, res) => {
    const email = req.query.email;
    const pwd = req.query.pwd;

    db.collection("users")
    .where("email", "==",email)
    .where("pwd","==",pwd)
    .get()
    .then((docs)=>{
        if(docs.size > 0){
            res.render("home");
        }else{
            res.send("SignIn Failed");
        }
    });
});

app.get('/signupsubmit', (req, res) => {
    const first_name = req.query.fname;
    const last_name = req.query.lname;
    const email = req.query.email;
    const pwd = req.query.pwd;
    const dob = req.query.dob;
    const addr = req.query.address;
    const gender = req.query.inlineRadioOptions;
    const pin = req.query.pin;
    const course = req.query.course;

    //Adding new data to collection
db.collection('users').add({
    name : first_name+" "+last_name,
    email : email,
    pwd : pwd,
    dobb :dob,
    addr : addr,
    gender : gender,
    pin : pin,
    course : course, 
}).then(()=>{
    res.render("home");
});
});


app.get('/signUp', (req, res) => {
    res.render("signUp");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});