import { motion } from 'framer-motion';

const SlideUp = ({

    children,

    delay = 0,

    duration = .6,

    distance = 40

}) => {

    return (

        <motion.div

            initial={{

                opacity:0,

                y:distance

            }}

            whileInView={{

                opacity:1,

                y:0

            }}

            viewport={{

                once:true,

                amount:.2

            }}

            transition={{

                duration,

                delay

            }}

        >

            {children}

        </motion.div>

    );

};

export default SlideUp;
