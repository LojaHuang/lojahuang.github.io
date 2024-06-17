// src/NearbyUsersBot.tsx

import React, { useState } from 'react';
import controller from './Controllers/TdLibController';

// 定义用户信息的类型
interface User {
    id: number;
    first_name: string;
    last_name?: string;
    distance: number;
}

controller.init();

const NearbyUsersBot2: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    function nearby() {
        console.log('nearby', navigator.geolocation);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchNearbyUsers(position.coords.latitude, position.coords.longitude);
            });
        }
    }

    const fetchNearbyUsers = async (latitude: number, longitude: number) => {
        setLoading(true);
        try {
            console.log(`fetchNearbyUsers:${latitude} ${longitude}`);
            // const response = await controller.send({
            //     '@type': 'contacts.getLocated',
            //     geo_point: {
            //         '@type': 'location',
            //         latitude,
            //         longitude,
            //         accuracy_radius: 100,
            //     }
            // });
            const response = await controller.send({
                '@type': 'getContacts'
            });

            console.log('Nearby users response:', response);

            if (response && response['users']) {
                // 处理返回的用户数据
                const fetchedUsers: User[] = response['users'].map((user: any) => ({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    distance: user.distance,
                }));
                setUsers(fetchedUsers);
            }
        } catch (error) {
            console.error('Error fetching nearby users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 onClick={nearby}>Nearby Users</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>Name: {user.first_name} {user.last_name}</p>
                            <p>Distance: {user.distance} meters</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NearbyUsersBot2;
