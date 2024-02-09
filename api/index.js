 const User=require('./models/user')
 const Message=require('./models/message')
 require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const app=express();
 const cors=require('cors');
 const bcrypt=require('bcrypt');
 const cookieParser=require('cookie-parser');
 const jwt=require('jsonwebtoken');
const ws = require('ws');



 app.use(cors());
app.use(express.json())
//database connection
const connection=async()=>{
 await mongoose.connect(process.env.MONGO_URL);
 console.log("database connected");
}
  

connection();



    app.get('/messages/:userId',async(req,res)=>{
     try {
      const userId=req.params.userId;
      const cookies=req.headers.cookie;
      console.log(cookies)  
      if(cookies){
       const token=cookies.split('=')[1];
        if(token){
           jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            const ourId=userData._id;
            const MessageData=await Message.find({
                sender:{$in:[userId,ourId]},
                recipient:{$in:[userId,ourId]}
            }).sort({createdAt:1});
            console.log(MessageData)
            res.json(MessageData);
             
           })
         }
 
      }
      
     } catch (error) {
      console.log('err')
     }
    })


    app.get('/profile',(req,res)=>{
      const cookie=req.headers;
      console.log(cookie);
    })


     const jwtSecret=process.env.JWT_SECRET;

  app.post('/register', (req,res)=>{
        
       try{
         const {username,password}=req.body;
        const hashedPassword=bcrypt.hashSync(password,10);

        const user=new User({
          username,
          password:hashedPassword
        });
        user.save();
        jwt.sign({userId:user._id,username},jwtSecret,{},(err,token)=>{
          if(err) throw console.error("error");
          console.log(token)
          
          res.json({tokenS:token})
          // res.cookie('token',token,{sameSite:"none",secure:true}).json({
          //   id:user._id
          // })
          console.log("success")
        })

       }
       catch(err){
         console.log("err in register");
       }
        
  })

     app.post('/login',async(req,res)=>{
        try{
               const {username,password}=req.body;
               const user=await User.findOne({username});
               if(user){
                const isOK=bcrypt.compareSync(password,user.password)
                if(isOK){
                  jwt.sign({userId:user._id,username},jwtSecret,{},(err,token)=>{
                    if(err) {
                      console.log("failed").json("failed to generate token")
                      return;
                    }
                    console.log("login successful")
                    res.json({tokenS:token})
                  })
                }

               }
        }catch(err){
          res.json("error in login")
          console.log("failed in log in")
        }
     })

     app.get('/users',async(req,res)=>{
        try{
              const users=await User.find();
              console.log("success")
              res.json(users)
              
        }catch(err){
          console.log("error in finding users")
        }
     })
     app.post('/logout',(req,res)=>{
      try{
        const token="";
        res.cookie('token',token,{sameSite:"none",secure:true}).json("logout successful")
      }
      catch(err){
        console.log("error in logout");
      }
    })
        

 const server=app.listen(8080,()=>{
  console.log("seerver conneced");
 });

 const wss=new ws.WebSocketServer({server});
  
   const notifyAboutOnlinePeople=()=>{
        [...wss.clients].forEach((client)=>{
          client.send(JSON.stringify({
            online:[...wss.clients].map((user)=>({user:user.userId,
            username:user.username}))
          }))
        })
   }


 wss.on('connection',(connection,req)=>{
     notifyAboutOnlinePeople();
   
    
      
    //recieving messages from client
    connection.on('message',(message)=>{
      console.log(JSON.parse(message))
      const messageData=JSON.parse(message);
         //save messages in database
         try {
          const message=  new Message(messageData);
             message.save();
          console.log(message);
           //sending messages to the recipient
         [...wss.clients].filter((c)=>c._id==message.recipient).forEach((client)=>{
          client.send(JSON.stringify({
            messgeOBJ:message
          }))
         })
         } catch (error) {
          console.log("got err");
         }
      
        
          



    })
    //  saving active users
    const cookies=req.headers.cookie;   
     if(cookies){
      const token=cookies.split('=')[1];
       if(token){
          jwt.verify(token,jwtSecret,{},(err,userData)=>{
            connection.userId=userData._id;
            connection.username=userData.username;
            console.log(connection.username)
            
          })
        }

     }
    
})
     
  
     
 
     
     
     


 