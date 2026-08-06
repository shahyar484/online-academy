import { useEffect, useState } from 'react';

import { FaBars } from 'react-icons/fa';

import MobileDrawer from './MobileDrawer';

import styles from './MobileMenu.module.css';

const MobileMenu = () => {

    const [open, setOpen] = useState(false);

    useEffect(() => {

    const handleKeyDown = event => {

        if (

            event.key === 'Escape'

        ) {

            setOpen(false);

        }

    };

    document.addEventListener(

        'keydown',

        handleKeyDown

    );

    return () =>

        document.removeEventListener(

            'keydown',

            handleKeyDown
        );

}, []);

useEffect(() => {

    document.body.style.overflow =

        open

            ? 'hidden'

            : '';

    return () => {

        document.body.style.overflow = '';

    };

}, [open]);

    return (

        <>

            <button
                className={styles.button}
                onClick={() => setOpen(true)}
            >
                <FaBars />
            </button>

            <MobileDrawer

                open={open}

                onClose={() => setOpen(false)}

            />

        </>

    );

};

export default MobileMenu;