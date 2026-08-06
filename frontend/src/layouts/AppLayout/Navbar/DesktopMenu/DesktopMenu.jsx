import { NavLink } from 'react-router-dom';

import navItems from '../navItems';

import styles from './DesktopMenu.module.css';

const DesktopMenu = () => {

    return (

        <nav className={styles.menu}>

            {

                navItems.map(item => (

                    <NavLink
                        key={item.path}
                        to={item.path}
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

    );

};

export default DesktopMenu;