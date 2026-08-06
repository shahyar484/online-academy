import styles from './Loader.module.css';

const Loader = ({
    size = 20
}) => {

    return (

        <span
            className={styles.loader}
            style={{
                width: size,
                height: size
            }}
        />

    );

};

export default Loader;