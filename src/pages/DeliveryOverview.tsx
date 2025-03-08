import Map from "../components/map/Map";
//import MapboxExample from "../components/map/WholePageMaps";
import {fetchUserData} from "../services/UsersService";
import { useEffect, useState } from "react";
import { User } from "../types";

const DeliveryOverview = () => {
    const [userData, setUserData] = useState<User[]>([]);
    
  
    useEffect(() => {
      fetchUserData()
        .then((data) => {
          console.log({ fetchUserData: data });
        
          setUserData(data);
        })
        .catch((error) => console.error(error));
    }, []);
    return ( 
        <div>
        
           <Map data={userData}/>
        </div>
     );
}
 
export default DeliveryOverview;