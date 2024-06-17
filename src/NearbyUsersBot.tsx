// src/NearbyUsersBot.tsx

import React, { useEffect, useState } from 'react';
import TdClient, { TdObject } from 'tdweb/dist/tdweb';

// 定义用户信息的类型
interface User {
    id: number;
    first_name: string;
    last_name?: string;
    distance: number;
}

const API_ID = '25515933';  // 在 Telegram 开发者平台获取
const API_HASH = '51a5e148f0ed37a026dc2616ef50ae7f';  // 在 Telegram 开发者平台获取

const NearbyUsersBot: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState<TdClient | null>(null);
    const [text, setText] = useState("")

    useEffect(() => {
        // 初始化 tdweb 客户端
        const tdClient = new TdClient({
            useDatabase: false,
            verbosityLevel: 1,
            apiId: API_ID,
            apiHash: API_HASH,
            useSecretChats: false,
            useTestDc: false,
        });
        setClient(tdClient);

        // 当 tdClient 初始化完毕，进行登录操作
        tdClient.onUpdate(handleUpdate);
        tdClient.send({ '@type': 'getAuthorizationState' });

        return () => {
            tdClient.offUpdate(handleUpdate);
            tdClient.destroy();
        };
    }, []);

    const handleUpdate = (update: TdObject) => {
        console.log('Update from tdweb:', update);
        setText(`${text}Update from tdweb:${update}`)
        switch (update['@type']) {
            case 'authorizationStateWaitTdlibParameters':
                client?.send({
                    '@type': 'setTdlibParameters',
                    parameters: {
                        '@type': 'tdlibParameters',
                        database_directory: '/tdlib',
                        files_directory: '/tdlib/files',
                        use_message_database: false,
                        use_secret_chats: false,
                        api_id: API_ID,
                        api_hash: API_HASH,
                        system_language_code: 'en',
                        device_model: 'TDLib',
                        system_version: '1.0',
                        application_version: '1.0',
                        enable_storage_optimizer: true,
                        use_file_database: false,
                    }
                });
                break;
            case 'authorizationStateWaitEncryptionKey':
                client?.send({
                    '@type': 'checkDatabaseEncryptionKey',
                    encryption_key: '',
                });
                break;
            case 'authorizationStateWaitPhoneNumber':
                client?.send({
                    '@type': 'setAuthenticationPhoneNumber',
                    phone_number: 'YOUR_PHONE_NUMBER',  // 在这里使用你注册的电话号码
                });
                break;
            case 'authorizationStateWaitCode':
                const code = prompt('Please enter the authentication code you received');
                if (code) {
                    client?.send({
                        '@type': 'checkAuthenticationCode',
                        code,
                    });
                }
                break;
            case 'authorizationStateReady':
                // 用户成功登录后，获取地理位置
                setText(`${text}authorizationStateReady:${navigator.geolocation}`)
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        fetchNearbyUsers(position.coords.latitude, position.coords.longitude);
                    });
                }
                break;
            default:
                break;
        }
    };

    const fetchNearbyUsers = async (latitude: number, longitude: number) => {
        setLoading(true);
        try {
            setText(`${text}fetchNearbyUsers:${latitude} ${longitude}`)
            const response = await client?.send({
                '@type': 'getContactsLocated',
                geo_point: {
                    '@type': 'location',
                    latitude,
                    longitude,
                    accuracy_radius: 100,
                }
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
            <h1>Nearby Users</h1>
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
            <span>{text}</span>
        </div>
    );
};

export default NearbyUsersBot;
