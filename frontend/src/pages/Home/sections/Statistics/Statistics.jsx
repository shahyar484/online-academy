import CountUp from 'react-countup';

import Section from '../../../../components/ui/Section';

import SlideUp from '../../../../components/motion/SlideUp';

import { statistics } from '../../../../constants';

import styles from './Statistics.module.css';

const Statistics = () => {

    return (

        <Section

            className={styles.section}

            title="زنگ یک در یک نگاه"

            description="هر روز آموزشگاه‌ها و مدرس‌های بیشتری به زنگ یک اعتماد می‌کنند."

        >

            <div className={styles.wrapper}>

                <div className={styles.grid}>

                    {

                        statistics.map((item,index)=>{

                            const Icon=item.icon;

                            return(

                                <SlideUp

                                    key={item.title}

                                    delay={index*.1}

                                >

                                    <div className={styles.item}>

                                        <div className={styles.icon}>

                                            <Icon/>

                                        </div>

                                        <div className={styles.value}>

                                            <CountUp

                                                end={item.value}

                                                duration={2}

                                                enableScrollSpy

                                                scrollSpyOnce

                                            />

                                            {item.suffix}

                                        </div>

                                        <div className={styles.title}>

                                            {item.title}

                                        </div>

                                    </div>

                                </SlideUp>

                            );

                        })

                    }

                </div>

            </div>

        </Section>

    );

};

export default Statistics;