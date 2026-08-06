import { Outlet } from 'react-router-dom';

import Card from '../../components/ui/Card';

import styles from './AuthLayout.module.css';

import authImage from '../../assets/images/auth-illustration.png';

const AuthLayout = () => {

    return (

        <main className={styles.container}>

            <Card className={styles.card}>

                <section className={styles.banner}>

                    <img
                        src={authImage}
                        alt="Online Academy"
                    />

                    <h1>

                        زنگ یک

                    </h1>

                    <p>

                        یادگیری آنلاین، ساده، سریع و حرفه‌ای

                    </p>

                    <ul>

                        <li>✓ کلاس آنلاین</li>

                        <li>✓ مدیریت آموزشگاه</li>

                        <li>✓ آزمون آنلاین</li>

                    </ul>

                </section>

                <section className={styles.content}>

                    <Outlet />

                </section>

            </Card>

        </main>

    );

};

export default AuthLayout;