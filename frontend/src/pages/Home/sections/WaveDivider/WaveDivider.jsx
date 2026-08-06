import styles from './WaveDivider.module.css';

const WaveDivider = () => {

    return (

        <div className={styles.wave}>

            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >

                <path
                    d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                />

            </svg>

        </div>

    );

};

export default WaveDivider;