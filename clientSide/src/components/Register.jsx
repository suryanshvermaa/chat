import { useRef, useState } from "react";
import axios from 'axios';
import {Cookies, useCookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";




const Register=()=>{
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [signOrLog,setSL]=useState('Sign Up');
    const [cookies,setCookies,removeCookie]=useCookies();
    const redirect=useNavigate()
    
   
    
   


    const userNameR=useRef();
    const passwordR=useRef();


    const axiosFormLogin=()=>{
      axios.post('http://localhost:8080/login',data).then((res)=>{
        console.log(res.data)
       
        const actualToken=res.data.tokenS;
        setCookies('token',actualToken)
      })
    }
    const axiosFormRegister=(data)=>{
      axios.post('http://localhost:8080/register',data).then((res)=>{
        console.log(res.data)
        const actualToken=res.data.tokenS;
        
        setCookies('token',actualToken)
      
      })
      
     }

    const submitForm=  async(event)=>{
        event.preventDefault();
        setUserName(userNameR.current.value);
        setPassword(passwordR.current.value);
        console.log(username,password)
        const signUpData={username,password};
        try{
         if(signOrLog=="Sign Up"){
          await axiosFormRegister(signUpData);
         }
          else{
            await axiosFormLogin(signUpData);
          }
          
        }
        catch(err){
          console.log(err);

        }
        
       
          

        
      
         

    }
    const setoptions=()=>{
      if(signOrLog=="Sign Up"){
           setSL("Log In")
      }
      else if(signOrLog=="Log In"){
           setSL("Sign Up")
      }
      
    }
     
    if(cookies.token){
        
      const token=jwtDecode(cookies.token);
      if(token.username){
        redirect('/chat');
      }
    
      
       
    }

     return   <div className="signUp">
      <div class="form-box">
     <form method="POST" class="form" onSubmit={submitForm}>
         <span class="title">{signOrLog}</span>
         <span clemail></span>
         <div class="form-container">
         
                 <input type="text" class="input" ref={userNameR} placeholder="User Name"  />
                 <input type="password" class="input" ref={passwordR} placeholder="Password" />
         </div>
         <button type="submit">{signOrLog}</button>
     </form>
     <div class="form-section">
       <p>Have an account?<a onClick={setoptions} > {signOrLog=="Sign Up"?"Log In":"Sign Up"}</a> </p>
     </div>
     </div>
     </div>
}
export default Register;