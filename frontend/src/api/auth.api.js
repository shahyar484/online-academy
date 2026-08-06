import axiosInstance from '../services/axios';

export const sendOtp = async mobile => {

    const { data } = await axiosInstance.post(

        '/auth/send-otp',

        {

            mobile

        }

    );

    return data;

};


export const verifyOtp = async payload => {

    const { data } = await axiosInstance.post(

        '/auth/verify-otp',

        payload

    );

    return data;

};

export const getMe = async () => {

    const { data } = await axiosInstance.get(

        '/auth/me'

    );

    return data;

};

export const logout = async () => {

    const { data } = await axiosInstance.post(

        '/auth/logout'

    );

    return data;

};