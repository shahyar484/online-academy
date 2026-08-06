import {
    useEffect,
    useRef
} from 'react';

import styles from './OtpInput.module.css';

const OtpInput = ({

    value,

    onChange,

    length = 5,

    error,

    onComplete

}) => {

    const inputsRef = useRef([]);

    useEffect(() => {

        inputsRef.current[0]?.focus();

    }, []);

    useEffect(() => {

        if (

            value.length === length

        ) {

            onComplete?.(value);

        }

    }, [

        value,

        length,

        onComplete

    ]);

    const focusFirstEmpty = () => {

        const index =

            value.length >= length

                ? length - 1

                : value.length;

        inputsRef.current[index]?.focus();

    };

    const handleClick = () => {

        focusFirstEmpty();

    };

    const handleChange = (

        index,

        e

    ) => {

        const digit =

            e.target.value.replace(/\D/g, '');

        if (!digit) {

            return;

        }

        const values =

            value.split('');

        values[index] = digit;

        const newValue =

            values.join('');

        onChange(newValue);

        if (

            index < length - 1

        ) {

            inputsRef.current[
                index + 1
            ]?.focus();

        }
        else {

            inputsRef.current[
                index
            ]?.blur();

        }

    };

    const handleKeyDown = (

        index,

        e

    ) => {

        if (

            e.key !== 'Backspace'

        ) {

            return;

        }

        e.preventDefault();

        const values =

            value.split('');

        if (

            values[index]

        ) {

            values[index] = '';

            onChange(

                values.join('')

            );

            return;

        }

        if (

            index > 0

        ) {

            values[index - 1] = '';

            onChange(

                values.join('')

            );

            inputsRef.current[
                index - 1
            ]?.focus();

        }

    };

    const handlePaste = e => {

        e.preventDefault();

        const pasted =

            e.clipboardData
                .getData('text')
                .replace(/\D/g, '')
                .slice(0, length);

        onChange(pasted);

        inputsRef.current.forEach(

            input => input?.blur()

        );

    };

    return (

        <div>

            <div
                className={styles.container}
            >

                {

                    Array.from({

                        length

                    }).map((_, index) => (

                        <input

                            key={index}

                            ref={el =>

                                inputsRef.current[index] = el

                            }

                            className={styles.input}

                            value={

                                value[index] || ''

                            }

                            maxLength={1}

                            inputMode="numeric"

                            onClick={handleClick}

                            onPaste={handlePaste}

                            onChange={e =>

                                handleChange(

                                    index,

                                    e

                                )

                            }

                            onKeyDown={e =>

                                handleKeyDown(

                                    index,

                                    e

                                )

                            }

                        />

                    ))

                }

            </div>

            {

                error && (

                    <p className={styles.error}>

                        {error}

                    </p>

                )

            }

        </div>

    );

};

export default OtpInput;