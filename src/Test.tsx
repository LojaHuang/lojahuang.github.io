import './App.css'

import WebApp from '@twa-dev/sdk'

function Test() {

    console.error(WebApp);


    return (
        <>
            <h1>Test</h1>
            <span>{WebApp.initData}</span>
            <span>{JSON.stringify(WebApp.initDataUnsafe)}</span>
        </>
    )
}

export default Test
