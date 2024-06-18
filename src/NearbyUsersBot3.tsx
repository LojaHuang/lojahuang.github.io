// // src/NearbyUsersBot.tsx

// import React, { useEffect, useState } from 'react';
// import { Airgram, Auth, User, ApiResponse } from 'airgram'

// const NearbyUsersBot3: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(false);
//     const airgram = new Airgram({
//         apiId: process.env.APP_ID as number | undefined,
//         apiHash: process.env.APP_HASH,
//         command: process.env.TDLIB_COMMAND,
//         databaseDirectory: process.env.TDLIB_DB,
//         logVerbosityLevel: 2
//     })

//     useEffect(() => {
//         airgram.use(
//             new Auth({
//                 token: process.env.BOT_TOKEN
//             })
//         )
//         let botId: number | undefined
//         // Getting new messages
//         airgram.on('updateNewMessage', async ({ update, airgram }) => {
//             console.log('received updateNewMessage event');

//             // only if we know self(bot) user id
//             if (typeof botId === 'number') {
//                 const { message } = update
//                 if (
//                     message.senderId.userId !== botId && // avoid self messages
//                     message.content._ === 'messageText' && // listen for text messages only
//                     message.content.text._ === 'formattedText' // listen for text messages only
//                 ) {
//                     console.log('reply to message', message.content.text.text);


//                     airgram.api.sendMessage({
//                         chatId: message.chatId,
//                         replyToMessageId: message.id,
//                         inputMessageContent: {
//                             _: 'inputMessageText',
//                             text: {
//                                 _: 'formattedText',
//                                 text: message.content.text.text
//                             }
//                         }
//                     })
//                 }
//             }
//         })
//         airgram.api
//             .getMe()
//             .then((ctx: ApiResponse<never, User>) => {
//                 if (ctx.response._ === 'user') {
//                     botId = ctx.response.id
//                     console.log('got self user id', botId);

//                 }
//                 if (ctx.response._ === 'error' && ctx.response.code === 401) {
//                     throw new Error('You are not authorized')
//                 }
//             })
//             .catch(err => {
//                 console.log(err);

//                 airgram.destroy()
//             })
//     }, [])


//     function nearby() {
//         console.log('nearby', navigator.geolocation);
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 fetchNearbyUsers(position.coords.latitude, position.coords.longitude);
//             });
//         }
//     }

//     const fetchNearbyUsers = async (latitude: number, longitude: number) => {
//         setLoading(true);
//         try {
//             console.log(`fetchNearbyUsers:${latitude} ${longitude}`);
//             // const response = await controller.send({
//             //     '@type': 'contacts.getLocated',
//             //     geo_point: {
//             //         '@type': 'location',
//             //         latitude,
//             //         longitude,
//             //         accuracy_radius: 100,
//             //     }
//             // });
//             // const response = await airgram.api.getUser
//             // // const response = await controller.send({
//             // //     '@type': 'getContacts'
//             // // });

//             // console.log('Nearby users response:', response);

//             // if (response && response['users']) {
//             //     // 处理返回的用户数据
//             //     const fetchedUsers: User[] = response['users'].map((user: any) => ({
//             //         id: user.id,
//             //         first_name: user.first_name,
//             //         last_name: user.last_name,
//             //         distance: user.distance,
//             //     }));
//             //     setUsers(fetchedUsers);
//             // }
//         } catch (error) {
//             console.error('Error fetching nearby users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1 onClick={nearby}>Nearby Users</h1>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <ul>
//                     {/* {users.map((user) => (
//                         <li key={user.id}>
//                             <p>Name: {user.first_name} {user.last_name}</p>
//                             <p>Distance: {user.distance} meters</p>
//                         </li>
//                     ))} */}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default NearbyUsersBot3;
