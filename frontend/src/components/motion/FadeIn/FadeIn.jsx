import { motion } from 'framer-motion';

const FadeIn = ({

    children,

    delay = 0,

    duration = .6

}) => {

    return (

        <motion.div

            initial={{

                opacity:0

            }}

            whileInView={{

                opacity:1

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

export default FadeIn;