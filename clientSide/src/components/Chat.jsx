import { useEffect, useRef, useState } from "react";
import AllUsers from "./AllUsers";
import Messages from "./Messages";
import MainProfile from "./SelectedUserMainProfile";
import OurUser from "./OurUser";
import SelectedUser from "./SelectedUser";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import MiddleProfile from "./middleProfile";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const messagesData = [
    {
      sender: "jhh",
      recipient:"kh",
      text:"jhhj efjjhefe"
    },
    {
      sender: "jhh",
      recipient:"kh",
      text:"jhhj efjjhefe"
    },
    {
      sender: "jhh",
      recipient:"kh",
      text:"jhhj efjjhefe"
    },
    {
      sender: "jhh",
      recipient:"kh",
      text:"helloi nshs"
    },
   
  ];

  const userData = [
    {
      _id: 1,
      username: "suryansh verma",
    },
    {
      _id: 2,
      username: "suryansh",
    },
    {
      _id: 3,
      username: "ansh verma",
    },
    {
      _id: 4,
      username: "surya verma",
    },
  ];

  const redirect = useNavigate();
  const [ws, setWs] = useState("");
  const [users, setUsers] = useState(userData);
  const [selectedUser, setSelectedUser] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState("");
  const [offlineUsers, setOfflineUsers] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const [messageText, setMessageText] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  if (cookies.token) {
    const token = jwtDecode(cookies.token);
    if (!token.username) {
      redirect("/");
    }
  } else {
    redirect("/");
  }

 
  
  //setting Logged user
  useEffect(() => {
   try {
      const token = cookies.token;
      console.log(token);
      const decoded = jwtDecode(token);
      setLoggedUser(decoded);
   } catch (error) {
      console.log("got error")
   }
   
  }, []);


    //messages
    useEffect(() => {
      
      console.log(selectedUser);
      // try {
      //   axios.get(`http://loacalhost:8080/messages/${selectedUser}`).then((res) => {
      //     console.log(res.data);
      //     setMessages(res.data);
      //   });
      // } catch (err) {
      //   console.log(err);
      // }
    }, [selectedUser])

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/users").then((res)=>{
         const resData=res.data;
         setUsers(resData);
      })
   
    } catch (err) {
      console.log("error");
    }
  }, []);


  //ref
  const messageInputText = useRef();

  const connectToWs = () => {
    try {
      const ws = new WebSocket("ws://localhost:8080");
      setWs(ws);
    } catch (error) {
      console.log(error);
    }
  };

  const wsConnection = async () => {
    try {
      connectToWs();

       ws.addEventListener('message',handleMessage)
    } catch (error) {
      console.log("err");
    }
  };



  useEffect(() => {
    wsConnection();
  }, [selectedUser]);

  function handleMessage(ev) {
    try {
      const messages = JSON.parse(ev.data);
      console.log(ev);
      if ("online" in messages) {
        console.log(messages.online);
        setOnlineUsers(messages.online);
      }
      if ('messageOBJ' in messages) {
        console.log('')
        setMessages(message.messageOBJ)
      }
    } catch (error) {
      console.log(error);
    }
  }

  //send Message
  const sendMessage = (ev) => {
    ev.preventDefault();
    const messageInputTextBoxi = {
      sender: loggedUser.userId,
      recipient: selectedUser,
      text: messageInputText.current.value,
    };
     
     ws.send(JSON.stringify(messageInputTextBoxi));
     setMessages(prev => (
       [...prev, {...messageInputTextBoxi}]
      ));
  };



  




  return (
    <>
      <div className="mainChat">
        <div className="chatUsers">
          <OurUser loggedUser={loggedUser} />

          <AllUsers
            selected={selectedUser}
            setSelect={setSelectedUser}
            users={users}
          />
        </div>

        <div className="chatUi">
          {selectedUser ? (
            <>
              <SelectedUser selectedUserId={selectedUser} users={users} />
              {selectedUser && (
                <Messages
                  selectedUser={selectedUser}
                  messages={messages}
                  users={users}
                  
                />
              )}
            </>
          ) : (
            <MiddleProfile />
          )}

          <form className="messageInputBox" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="type your message here"
              className="messageInput"
              ref={messageInputText}
            />
            <button className="sendMessage" type="submit">
              Send
            </button>
          </form>
        </div>

        <MainProfile selectedUser={selectedUser} users={users} />
      </div>
    </>
  );
};
export default Chat;
