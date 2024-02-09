const AllUsers=({selected,setSelect,users})=>{

 
   
     const selectUser=(val)=>{
        setSelect(val);
     }

     console.log(users)
   
    return <>
      {
         users?
         
            users.map((user)=>(
              
                <div key={user._id}  className={`chatUser ${selected==user._id&&"activeUser"}`} onClick={()=>selectUser(user._id)}>
                 <div className="profilePhoto">{user?.username[0]}</div>
                  <div className="infoIUser">
                       <div className={`userName ${selected==user.username&&"activeUser"}`}>{user?.username}</div>
                       <div className="userBio">student</div>
                       <div className="status "> </div>
                </div>
                </div>
                 
            ))
        :
        null
      }
   </>
        
}
export default AllUsers;