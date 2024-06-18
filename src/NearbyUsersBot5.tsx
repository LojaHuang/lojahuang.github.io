// src/NearbyUsersBot.tsx

import { Airgram } from '@airgram/web';
import React from 'react';
import { APP_HASH, APP_ID } from './Constants';

const NearbyUsersBot5: React.FC = () => {
    const airgram = new Airgram({
        useTestDc: true,
        apiId: APP_ID,
        apiHash: APP_HASH
    })

    airgram.api.getCountries().then(res => {
        console.log(res);
    }).catch(e => console.log(e))

    // airgram.api.getUserFullInfo().then(res =>
    //     console.log(res)
    // ).catch(e => console.log(e))

    // const fetchNearbyUsers = async () => {
    //     if (!airgram) return;

    //     try {
    //         const { response } = await airgram.api.getLocated({
    //             geoPoint: {
    //                 _: 'inputGeoPoint',
    //                 lat: 37.7749, // 示例的纬度，替换为实际的值
    //                 long: -122.4194, // 示例的经度，替换为实际的值
    //             },
    //         });

    //         if (response && response.users) {
    //             setNearbyUsers(response.users);
    //         }
    //     } catch (error) {
    //         console.error('Failed to get nearby users:', error);
    //     }
    // };

    return (
        <div>
            <h1>Nearby Users</h1>
        </div>
    );
};

export default NearbyUsersBot5;
