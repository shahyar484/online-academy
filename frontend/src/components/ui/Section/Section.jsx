import Container from '../Container';

import styles from './Section.module.css';

const Section = ({

    title,

    description,

    children,

    className = ''

}) => {

    return (

        <section className={`${styles.section} ${className}`}>

            <Container>

                {

                    title && (

                        <div className={styles.header}>

                            <h2>

                                {title}

                            </h2>

                            {

                                description && (

                                    <p>

                                        {description}

                                    </p>

                                )

                            }

                        </div>

                    )

                }

                {children}

            </Container>

        </section>

    );

};

export default Section;