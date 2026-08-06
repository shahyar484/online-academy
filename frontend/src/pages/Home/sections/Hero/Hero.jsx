import Button from '../../../../components/ui/Button';

import heroImage from '../../../../assets/images/home/zangeyek.png';

import styles from './Hero.module.css';

import FloatingCard from '../../../../components/ui/FloatingCard';

import {

    HiOutlineVideoCamera,

    HiOutlineAcademicCap,

    HiOutlineClipboardDocumentCheck,

    HiOutlineChartBar

} from 'react-icons/hi2';

const Hero = () => {

    return (

        <section className={styles.hero}>

            <div className={styles.content}>

                <span className={styles.badge}>

                    سامانه جامع آموزش آنلاین

                </span>

                <h1>

                    آموزش آنلاین،

                    <br/>

                    ساده، سریع و حرفه‌ای

                </h1>

                <p>

                    زنگ یک بستری برای برگزاری کلاس‌های آنلاین،
                    مدیریت آموزشگاه،
                    آزمون،
                    حضور و غیاب
                    و ارتباط مؤثر بین مدرس و دانش‌آموز است.

                </p>

                <div className={styles.actions}>

                    <Button>

                        شروع رایگان

                    </Button>

                    <Button variant="outline">

                        مشاهده امکانات

                    </Button>

                </div>

            </div>

            <div className={styles.image}>

                <img

                    src={heroImage}

                    alt="زنگ یک"

                />

                <div className={styles.floatingCards}>

                    <FloatingCard
                        className={styles.cardTop}
                        icon={<HiOutlineVideoCamera />}
                        title="کلاس آنلاین"
                        subtitle="در حال برگزاری"
                    />

                    <FloatingCard
                        className={styles.cardLeft}
                        icon={<HiOutlineAcademicCap />}
                        title="۵۲۳۸"
                        subtitle="دانش‌آموز فعال"
                    />

                    <FloatingCard
                        className={styles.cardRight}
                        icon={<HiOutlineChartBar />}
                        title="۸۵٪"
                        subtitle="پیشرفت آموزشی"
                    />

                </div>

                 

            </div>

        </section>

    );

};

export default Hero;