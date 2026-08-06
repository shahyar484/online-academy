import styles from './WaveDivider.module.css';

const WaveDivider = () => {

    return (

        <div className={styles.wave}>

            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >

                <path
                    fill="#ffffff"
                    d="
                    M0,32
                    C240,96
                    480,0
                    720,48
                    C960,96
                    1200,16
                    1440,64
                    L1440,120
                    L0,120
                    Z"
                />

            </svg>

        </div>

    );

};

export default WaveDivider;