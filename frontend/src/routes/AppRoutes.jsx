import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Verify from '../pages/Auth/Verify/Verify';
import NotFound from '../pages/NotFound/NotFound';

import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* صفحات عمومی */}

                <Route element={<AppLayout />}>

                    <Route
                        index
                        element={<Home />}
                    />

                    {/* <Route path="about" element={<About />} /> */}

                    {/* <Route path="academies" element={<Academies />} /> */}

                    {/* <Route path="teachers" element={<Teachers />} /> */}

                </Route>

                {/* صفحات احراز هویت */}

                <Route element={<AuthLayout />}>

                    <Route element={<PublicRoute />}>

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/verify"
                            element={<Verify />}
                        />

                    </Route>

                </Route>

                {/* صفحات محافظت شده */}

                {/*
                <Route element={<ProtectedRoute />}>

                    <Route element={<AppLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                    </Route>

                </Route>
                */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;