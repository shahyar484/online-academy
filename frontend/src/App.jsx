import {

    SocketProvider

} from './context/SocketContext/SocketContext';

import {

    WebRTCProvider

} from './context/WebRTCContext/WebRTCContext';

function App(){

    return(

        <SocketProvider>

            <WebRTCProvider>

                {/* Routes */}

            </WebRTCProvider>

        </SocketProvider>

    );

}

export default App;