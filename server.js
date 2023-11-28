const express = require("express");

const db= require("./db");

const uuid = require("uuid");




const app = express();


app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.listen(4500,()=>{

    console.log("todo server is running now")
})



app.post("/getTodo",(req,res)=>{


    db.getTodo(req.body.userid).then((row)=>{
        res.send(row)
    })
    .catch(()=>{res.send(err)})

});





app.post("/postTodo",(req,res)=>{

    db.postTodo(req.body.userid,uuid.v4(),req.body.todo).then((row)=>{res.send(row)}).catch(()=>{res.send("Error in Post")})
});

app.post("/signup",(req,res)=>{

    db.postSignup(uuid.v4(),req.body.name, req.body.email, req.body.password).then((row)=>{res.send(row)}).catch(()=>{res.send("Email already exsists")})
})


app.post("/login",(req,res)=>{
   
    db.loginPost(req.body.email, req.body.password).then((row)=>{

        res.send(row)
    }).catch((err)=>{res.send(err)})

})


app.put("/putTodo",(req,res)=>{

    db.putTodo(req.body.description, req.body.id).then((row)=>{res.send(row)}).catch(()=>{res.send("Error in PUT")})
})


app.post("/deleteTodo",(req,res)=>{

    db.deleteTodo(req.body.todoid).then((row)=>{res.send(row)}).catch(()=>{res.send("Error in Delete")})
})


app.post("/getuserid",(req,res)=>{

    db.getUserId(req.body.email).then((row)=>{res.send(row)}).catch(()=>{res.send(err)})
})


app.post("/username",(req,res)=>{

    db.getUsername(req.body.userid).then((row)=>{res.send(row)}).catch(()=>{res.send(err)})
})