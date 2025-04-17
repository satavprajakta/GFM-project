const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/EDUCARE";
const student = require("./models/student");
const Reason = require("./models/reason");
app.use("/uploads", express.static("uploads"))
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(()=>{
    console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });

async function main(){
    await mongoose.connect(MONGO_URL);
}   

app.get("/", (req, res) => {
    res.render("loginpage.ejs");
});

app.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

app.get("/manual", (req, res) => {
    res.render("usermanual.ejs");
});

app.get("/historyabsent", (req, res) => {
    res.redirect("/submit");
});

app.post("/signup", async(req, res) => {
    const {educationalYear,  userRole,  studentName, rbtno, email,  phoneNo,  parentNo,   parentEmail,   department,   passoutBatch,   username,   password } = req.body;
    const insert = await student.insertMany([
        {educationalYear,  userRole,  studentName, rbtno, email,  phoneNo,  parentNo,   parentEmail,   department,   passoutBatch,   username,   password  }])
        res.send("succesfully created account")
    });

app.post("/home", async(req, res) => {
    let { userrole, username1, password1 } = req.body;
    console.log(password1, username1);
    let username = username1;
    const studentdata =await student.find({username});
    let rbtno = studentdata.length > 0 ? studentdata[0].rbtno : null;
    let password = studentdata.length > 0 ? studentdata[0].password : null;
    const user = await student.findOne({ username }); 
    const studentreason =await Reason.find({rbt_no:rbtno});
        if (!rbtno && !password) {
            return res.render("signin.ejs");
        } else {
            if (userrole === "student") {
                return res.render("studentfirst.ejs",{studentreason,user});
            } else {
                const uniqueStudents = await Reason.distinct("student_name");
                return res.render("teacher.ejs", { uniqueStudents });
                console.log( uniqueStudents);
            }
        }
    });

    app.get("/student/:name", async (req, res) => {
        let studentName = req.params.name;
        console.log(studentName);
        const studentReasons = await Reason.find({ student_name: studentName });
    console.log()  
        res.render("studentdetails.ejs", { studentName, studentReasons });
    });
    
app.post("/submit", async (req, res) => {
    const { student_name, rbt_no, absent_date, reason, username ,file} = req.body;
    console.log(student_name, rbt_no, absent_date, reason, username ,file);
   if(  !reason  ){ 
    const results = await Reason.find({ student_name, rbt_no });
    console.log("2");
    res.render("history.ejs",{results})
   }else{
    const inserted = await Reason.insertMany([
        { student_name, rbt_no, absent_date, reason, username ,file }
    ]);
    const results = await Reason.find({ student_name, rbt_no });
    console.log("1");
    res.render("history.ejs",{results})
  }
});

app.get("/teachers", async (req, res) => {
        const uniqueStudents = await Reason.distinct("student_name");
        res.render("teacher.ejs", { uniqueStudents }); 
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});