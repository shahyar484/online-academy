import { motion } from 'framer-motion';

const ScaleIn = ({

    children,

    delay = 0,

    duration = .5

}) => {

    return (

        <motion.div

            initial={{

                opacity:0,

                scale:.9

            }}

            whileInView={{

                opacity:1,

                scale:1

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

export default ScaleIn;