import {

    HiOutlineBuildingOffice2,

    HiOutlineAcademicCap,

    HiOutlineUserGroup

} from 'react-icons/hi2';

import styles from './Trusted.module.css';
import Section from '../../../../components/ui/Section';

const items = [

    {

        icon: <HiOutlineBuildingOffice2 />,

        value: '۱۲۰+',

        title: 'آموزشگاه'

    },

    {

        icon: <HiOutlineAcademicCap />,

        value: '۳۵۰+',

        title: 'مدرس'

    },

    {

        icon: <HiOutlineUserGroup />,

        value: '۵۲۰۰+',

        title: 'دانش‌آموز'

    }

];

const Trusted = () => {

    return (

        <Section

            className={styles.section}
            
            title="مورد اعتماد مراکز آموزشی"

            description="زنگ یک بستری برای برگزاری کلاس آنلاین، مدیریت آموزشگاه و ارتباط مؤثر بین مدرس و دانش‌آموز است."
        >

            <div className={styles.items}>

                {

                    items.map(item => (

                        <div
                            key={item.title}
                            className={styles.item}
                        >

                            <span>

                                {item.icon}

                            </span>

                            <h3>

                                {item.value}

                            </h3>

                            <p>

                                {item.title}

                            </p>

                        </div>

                    ))

                }

            </div>


        </Section>


    );

};

export default Trusted;