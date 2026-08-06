import {

    useEffect,

    useState

} from 'react';

import Container from '../../../components/ui/Container';

import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import RightActions from './RightActions';

import styles from './Navbar.module.css';

const Navbar = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(

                window.scrollY > 30

            );

        };

        window.addEventListener(

            'scroll',

            handleScroll

        );

        return () =>

            window.removeEventListener(

                'scroll',

                handleScroll

            );

    }, []);

    return (

        <header

            className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}

        >

            <Container

                className={styles.container}

            >

                <Logo scrolled={scrolled} />

                <DesktopMenu />

                <RightActions />

            </Container>

        </header>

    );

};

export default Navbar;