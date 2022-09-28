const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const mysql=require('mysql')
const db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"password",
  database:"fooddiary",
});
/*app.get("/",(req,res)=>{
  const sqlInsert="INSERT INTO fooddiary.nutrition (patientId, nameOfItem, servingSize, calories, time) VALUES (1,'Bread Toast','Two toasts',100,'Morning');"
  db.query(sqlInsert,(err,result)=>{
    console.log("running database");
  res.send("Hello food");
  })

});*/
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post("/nutrition/insert",(req,res)=>{//nutrition
  const patientId=req.body.patientId
  const nameOfItem=req.body.nameOfItem
  const servingSize=req.body.servingSize
  const calories=req.body.calories
  const time=req.body.time

//patientId  ,no of servings, units of servings
//expressjs
  const sqlInsert="INSERT INTO fooddiary.nutrition (patientId, nameOfItem, servingSize, calories, time) VALUES (?,?,?,?,?)";
  db.query(sqlInsert,[patientId, nameOfItem, servingSize, calories, time],(err,result)=>{
    console.log(result);
  });
});

app.listen(3001,()=>{
  console.log("Running on port 3001");
});
