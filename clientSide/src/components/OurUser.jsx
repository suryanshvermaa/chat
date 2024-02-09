
const OurUser=({loggedUser})=>{
    const letter=Object.values(loggedUser)[1];
    const firstLetter=letter;
    
    return  <div className="ourUser">
    <div className="ourProfile">
        <div className="ourProfilePhoto">{firstLetter}</div>
        <div className="infoUser">
            <div className="ourUserName">{loggedUser.username}</div>
             <div className="ourUserBio">student</div>
        </div>
    
    </div>
    <div className="searchBox">
        <input type="text" placeholder="Search users" className="inputSearch" />
    </div>
</div>
}
export default OurUser;