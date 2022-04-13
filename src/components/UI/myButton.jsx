import React from 'react';
import classes from './myButton.module.scss';


const MyButton = ({children, ...props}) => {

    let styles = [classes.Custom__btn];

    if (props.disabled) {
        styles.push(classes.Disable);
    }

    return (
        <button className={styles.join(' ')} {...props} >{children}</button>
    );
};

export default MyButton;

