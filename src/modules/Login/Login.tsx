import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../redux/auth_reducer';
import { Redirect } from 'react-router-dom';
import { LoginInput } from '../Common/FormComponents';
import { fieldIsRequired, emailFieldIncludeDog } from '../../validation/validation';
import { AppStateType } from '../../redux/redux_store';

type FormPropsType = InjectedFormProps<{}, {captchaUrl: string | null}> & {captchaUrl: string | null}

const LoginForm: FC<FormPropsType> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email"
                    component={LoginInput}
                    placeholder="Email"
                    validate={[fieldIsRequired, emailFieldIncludeDog]} />
            </div>
            <div>
                <Field name="password"
                    component={LoginInput}
                    type="password"
                    placeholder="Password"
                    validate={[fieldIsRequired]} />
            </div>
            <div>
                <Field name="rememberMe"
                    component={LoginInput}
                    type="checkbox" /> Remember me
            </div>
            {props.captchaUrl && <img src={props.captchaUrl} alt=""/>}
            {props.captchaUrl && <div>
                <Field name="captcha"
                    component={LoginInput}
                    placeholder="Type symbols from the pic"
                    validate={[fieldIsRequired]} /> Remember me
            </div>}
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

const LoginReduxForm = reduxForm<{}, {captchaUrl: string | null}>({ form: 'login' })(LoginForm)

const LoginPage: FC<PropsFromRedux> = (props) => {
    const submitForm = (form: any) => {
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