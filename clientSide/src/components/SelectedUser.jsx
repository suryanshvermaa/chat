

const SelectedUser=({selectedUserId,users})=>{
 
     let currUser=null;
    if(selectedUserId){
    const ourUser=users.filter((p)=>(p._id==selectedUserId));
     currUser=ourUser[0].username;
    }
    return    <div className="selectedUser">
    <div className="selectedUserProfilePhoto">S</div>
   <div className="infoIRUser">
      {selectedUserId&& currUser &&<div className="selectedUserName">{currUser}</div>} 
        <div className="selectedUserBio">Student</div>
        <div className="Userstatus"></div>
   </div>
</div>
   

}
export default SelectedUser;