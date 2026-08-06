import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { sendOtp } from '../../../api/auth.api';
import { successToast, errorToast } from '../../../services/toast.service';

import styles from './Login.module.css';

const LoginForm = () => {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState('');

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleChange = e => {

        const value = e.target.value.replace(/\D/g, '');

        setMobile(value);

        if (error) {

            setError('');

        }

    };

    const handleSubmit = async e => {

        e.preventDefault();

        if (loading) {

            return;

        }

        if (!/^09\d{9}$/.test(mobile)) {

            setError('شماره موبایل معتبر نیست.');

            return;

        }

        try {

            setLoading(true);

            const result = await sendOtp(mobile);

            successToast(result.message);

            navigate(

                routes.verify,

                {

                    state: {

                        mobile,

                        isNewUser: result.data.isNewUser

                    }

                }

            );

        }

        catch (error) {

            errorToast(

                error?.response?.data?.message ||

                'خطایی رخ داده است.'

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>
        
        <h2> ورود </h2>
        <p> شماره موبایل خود را وارد کنید. </p>

        <form

            onSubmit={handleSubmit}

            className={styles.form}

        >

            <Input

                value={mobile}

                onChange={handleChange}

                placeholder="09xxxxxxxxx"

                type="tel"

                maxLength={11}

                error={error}

            />

            <Button

                type="submit"

                loading={loading}

                loadingText="در حال ارسال..."

            >

                دریافت کد تایید

            </Button>

        </form>
        </>

        

    );

};

export default LoginForm;