const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user :"root",
    host : "localhost",
    password : "password",
    database : "employee_system",
    
});



app.post('/create',(req,res)=>{
    const name = req.body.name;
    const ph = req.body.ph;
    const email = req.body.email;

    //const ifemailnotpresentandphonecanbenullornotpresent = true;

    
        db.query(
            'INSERT INTO employees (employee_name,employee_ph,employee_email) VALUES(?,?,?)',[name,ph,email],(error,result)=>{
                if(error){
                    console.log(error);
                }
                else{
                    res.send("User Added");
                }
            }
        );
  

});

app.get('/employees',(req,res)=>{
    db.query("SELECT * FROM employees",(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

app.put('/update',(req,res)=>{
    const email = req.body.email;
    const ph = req.body.ph;
    const name = req.body.name;
    //console.log(email+" "+ph+" "+name);
    db.query("UPDATE employees SET employee_ph = ? , employee_name = ? WHERE employee_email = ?",[ph,name,email],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });

});


app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE employee_id = ?",id,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("server running on port number 3001");
});