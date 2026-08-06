import { Link } from 'react-router-dom';

import styles from './UserDropdown.module.css';

const UserDropdown = ({
    open,
    onLogout
}) => {

    if (!open) {
        return null;
    }

    return (

        <div className={styles.dropdown}>

            <Link
                to="/profile"
                className={styles.item}
            >
                پروفایل
            </Link>

            <Link
                to="/dashboard"
                className={styles.item}
            >
                داشبورد
            </Link>

            <button
                className={styles.logout}
                onClick={onLogout}
            >
                خروج
            </button>

        </div>

    );

};

export default UserDropdown;