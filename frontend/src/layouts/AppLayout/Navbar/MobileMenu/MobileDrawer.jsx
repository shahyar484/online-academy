import { NavLink } from 'react-router-dom';

import navItems from '../navItems';

import styles from './MobileDrawer.module.css';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../../context/AuthContext';

const MobileDrawer = ({

    open,

    onClose

}) => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    return (

        <>

            <div

                className={`${styles.overlay} ${open ? styles.show : ''}`}

                onClick={onClose}

            />

            <aside

                className={`${styles.drawer} ${open ? styles.open : ''}`}

            >

                <div className={styles.header}>

                    <h2>

                        ZANGEYEK

                    </h2>

                </div>

                <nav>

                    {

                        navItems.map(item => (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                onClick={onClose}

                                className={({ isActive }) =>

                                    isActive

                                        ? `${styles.link} ${styles.active}`

                                        : styles.link

                                }

                            >

                                {item.title}

                            </NavLink>

                        ))

                    }

                </nav>


            </aside>

        </>

    );

};

export default MobileDrawer;