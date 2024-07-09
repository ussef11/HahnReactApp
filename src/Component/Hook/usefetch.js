import { useEffect , useState } from "react";
const useFetch = (url ,renderValue) => {

    const [ispending, setIspending] = useState(true);
    const [errormsg, setErrormessage] = useState(null);
    const [Data, setData] = useState(null);
   
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwtToken')}`);
    
   
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
     
      redirect: "follow"
    };
    
  
      
    useEffect(() => { 
           fetch(url , requestOptions)
            .then((response) => {
              if (!response.ok) {
                throw Error("Could Not Fetch Data From That Resource :(");
              }
              return response.json();
            })
            .then((result) => {
              setData(result);
              setIspending(false);
              setErrormessage(null);
            })
            .catch((error) => {
              setErrormessage(error.message);
              setIspending(false);
            });
       
       
            
         }, [renderValue]);
      return { Data , errormsg , ispending}

}
 
export default useFetch;