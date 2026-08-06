import { useEffect, useState } from 'react';

import styles from './Countdown.module.css';

const Countdown = ({

    seconds = 120,

    onComplete

}) => {

    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {

        if (timeLeft <= 0) {

            onComplete?.();

            return;

        }

        const timer = setTimeout(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [

        timeLeft,

        onComplete

    ]);

    const minutes = String(
        Math.floor(timeLeft / 60)
    ).padStart(2, '0');

    const secondsText = String(
        timeLeft % 60
    ).padStart(2, '0');

    return (

        <span className={styles.countdown}>

            {minutes}:{secondsText}

        </span>

    );

};

export default Countdown;