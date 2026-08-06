import styles from './Button.module.css';
import Loader from '../Loader';

const Button = ({
    children,

    variant = 'primary',

    type = 'button',

    loading = false,

    loadingText = 'لطفاً صبر کنید...',

    disabled = false,

    fullWidth = true,

    icon,

    className = '',

    onClick

}) => {

    const classes = [
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (

        <button
            type={type}
            className={classes}
            disabled={loading || disabled}
            onClick={onClick}
        >

            {
                loading
                    ? (
                        <>
                            <Loader size={18}/>
                            {loadingText}
                        </>
                    )
                    : (
                        <>
                            {icon}
                            {children}
                        </>
                    )
            }

        </button>

    );

};

export default Button;