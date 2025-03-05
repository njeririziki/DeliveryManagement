
import { Descriptions, Typography } from 'antd';
import Map from '../components/map/Map';
//import { User } from '../types';
import { useSelectedUserDetails } from '../context/UserContext';


// const user ={
//         id: 7,
//         name: "Kurtis Weissnat",
//         username: "Elwyn.Skiles",
//         email: "Telly.Hoeger@billy.biz",
//         address: {
//           street: "Rex Trail",
//           suite: "Suite 280",
//           city: "Howemouth",
//           zipcode: "58804-1099",
//           geo: {
//             lat: "24.8918",
//             lng: "21.8984"
//           }
//         },
//         phone: "210.067.6132",
//         website: "elvis.io",
        
//       }

const UserDetails = () => {
  //  const [user, setuser] = useState<User | null>(null);
  const { selectedUser } = useSelectedUserDetails();

    return ( 
     <div>
            <Typography.Title level={2}>User</Typography.Title>
            {selectedUser ? (
               <>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
                    <Descriptions.Item label="Username">{selectedUser.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{selectedUser.phone}</Descriptions.Item>
                    <Descriptions.Item label="Website">{selectedUser.website}</Descriptions.Item>
                    <Descriptions.Item label="Address">{selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</Descriptions.Item>
                    <Descriptions.Item label="Zipcode">{selectedUser.address.zipcode}</Descriptions.Item>
                </Descriptions>
                <Map data={[+selectedUser.address.geo.lng, +selectedUser.address.geo.lat ]}/>
                </>
            ) : (
                <Typography.Text>Loading...</Typography.Text>
            )}
     </div>
     );
}
 
export default UserDetails;