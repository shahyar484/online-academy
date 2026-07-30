import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);

    const [connected, setConnected] = useState(false);

    useEffect(() => {

        const token =
            localStorage.getItem(
                'AUTH_USER_TOKEN'
            );

        const socketInstance = io(

            import.meta.env.VITE_API_URL,

            {

                transports: [

                    'websocket'

                ],

                auth: {

                    token

                }

            }

        );

        socketInstance.on(

            'connect',

            () => {

                setConnected(true);

            }

        );

        socketInstance.on(

            'disconnect',

            () => {

                setConnected(false);

            }

        );

        setSocket(

            socketInstance

        );

        return () => {

            socketInstance.disconnect();

        };

    }, []);

    return (

        <SocketContext.Provider

            value={{

                socket,

                connected

            }}

        >

            {children}

        </SocketContext.Provider>

    );

};

export const useSocket = () =>
useContext(SocketContext);