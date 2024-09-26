import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
// import { UserContext } from "./UserContext.jsx";
import axios from "axios";
import Contact from "./Contact";
import { uniqBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgencyAsync, selectAllAgency } from "../Agency/agencySlice";
import {selectloggedInAgency} from "../../Auth/authSlice";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  // const { username, id, setId, setUsername } = useContext(UserContext);
  const agency = useSelector(selectloggedInAgency);
  console.log(agency);
  let id=null;
  let username=null;
  if(agency){
   id = agency._id;
   username = agency.deptName;
  }
  const divUnderMessages = useRef();
  const dispatch= useDispatch();

  useEffect(() => {
    connectToWs();

  }, []);
      useEffect(()=>{
        // console.log('hello');
        dispatch(getAllAgencyAsync());
},[dispatch]);

      const agencies = useSelector(selectAllAgency);
      console.log(agencies);
      
  // https://chatapp-backend-2vo0.onrender.com
  function connectToWs() {
    // const ws = new WebSocket("wss://chatapp-backend-2vo0.onrender.com");
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`wss://secureconnect-backend.onrender.com?token=${encodeURIComponent(token)}`);
    // const ws = new WebSocket("ws://localhost:8080");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      // Handle WebSocket errors
    });
    ws.addEventListener("close",handleClose); //its called adding a ping
  }
  function handleClose() {
    setTimeout(() => {
      console.log("Disconnected. Trying to reconnect.");
      ws.close();
      connectToWs();
    }, 1000);
    
      window.removeEventListener("close",handleClose);
    
  }
  function showOnlinePeople(peopleArray) {
    //this will store unique value of userdata in people object
    const people = {};
    const filteredPeopleArray = peopleArray.filter(person => person.id && person.deptName);

    filteredPeopleArray.forEach(({ id, deptName }) => {
      people[id] = deptName;
    });
    console.log(people);
    setOnlinePeople(people);
  }
  function handleMessage(e) {
    //from websocket
    console.log(e);
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      console.log(messageData);

      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      console.log(messageData.sender);
      console.log(selectedUserId);

      // setMessages(prev=>([...prev,{...messageData}])); 
      if (messageData.sender === localStorage.getItem('userId')) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
   
  }
  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );
    setNewMessageText("");

    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
  }
  function sendFile(ev) {
    console.log(ev.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        //first value is null which means we are not passing any event
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }
  useEffect(() => {
    console.log(agencies);
      const offlinePeopleArr = agencies
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      // console.log(offlinePeople);
      setOfflinePeople(offlinePeople);
  
  }, [onlinePeople]);

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) div.scrollIntoView({ behaviour: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (selectedUserId) {
      const token = localStorage.getItem('token');
      axios.get("/messages/" + selectedUserId, {
        headers: {
            'Authorization': token 
        }
      }).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, "_id");

  const [showContact, setShowContact] = useState(true);
  function openList() {
    console.log("true");
    setShowContact(true);
  }
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // MernChat
  return (
    <div>
      <div className="flex h-screen">
        <div className={`bg-white w-1/3 flex flex-col ${isSmallScreen ? ( showContact ? "w-full" : "hidden"):""}`}
        >
          <div className="flex-grow">
            <Logo />{" "}
            {Object.keys(onlinePeopleExclOurUser).map((userId) => (
              <Contact
                key={userId}
                id={userId}
                online={true}
                username={onlinePeopleExclOurUser[userId]}
                onClick={() => {
                  setShowContact(false);
                  localStorage.setItem('userId',userId);
                  setSelectedUserId(userId);
                  console.log({ userId });
                }}
                selected={userId === selectedUserId}
              />
            ))}
            {Object.keys(offlinePeople).map((userId) => (
              <Contact
                key={userId}
                id={userId}
                online={false}
                username={offlinePeople[userId].deptName}
                onClick={() => {
                  setSelectedUserId(userId);
                  setShowContact(false);
                  localStorage.setItem('userId',userId);
                  console.log({ userId });
                }}
                selected={userId === selectedUserId}
              />
            ))}
          </div>
          <div className="p-2 text-center flex items-center justify-center">
            <span className="mr-2 text-base text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              {username}
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col relative bg-blue-50 w-2/3 p-2 ${isSmallScreen? ( !showContact ? "w-full" : "hidden"):""}`}
        >
         {!!selectedUserId&& <div className=" top-0 left-0  w-full h-10 absolute flex z-20 bg-blue-400 border-b border-gray-100 ">
            <div onClick={openList} className="p-2">
              <svg
                className="w-6 h-6"
                viewBox="-1.92 -1.92 27.84 27.84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0.00024000000000000003"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
                    fill="#e3e3e3"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            {!!selectedUserId &&
              Object.keys(onlinePeople).includes(selectedUserId) && (
                <div
                  key={selectedUserId}
                  className={" flex items-center gap-2 cursor-pointer "}
                >
                  <div className="flex gap-2 py-2 pl-4 items-center">
                    <Avatar
                      online={true}
                      username={onlinePeopleExclOurUser[selectedUserId]}
                      userId={selectedUserId}
                    />
                    <span className="text-gray-800">
                      {onlinePeopleExclOurUser[selectedUserId]}
                    </span>
                  </div>
                </div>
              )}
            {!!selectedUserId &&
              !Object.keys(onlinePeople).includes(selectedUserId) && (
                <div
                  key={selectedUserId}
                  className={" flex items-center gap-2 cursor-pointer "}
                >
                  <div className="flex gap-2 py-2 pl-4 items-center">
                    <Avatar
                      online={false}
                      username={offlinePeople[selectedUserId].deptName}
                      userId={selectedUserId}
                    />
                    <span className="text-gray-800">
                      {offlinePeople[selectedUserId].deptName}
                    </span>
                  </div>
                </div>
              )}
          </div>}
          <div className="flex-grow">
            {!selectedUserId && (
              <div className="flex h-full flex-grow items-center justify-center">
                <div className="text-gray-300">
                  &larr; Select a person from the sidebar
                </div>
              </div>
            )}
            {!!selectedUserId && (
              <div className="relative h-full ">
                <div className="overflow-y-scroll absolute inset-0 mt-8">
                  {messagesWithoutDupes.map((message) => (
                    <div
                      key={message._id}
                      className={
                        message.sender === id ? "text-right" : "text-left"
                      }
                    >
                      <div
                        className={
                          "text-left inline-block p-2 my-2 rounded-md text-sm " +
                          (message.sender === id
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-500")
                        }
                      >
                        {/* sender:{message.sender}<br/>
                      my id: {id}<br/> */}
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={divUnderMessages}></div>
                </div>
              </div>
            )}
          </div>
          {!!selectedUserId && (
            <form className="flex gap-2" onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessageText}
                onChange={(ev) => setNewMessageText(ev.target.value)}
                placeholder="Type your message here"
                className="bg-white flex-grow border rounded-sm p-2"
              />
              <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
                <input type="file" className="hidden" onChange={sendFile} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button
                type="submit"
                className="bg-blue-500 p-2 text-white rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
