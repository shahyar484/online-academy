import {

    useEffect,

    useState

} from 'react';

import {

    useLocation,

    useNavigate

} from 'react-router-dom';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import OtpInput from '../../../components/ui/OtpInput';

import Countdown from '../../../components/ui/Countdown';

import {

    verifyOtp,

    sendOtp

} from '../../../api/auth.api';

import {

    successToast,

    errorToast

} from '../../../services/toast.service';

import { useAuth } from '../../../context/AuthContext';

import styles from './Verify.module.css';

const VerifyForm = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const { login } = useAuth();

    const {

        mobile,

        isNewUser

    } = location.state || {};

    const [

        code,

        setCode

    ] = useState('');

    const [

        firstName,

        setFirstName

    ] = useState('');

    const [

        lastName,

        setLastName

    ] = useState('');

    const [

        loading,

        setLoading

    ] = useState(false);

    const [

        resendLoading,

        setResendLoading

    ] = useState(false);

    const [

        canResend,

        setCanResend

    ] = useState(false);

    const [

        errors,

        setErrors

    ] = useState({});


    useEffect(() => {

        if (!location.state?.mobile) {

            navigate('/login', {

                replace: true

            });

        }

        }, []);

    useEffect(() => {

        if (!mobile) {

            navigate(

                routes.login,

                {

                    replace: true

                }

            );

        }

    }, [

        mobile,

        navigate

    ]);

    const handleResend = async () => {

        if (

            resendLoading ||

            !canResend

        ) {

            return;

        }

        try {

            setResendLoading(true);

            const result = await sendOtp(mobile);

            successToast(result.message);

            setCanResend(false);

            setCode('');

        }

        catch (error) {

            errorToast(

                error?.response?.data?.message ||

                'خطا در ارسال مجدد کد'

            );

        }

        finally {

            setResendLoading(false);

        }

    };

        const validate = () => {

        const newErrors = {};

        if (isNewUser) {

            if (!firstName.trim()) {

                newErrors.firstName = 'نام را وارد کنید.';

            }

            if (!lastName.trim()) {

                newErrors.lastName = 'نام خانوادگی را وارد کنید.';

            }

        }

        if (code.length !== 5) {

            newErrors.code = 'کد تایید باید ۵ رقم باشد.';

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async e => {

        e.preventDefault();

        if (loading) {

            return;

        }

        if (!validate()) {

            return;

        }

        try {

            setLoading(true);

            const payload = {

                mobile,

                code

            };

            if (isNewUser) {

                payload.firstName = firstName.trim();

                payload.lastName = lastName.trim();

            }

            const result = await verifyOtp(payload);

            login(

                result.data.user

            );

            successToast(result.message);

            navigate(

                routes.home,

                {

                    replace: true

                }

            );

        }

        catch (error) {

            errorToast(

                error?.response?.data?.message ||

                'خطا در تایید کد'

            );

        }

        finally {

            setLoading(false);

        }

    };

        return (
            <>

            <h2>

                تایید شماره موبایل

            </h2>

            <p>

                کد ارسال شده به شماره موبایل خود را وارد کنید.

            </p>
            
            <form
            onSubmit={handleSubmit}
                className={styles.form}
            >

                <p className={styles.mobile}>

                    کد تایید برای

                    <span>

                        {mobile}

                    </span>

                    ارسال شده است.

                </p>

                {

                    isNewUser && (

                        <>

                            <Input

                                value={firstName}

                                onChange={e => {

                                    setFirstName(

                                        e.target.value

                                    );

                                    if (errors.firstName) {

                                        setErrors({

                                            ...errors,

                                            firstName: ''

                                        });

                                    }

                                }}

                                placeholder="نام"

                                error={errors.firstName}

                            />

                            <Input

                                value={lastName}

                                onChange={e => {

                                    setLastName(

                                        e.target.value

                                    );

                                    if (errors.lastName) {

                                        setErrors({

                                            ...errors,

                                            lastName: ''

                                        });

                                    }

                                }}

                                placeholder="نام خانوادگی"

                                error={errors.lastName}

                            />

                        </>

                    )

                }

                <OtpInput

                    value={code}

                    onChange={value => {

                        setCode(value);

                        if (errors.code) {

                            setErrors({

                                ...errors,

                                code: ''

                            });

                        }

                    }}

                    error={errors.code}

                />

                <div className={styles.timer}>

                    {

                        canResend

                            ? (

                                <button

                                    type="button"

                                    className={styles.resend}

                                    disabled={resendLoading}

                                    onClick={handleResend}

                                >

                                    {

                                        resendLoading

                                            ? 'در حال ارسال...'

                                            : 'ارسال مجدد کد'

                                    }

                                </button>

                            )

                            : (

                                <Countdown

                                    seconds={120}

                                    onComplete={() =>

                                        setCanResend(true)

                                    }

                                />

                            )

                    }

                </div>

                <Button

                    type="submit"

                    loading={loading}

                    loadingText="در حال ورود..."

                >

                    ورود

                </Button>

            </form>

            </>

    );

};

export default VerifyForm;