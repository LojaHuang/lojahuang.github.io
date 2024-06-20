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

    // airgram.use(new Auth({
    //     code: () => window.prompt('Please enter the secret code:') || '',
    //     phoneNumber: () => window.prompt('Please enter your phone number:') || '',
    //     password: () => window.prompt('Please enter your password:') || ''
    // }))
    console.error('loja test NearbyUsersBot5');
    console.error(airgram);




    // 处理授权状态
    airgram.on('updateAuthorizationState', async (ctx) => {
        const state = ctx.update.authorizationState._;
        if (state === 'authorizationStateWaitTdlibParameters') {
            await airgram.api.setTdlibParameters({
                parameters: {
                    _: 'tdlibParameters',
                    apiId: APP_ID,
                    apiHash: APP_HASH,
                    useTestDc: false,
                    systemLanguageCode: 'en',
                    deviceModel: 'Desktop',
                    systemVersion: '1.0',
                    applicationVersion: '1.0',
                    enableStorageOptimizer: true,
                }
            });
        } else if (state === 'authorizationStateWaitEncryptionKey') {
            await airgram.api.checkDatabaseEncryptionKey({ encryptionKey: '' });
        } else if (state === 'authorizationStateWaitPhoneNumber') {
            await airgram.api.setAuthenticationPhoneNumber({ phoneNumber: '+1234567890' }); // 使用你自己的测试电话号码
        } else if (state === 'authorizationStateReady') {

        }
    });

    // 监听其他重要的更新
    airgram.on('updateOption', (ctx) => {
        console.log('Option updated:', ctx.update);
    });

    // 监听新消息
    airgram.on('updateNewMessage', (ctx) => {
        const message = ctx.update.message;
        console.error(message);
        console.error(ctx);
    });

    // 监听聊天更新
    airgram.on('updateChat', (ctx) => {
        console.error('updateChat');
        console.error(ctx);

    });

    // 监听所有事件
    airgram.on('update', (ctx) => {
        console.error('on update');
        console.error(ctx);
    });


    // airgram.api.getCountries().then(res => {
    //     console.log(res);
    // }).catch(e => console.log(e))

    function nearby() {
        airgram.api.searchChatsNearby({
            location: {
                _: 'location',
                latitude: 37.7749,  // 示例的纬度，替换为实际的值
                longitude: -122.4194,  // 示例的经度，替换为实际的值
            }
        }).then(res => {
            console.log('searchChatsNearby');
            console.log(res);
        }).catch(e => console.log(e))
    }

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
            <h1 onClick={nearby}>Nearby Users</h1>

        </div>
    );
};

export default NearbyUsersBot5;
