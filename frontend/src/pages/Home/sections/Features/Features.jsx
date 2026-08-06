import {

    HiOutlineVideoCamera,

    HiOutlineClipboardDocumentCheck,

    HiOutlinePresentationChartLine,

    HiOutlineUserGroup,

    HiOutlineBuildingOffice2,

    HiOutlinePaintBrush

} from 'react-icons/hi2';

import Section from '../../../../components/ui/Section';
import FeatureCard from '../../../../components/ui/FeatureCard';

import styles from './Features.module.css';

import { features } from '../../../../constants';

import { SlideUp } from '../../../../components/motion';



const Features = () => {

    return (

        <Section

            className={styles.section}

            title="همه امکانات موردنیاز آموزش آنلاین"

            description="زنگ یک تمام ابزارهای لازم برای مدیریت آموزشگاه و برگزاری کلاس‌های آنلاین را در یک سامانه یکپارچه فراهم کرده است."

        >

            <div className={styles.grid}>

            {

                features.map((feature,index)=>{

                    const Icon=feature.icon;

                    return(

                        <SlideUp

                            key={feature.title}

                            delay={index*.08}

                        >

                            <FeatureCard

                                icon={<Icon/>}

                                title={feature.title}

                                description={feature.description}

                            />

                        </SlideUp>

                    );

                })

            }

        </div>

        </Section>

    );

};

export default Features;