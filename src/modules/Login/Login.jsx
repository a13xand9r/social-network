import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../redux/auth_reducer';
import { Redirect } from 'react-router-dom';
import { LoginInput } from '../Common/FormComponents';
import { fieldIsRequired, emailFieldIncludeDog } from '../../validation/validation';

const LoginForm = (props) => {
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

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const LoginPage = (props) => {
    const submitForm = (form) => {
        props.login(form)
    } 
    if (props.isAuth){
        return <Redirect to = {"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {submitForm} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isAuthRequested: state.auth.isAuthRequested
})

/*const mapDispatchToProps = (dispatch) => ({
    login = (form) => {
        dispatch(login(form))
    }
})
*/
export default connect(mapStateToProps, {login})(LoginPage)