
import React, { useEffect, useState } from "react";
import Map from "../components/Agency/Map";
import styles from "./Agency.module.css";
import Resource from "../components/Agency/Resource";
import { ChatBubbleLeftEllipsisIcon , BellIcon} from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import Chat from '../components/ChatFeature/Chat'
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAgencyAsync,
  selectAllAgency,
} from "../components/Agency/agencySlice";
import { getAllAlerts, selectAllAlerts } from "../components/Alert/alertSlice";


// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 3,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

const AgencyCard = ({ agency }) => (
  <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-2xl  text-black mb-2">{agency.deptName}</h3>
    <p className="text-gray-700 mb-1"><strong>Address:</strong> {agency.address}</p>
    <p className="text-gray-700 mb-1"><strong>City:</strong> {agency.city}, {agency.pinCode}</p>
    <p className="text-gray-700"><strong>State:</strong> {agency.state}</p>
  </div>
);


function Landing2() {
  const [ws, setWs] = useState(null);
  const [messageData, setMessageData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgencyAsync());
    dispatch(getAllAlerts());
  }, [dispatch,messageData]);
  useEffect(() => {
    connectToWs();
   
  }, []);
  function connectToWs() {
    // const ws = new WebSocket("wss://chatapp-backend-2vo0.onrender.com");
    const ws = new WebSocket("wss://secureconnect-backend.onrender.com");
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
   
    
  }
  function handleMessage(e) {
    //from websocket
  //  console.log(e);
  const updatedMessageData = {
    ...messageData,
    timeStamp: e.timeStamp,
  };

  // Update state with the new messageData
  setMessageData(updatedMessageData); 
    const msgData = JSON.parse(e.data);
    if ("alert" in msgData){
      console.log(messageData);
      toast.error(`Alert, Please rush to the emergency location ${msgData.alert}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

   
  }

  const alerts = useSelector(selectAllAlerts);
  const agencies = useSelector(selectAllAgency);


   const [comp,setComp] = useState("Home");
  return (
    <div>
      <head>
        <title>Your Landing Page</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>

        {/* <!-- Include additional CSS for your custom styles --> */}
      </head>
      <body>
        <section class="hero relative bg-black text-white text-center py-5 bg-cover bg-center" style={{ backgroundImage: 
          "url('/banner3.jpg')",height: '60vh' }}>
          <div class="container mt-5">
            <h1 class="display-2">RescueConnect</h1>
            <p class="lead">Empowering Resilience: Our Path to Safety</p>
            
          </div>
          <div className={styles.notif}>
          <Dropdown>
          <style>
  {`
    .dropdown-toggle::after {
      display: none;
    }
  `}
</style>
          <Dropdown.Toggle 
  variant="danger" 
  id="dropdown-basic" 
  className="position-relative"
  style={{ 
    borderRadius: '50%',  // Make it rounded
    padding: '5px',      // Adjust padding for better sizing
    width: '50px',        // Set a width to maintain round shape
    height: '50px',       // Set a height to maintain round shape
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}
>
  <BellIcon className="h-6 w-6 text-white" />
  {/* Notification number */}
  <span 
    className="position-absolute translate-middle badge rounded-pill bg-primary text-white"
    style={{ fontSize: '0.8rem', padding: '0.25em 0.5em', lineHeight: '1' ,top:'2%',left:'90%'}}
  >
    {alerts && alerts.length}
  </span>
</Dropdown.Toggle>


      <Dropdown.Menu>
      {alerts &&  alerts.map((alert, index) => (
    <Dropdown.Item key={index} href="">
      {index + 1}. {alert.Address}
    </Dropdown.Item>
  ))}
      </Dropdown.Menu>
    </Dropdown>

          </div>
          <div className={styles.menu}>
            <button onClick={()=>setComp("Home")} className={styles.bt}>Home</button>
            <button onClick={()=>setComp("Resources")} className={styles.bt}>Manage Resources</button>
            <button onClick={()=>setComp("OtherAgencies")} className={styles.bt}>Other Agencies</button>
          </div>
        </section>
       {/* <section class="hero relative bg-black text-white text-center py-5 bg-cover bg-center" style={{ backgroundImage: 
    "url('/banner3.jpg')",height: '60vh' }}>
    
    <div class="container mt-5 d-flex justify-content-between align-items-start">
        

        <div>
            <h1 class="display-2">RescueConnect</h1>
            <p class="lead">Empowering Resilience: Our Path to Safety</p>
        </div>
    </div>
    
    <div className={styles.menu}>
        <button onClick={() => setComp("Home")} className={styles.bt}>Home</button>
        <button onClick={() => setComp("Resources")} className={styles.bt}>Manage Resources</button>
        <button onClick={() => setComp("OtherAgencies")} className={styles.bt}>Other Agencies</button>
    </div>
</section> */}


       

       
          {comp==="Resources" && <div>
            {/* <Chat/> */}
      <Resource></Resource>
     </div>}
     {comp==="Home" && <div style={{overflow:'auto'}}>
        <Map></Map>
        
     </div>}
     {comp==="OtherAgencies" &&
       <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/banner.jpg')" }}>
       <div className="container mx-auto p-6 relative">
         <div className="absolute top-8 right-4">
          <Link to={'/chat'}>
           <ChatBubbleLeftEllipsisIcon className="h-14 w-14 text-white" /></Link>
         </div>
         <div className="container">
           <h1 className="display-6 text-white text-center py-5">Disaster Management Agencies</h1>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {agencies && agencies.map(agency => (
             <AgencyCard key={agency._id} agency={agency} />
           ))}
         </div>
       </div>
     </div>}
       

      
      

      

        {/* 
<!-- Footer Section --> */}
        <footer class="bg-dark text-white text-center py-3">
          <div class="container">&copy; 2023 DMS</div>
        </footer>

        {/* <!-- Bootstrap JavaScript (Popper.js and Bootstrap JS) --> */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
        {/* <!-- Include additional JavaScript for your custom functionality --> */}
      </body>
      <ToastContainer/>
    </div>
  );
}

export default Landing2;
