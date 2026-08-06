import styles from './Input.module.css';

const Input = ({
    type = 'text',

    value,

    name,

    placeholder,

    maxLength,

    disabled = false,

    autoFocus = false,

    error = '',

    onChange

}) => {

    return (

        <div className={styles.wrapper}>

            <input

                className={`${styles.input} ${error ? styles.errorInput : ''}`}

                type={type}

                value={value}

                name={name}

                placeholder={placeholder}

                maxLength={maxLength}

                disabled={disabled}

                autoFocus={autoFocus}

                onChange={onChange}

            />

            {

                error && (

                    <span className={styles.error}>

                        {error}

                    </span>

                )

            }

        </div>

    );

};

export default Input;