import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import {

    getMe,

    logout as logoutApi

} from '../../api/auth.api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const login = user => {

        setUser(user);

    };

    const logout = async () => {

        try {

            await logoutApi();

        }

        catch {

        }

        finally {

            setUser(null);

        }

    };

    const refreshUser = async () => {

        try {

            const result = await getMe();

            setUser(result.data.user);

        }

        catch {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        refreshUser();

    }, []);

    const value = {

        user,

        loading,

        login,

        logout,

        refreshUser

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};

const useAuth = () => useContext(AuthContext);

export {

    AuthProvider,

    useAuth

};