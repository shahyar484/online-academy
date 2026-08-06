import UserMenu from '../UserMenu';
import MobileMenu from '../MobileMenu';

import styles from './RightActions.module.css';

const RightActions = () => {

    return (

        <div className={styles.actions}>

            <UserMenu />

            <MobileMenu />

        </div>

    );

};

export default RightActions;