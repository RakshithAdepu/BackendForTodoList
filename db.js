const sql = require("mysql2");


var jwt = require('jsonwebtoken');


const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rakshith@2929",
  database: "todo",
});

const getTodo = (i) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todolist WHERE userid=?",[i], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};



const postTodo =(u,i,d)=>{

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO todolist (userid,todoid, todo) VALUES(?,?,?)", [u,i,d],(err,row)=>{
    
            if(err){
    
                reject(err)
            }
    
            else{
                resolve(row)
            }
        })
    })
      
    }


    const getUserId= (e)=>{

        return new Promise((resolve, reject) => {
            connection.query("SELECT userid FROM signup WHERE email = ? ", [e], (err, row)=>{

                if(err){
reject(err)

                }
                else{
                    resolve(row)
                }
            })
        })

    }


    const postSignup = (i, u, e, p) => {
        return new Promise((resolve, reject) => {
          // Check if the email already exists
          connection.query("SELECT * FROM signup WHERE email = ?", [e], (err, rows) => {
            if (err) {
              reject(err); // Reject the promise with an error if the database query fails
            } else if (rows.length > 0) {
              reject('Email already exists'); // Reject the promise with a custom error message
            } else {
              // If the email is not found, insert the user data
              connection.query("INSERT INTO signup (userid, username, email, password) VALUES(?,?,?,?)", [i, u, e, p], (err, row) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(row); // Resolve the promise with the result (row) if the query is successful
                }
              });
            }
          });
        });
      }
      
    

      const loginPost = (email, password) => {
        return new Promise((resolve, reject) => {
          // Replace with actual database queries
          connection.query('SELECT * FROM signup WHERE email = ?', [email], (err, rows) => {
            if (err) {
              reject(err);
            } else if (rows.length === 0) {
              reject('Email not found. Please sign up.');
            } else {
              const user = rows[0];
              if (user.password === password) {
                // Password matches; resolve with user data
                resolve(jwt.sign({
                    data: 'foobar'
                  }, 'secret', { expiresIn: '1h' }));
              } else {
                // Password is incorrect
                reject('Incorrect password. Please check your password.');
              }
            }
          });
        });
      };
      
      
    
    
 
    
    
    const putTodo=(d,i)=>{
    return new Promise((resolve, reject) => {
        
    
        connection.query("UPDATE todolist SET description = ? WHERE id = ?", [d, i],(err,row)=>{
            if(err){
            reject(err)
            }else{
            
                resolve(row)
            }
            
                })
    })
      
    }
    
    

    
    
    const deleteTodo=(id)=>{
    
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM todolist WHERE todoid =? ",[id],(err,row)=>{
    
            if(err){
                reject(err)
            }
            else{
        
                resolve(row)
            }
        })
    })
    
    
    }



    const getUsername= (i)=>{

        return new Promise((resolve, reject) => {
            connection.query("SELECT username FROM signup WHERE userid = ? ", [i], (err, row)=>{
    
                if(err){
    reject(err)
    
                }
                else{
                    resolve(row)
                }
            })
        })
    
    }





    
module.exports={

    getTodo, postTodo, putTodo, deleteTodo, postSignup, loginPost, getUserId,getUsername
}



