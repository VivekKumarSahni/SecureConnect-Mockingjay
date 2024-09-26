export function getAllAgency() {
    return new Promise(async(resolve) =>{
       
     const response = await fetch('https://secureconnect-backend.onrender.com/agency');

     const data = await response.json();
     resolve({data});
    
    }
    )
  }
 