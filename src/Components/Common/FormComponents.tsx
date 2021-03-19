import React, { FC } from 'react'
import styles from './FormComponents.module.css'
import { WrappedFieldProps, Field } from 'redux-form'
import { ValidatorsType } from '../../validation/validation'

export const DialogsTextArea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
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

export const LoginInput: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  let hasRequiredError = meta.error && meta.error === 'This field is required' && meta.touched
  let hasEmailDogError = input.name === 'email' && meta.error && meta.error.includes('email') && !meta.active
  let hasError = hasRequiredError || hasEmailDogError
  return (
    <div className={styles.fromControl + " " + (hasError ? styles.error : "")}>
      <input {...input} {...props} />
      {hasError && <span>{meta.error}</span>}
    </div>
  )
} 

export function createField<keysOfFormValues extends string>(
  placeholder: string | null,
  name: keysOfFormValues,
  validators: Array<ValidatorsType>,
  component: FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field placeholder={placeholder} 
               name={name}
               validate={validators}
               component={component}
               {...props} /> {text}
    </div>
  );
}