// src/tdweb.d.ts

declare module 'tdweb/dist/tdweb' {
    // 导出 TdClient 类型定义
    export interface TdClientOptions {
        useDatabase: boolean;
        verbosityLevel: number;
        apiId: string;
        apiHash: string;
        useSecretChats: boolean;
        useTestDc: boolean;
    }

    export interface TdObject {
        '@type': string;
        [key: string]: any;
    }

    // export type TdJsonClient = {
    //     send: (query: TdObject) => Promise<any>;
    //     onUpdate: (callback: (update: TdObject) => void) => void;
    //     offUpdate: (callback: (update: TdObject) => void) => void;
    //     destroy: () => void;
    // };

    class TdClient {
        constructor(options: Object);
        send: (query: TdObject) => Promise<any>;
        onUpdate: (callback: (update: TdObject) => void) => void;
        offUpdate: (callback: (update: TdObject) => void) => void;
        destroy: () => void;
    }

    export default TdClient;
}
