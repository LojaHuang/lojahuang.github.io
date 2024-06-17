// TdLibController.d.ts

import EventEmitter from '../Stores/EventEmitter';

declare class TdLibController extends EventEmitter {
    parameters: {
        useTestDC: boolean;
        readOnly: boolean;
        verbosity: number;
        jsVerbosity: number;
        fastUpdating: boolean;
        useDatabase: boolean;
        mode: string;
    };

    disableLog: boolean;
    streaming: boolean;
    calls: boolean;
    client: any; // Typing for TdClient instance can be more specific if known.

    constructor();

    init(): void;

    clientUpdate(update: object): void;

    setParameters(location: Location): void;

    send(request: object): Promise<any>;

    sendTdParameters(): Promise<void>;

    logOut(): void;

    setChatId(chatId: number, messageId?: number | null, options?: object): void;

    setMediaViewerContent(content: any): void;
}

// Export a single instance of TdLibController
declare const controller: TdLibController;
export default controller;
