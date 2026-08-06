import {
    useState,
    useRef,
    useEffect
} from 'react';

import {
    Link,
    useNavigate
} from 'react-router-dom';

import {
    FaUserCircle,
    FaChevronDown
} from 'react-icons/fa';

import { useAuth } from '../../../../context/AuthContext';

import UserDropdown from './UserDropdown';

import styles from './UserMenu.module.css';

const UserMenu = () => {

    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = event => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener( 'mousedown', handleClickOutside );

        return () =>
            document.removeEventListener( 'mousedown', handleClickOutside );

    }, []);

    const handleLogout = async () => {

        setOpen(false);

        await logout();

        navigate('/login', { replace: true });

    };

    if (!user) {

        return (
            <Link
                to="/login"
                className={styles.login}
            >
                ورود
            </Link>
        );

    };

    return (

        <div
            ref={menuRef}
            className={styles.wrapper}
        >

            <button
                className={styles.button}
                onClick={() => setOpen(!open)}
            >

                <FaUserCircle className={styles.avatar}/>

                <span className={styles.name}>
                    {user.firstName}
                </span>

                <FaChevronDown
                    className={`${styles.arrow} ${open ? styles.rotate : ''}`}
                />

            </button>

            <UserDropdown
                open={open}
                onLogout={handleLogout}
            />

        </div>

    );

};

export default UserMenu;