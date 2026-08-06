import styles from './FeatureCard.module.css';

const FeatureCard = ({

    icon,

    title,

    description

}) => {

    return (

        <article className={styles.card}>

            <div className={styles.icon}>

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

        </article>

    );

};

export default FeatureCard;