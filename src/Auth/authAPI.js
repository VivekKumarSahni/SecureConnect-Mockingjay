

async function getGeocode(agencyData) {
  try {
    const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=8gsJ3dqy4Z2QqtFQ5UjgJ5cfvJDOGgqE&location=${agencyData.address},${agencyData.city}-${agencyData.pinCode},${agencyData.state}`);
    const data = await response.json();
    const lat = data.results[0].locations[0].latLng.lat;
    const lng = data.results[0].locations[0].latLng.lng;
    const coordinates = [lat, lng];
    return { coordinates };
  } catch (error) {
  
    console.error("Error fetching geocode:", error);
    throw error; 
}
}


export async function registerAgency(agencyData) {
  try {
    // const coordinates = await getGeocode(agencyData);
    // agencyData = { ...agencyData, coordinates: [coordinates.coordinates[0], coordinates.coordinates[1]] };
    agencyData = { ...agencyData, coordinates: [24.68553, 92.75063] };

    console.log(agencyData);
    const response = await fetch('https://secureconnect-backend.onrender.com/auth/register', {
      method: 'POST',
      body: JSON.stringify(agencyData),
      headers: { 'content-type': 'application/json' }
    });

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error registering agency:", error);
    throw error;
  }
}

  



  export function checkUser(loginInfo) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await fetch('https://secureconnect-backend.onrender.com/auth/loginUser', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.json();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
      
      
    });
  }  
  export function checkAgency(loginInfo) {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await fetch('https://secureconnect-backend.onrender.com/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.token);
          localStorage.setItem('token', data.token);

          resolve({ data });
        } else {
          const error = await response.json();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
      
      
    });
  }  


  
export function signOut(userId) {
  return new Promise(async (resolve) => {
    
    // in backend we will remove userloggedin id

    resolve({ data: "Success" });
  });
} 
export function updateAgency(id,data) {
  return new Promise(async(resolve) =>{
   const response = await fetch('https://secureconnect-backend.onrender.com/agency/'+id,{
    method:'PATCH',
    body:JSON.stringify(data),
    headers:{'content-type':'application/json'}
   })
   const result = await response.json()
   resolve({result});
   console.log(result);
  
  }
  )
}
export function updateAgencyDelRes(id,resId) {
  return new Promise(async(resolve) =>{
   const response = await fetch('https://secureconnect-backend.onrender.com/agency/'+id,{
    method:'DELETE',
    body:JSON.stringify({resourceId:resId}),
    headers:{'content-type':'application/json'}
   })
   const result = await response.json()
   resolve({result});
  
  }
  )
}
export function getLoggedInAgency() {
  return new Promise(async(resolve) =>{
    const token = localStorage.getItem('token');

   const response = await fetch('https://secureconnect-backend.onrender.com/agency/own',{
    method:'GET',
    headers:{'content-type':'application/json','Authorization':token}
   })
   const data = await response.json()
   resolve({data});
  
  }
  )
}

