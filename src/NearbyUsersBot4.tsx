// import React, { useEffect, useRef, useState } from 'react';

// // Define the type for the response from the TdClient
// type NearbyUser = {
//     user_id: number;
//     distance: number;
// };

// const TdClientComponent: React.FC = () => {
//     const tdClientRef = useRef<any>(null);
//     const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);

//     useEffect(() => {
//         // Load the tdweb.js script
//         const script = document.createElement('script');
//         script.src = '/tdweb.js'; // Ensure this path is correct
//         script.onload = () => {
//             // Initialize TdClient after the script is loaded
//             if (window['tdweb']) {
//                 const TdClient = window['tdweb'].TdClient;

//                 // Initialize TdClient with the appropriate configuration
//                 tdClientRef.current = new TdClient({
//                     instanceName: 'exampleInstance',
//                     mode: 'default',
//                 });

//                 // Connect to the Telegram server
//                 tdClientRef.current.send({
//                     '@type': 'setTdlibParameters',
//                     parameters: {
//                         database_directory: 'tdlib',
//                         use_file_database: false,
//                         use_chat_info_database: false,
//                         use_message_database: false,
//                         use_secret_chats: true,
//                         api_id: '25515933', // Replace with your actual API ID
//                         api_hash: '51a5e148f0ed37a026dc2616ef50ae7f', // Replace with your actual API hash
//                         system_language_code: 'en',
//                         device_model: 'Desktop',
//                         system_version: '1.0',
//                         application_version: '1.0',
//                         enable_storage_optimizer: true,
//                         ignore_file_names: true
//                     }
//                 });

//                 // Auth user by phone number or bot token
//                 // Here, you should authenticate the user, e.g., by phone number or bot token

//                 // Fetch nearby users (assuming you have the user's location)
//                 const fetchNearbyUsers = () => {
//                     tdClientRef.current.send({
//                         '@type': 'contacts.getLocated',
//                         geo_point: {
//                             '@type': 'inputGeoPoint',
//                             lat: 40.7128,  // Replace with actual latitude
//                             long: -74.0060 // Replace with actual longitude
//                         }
//                     }).then((response: any) => {
//                         console.log('Nearby users response:', response);
//                         // Process the response and update state
//                         if (response['@type'] === 'updates' && response.updates) {
//                             const users = response.updates.flatMap((update: any) =>
//                                 update.users.map((user: any) => ({
//                                     user_id: user.user_id,
//                                     distance: user.distance,
//                                 }))
//                             );
//                             setNearbyUsers(users);
//                         }
//                     }).catch((error: any) => {
//                         console.error('Error fetching nearby users:', error);
//                     });
//                 };

//                 // Call the fetchNearbyUsers function
//                 fetchNearbyUsers();
//             }
//         };
//         document.body.appendChild(script);

//         // Cleanup the script element on component unmount
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Telegram Nearby Users Example</h1>
//             <ul>
//                 {nearbyUsers.map(user => (
//                     <li key={user.user_id}>
//                         User ID: {user.user_id}, Distance: {user.distance} meters
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TdClientComponent;
