import React from 'react'
import styles from './FormComponents.module.css'

export const DialogsTextArea = ({input, meta, ...props}) => {
    let hasRequiredError = meta.error && meta.touched
    let hasMaxSymbolsError = meta.error && meta.error.includes('maximum symbols')
    let hasError = hasRequiredError || hasMaxSymbolsError
    return(
        <div className = {styles.fromControl + " " + (hasError ? styles.error : "")}>
            <textarea {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 

export const LoginInput = ({input, meta, ...props}) => {
    let hasRequiredError = meta.error && meta.error === 'This field is required' && meta.touched
    let hasEmailDogError = input.name === 'email' && meta.error && meta.error.includes('email') && !meta.active
    let hasError = hasRequiredError || hasEmailDogError
    return(
        <div className = {styles.fromControl + " " + (hasError ? styles.error : "")}>
            <input {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 