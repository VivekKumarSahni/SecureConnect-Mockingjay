

// import { useLoadScript,GoogleMap  } from "@react-google-maps/api";
// import { useMemo } from "react";

// // import Map from "../components/map";

// export default function Home() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCGLln8lKHCSWL3repHu9cUpDX5l98DHgk",
//     libraries: ["places"],
//   });
//   const center= useMemo(()=>({lat:24.80498,lng:92.77359}),[]);
//   if (!isLoaded) return <div>Loading...</div>;
//   return  (
    
//     <div>
//         <GoogleMap zoom={10} center={center} mapContainerClassName="map-Container"></GoogleMap>
//     </div>
// );
// }

import { MapContainer, TileLayer, Marker, Popup,Circle } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css';
// import MarkerClusterGroup from "react-leaflet-cluster";
import {  useSelector,useDispatch } from "react-redux";
import {  selectAllAgency,getAllAgencyAsync } from "./agencySlice";
import { useEffect } from "react";
import { selectAllAlerts ,getAllAlerts} from "../Alert/alertSlice";

export default function Map() {
  const dispatch = useDispatch();

 
  
    const customIcon = new Icon({
        
        iconUrl: require("./location.png"),
        iconSize: [38, 38] // size of the icon
      });
    const customIcon2 = new Icon({
        
        iconUrl: require("./location2.png"),
        iconSize: [42, 42] // size of the icon
      });
      const markers = [
        {
          geocode: [24.80498, 92.77359],
          popUp: "Hello, I am pop up 1"
        },
        {
          geocode: [24.82619, 92.80031],
          popUp: "Hello, I am pop up 2"
        },
        {
          geocode: [24.82371, 92.79774],
          popUp: "Hello, I am pop up 3"
        }
      ];
     

      const agencies = useSelector(selectAllAgency);
      const alerts = useSelector(selectAllAlerts);
      console.log(agencies);
      console.log(alerts);
   return (
    <>
    <div>
      
    </div>
      {(agencies && alerts) && <MapContainer center={[24.80498, 92.77359]} zoom={13}>
       
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        
       {agencies.map((marker) => (
          <Marker position={marker.coordinates} icon={customIcon}>
            <Popup>{marker.deptName}</Popup>
          </Marker>
        ))}
      {alerts.map((marker) => (
          <Marker position={marker.coordinates} icon={customIcon2}>
            <Popup>{marker.Address}</Popup>
          </Marker>
        ))}
         <Circle
      center={[24.75987,92.78827]}
      pathOptions={{ fillColor: '#088F8F',color:'#088F8F',fillOpacity:0.1,width:0.1 }}
      radius={10000}>
      
    </Circle>

     
      
       </MapContainer>}
       </>
    )}