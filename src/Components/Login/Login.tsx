import React, { FC } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../redux/auth_reducer';
import { Redirect } from 'react-router-dom';
import { LoginInput, createField } from '../Common/FormComponents';
import { fieldIsRequired, emailFieldIncludeDog } from '../../validation/validation';
import { AppStateType } from '../../redux/redux_store';

type FormPropsType = InjectedFormProps<LoginFormValuesType, {captchaUrl: string | null}> & {captchaUrl: string | null}

const LoginForm: FC<FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<FieldNamesType>("Email", "email", [fieldIsRequired, emailFieldIncludeDog],LoginInput)}
            {createField<FieldNamesType>("Password", "password", [fieldIsRequired], LoginInput, {type: "password"})}
            {createField<FieldNamesType>(null, "rememberMe", [], LoginInput, {type: "checkbox"})}
            {props.captchaUrl && <img src={props.captchaUrl} alt=""/>}
            {props.captchaUrl &&
            createField<FieldNamesType>("Type symbols from the pic", "captcha", [fieldIsRequired], LoginInput)}

            {props.error && <div>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, {captchaUrl: string | null}>({ form: 'login' })(LoginForm)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type FieldNamesType = Extract<keyof LoginFormValuesType, string>

const LoginPage: FC<PropsFromRedux> = (props) => {
    const submitForm = (form: LoginFormValuesType) => {
        props.login(form)
    } 
    if (props.isAuth){
        return <Redirect to = {"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {submitForm} captchaUrl = {props.captchaUrl} />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

const connector = connect(mapStateToProps, {login})
type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapStateToProps, {login})(LoginPage)