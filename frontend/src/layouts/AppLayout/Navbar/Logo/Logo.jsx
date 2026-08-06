import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

import logo from '../../../../assets/images/zangeyek-logo.png';

const Logo = ({ scrolled }) => {

    return (

        <Link
            to="/"
            className={styles.logo}
        >

            <img
                src={logo}
                alt="Zangeyek"
                className={scrolled ? styles.small : ''}
            />

        </Link>

    );

};

export default Logo;