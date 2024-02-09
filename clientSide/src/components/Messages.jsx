

const Messages=({selectedUser,messages,users})=>{
  console.log(messages);

   

    return   <>


    
         
         {
          messages?
                
     messages.map((messageData)=>
      (
        <  div className={`message ${messageData.recipient==selectedUser&&"messageRight"}`} >
        {messageData.recipient==selectedUser ?  
          <div className="messageInfoOur">
           <div className="messageTextOur"><p style={{margin:'10px'}}>{messageData.text}</p></div>
        
           <div className="profile">{users?.username}</div></div> 
           :
             <div className="messageInfoOther">
           <div className="profile">{users?.username}</div>
           <div  className="messageTextOther"><p style={{margin:'10px'}}>{messageData.text}</p></div>
        
        </div> }
      </div>))
               

           
    
          :
          null
         }
    </>
}
export default Messages;