import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SocketProvider } from './context/SocketContext/SocketContext';
import { AuthProvider } from './context/AuthContext';

import AppRoutes from './routes';

const App = () => {

    return (

        // <SocketProvider>

            <AuthProvider>

                <AppRoutes />

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    rtl
                    theme="light"
                />

            </AuthProvider>

        // </SocketProvider>

    );

};

export default App;