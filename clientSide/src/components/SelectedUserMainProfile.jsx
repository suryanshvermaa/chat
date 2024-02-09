
const MainProfile=({selectedUser,users},)=>{
    console.log(users)
    
    let currUser=null;
   if(selectedUser){
   const ourUser=users.filter((p)=>(p._id==selectedUser));
    currUser=ourUser[0].username;
   }
    return   <div className="selectedUserMainProfile">
    <div className="selectedUserProfilePhoto2">S</div>
    {selectedUser&& currUser && <div className="selectedUserProfileName">{currUser}</div>}
    
    <div className="selectedUserProfileBio">Student</div>
  
</div>
}
export default MainProfile;