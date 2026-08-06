import styles from './FloatingCard.module.css';

const FloatingCard = ({

    icon,

    title,

    subtitle,

    className = ''

}) => {

    return (

        <div
            className={`${styles.card} ${className}`}
        >

            <div className={styles.icon}>

                {icon}

            </div>

            <div className={styles.info}>

                <h4>{title}</h4>

                <p>{subtitle}</p>

            </div>

        </div>

    );

};

export default FloatingCard;