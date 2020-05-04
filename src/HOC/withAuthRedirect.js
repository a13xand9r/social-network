import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isAuthRequested: state.auth.isAuthRequested
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render(){
            if (!this.props.isAuth && this.props.isAuthRequested && !this.props.match.params.userId) return <Redirect to = {"/login"} />
            return <Component {...this.props}/>
        }
    }
    let RedirectContainer = connect(mapStateToProps)(RedirectComponent)
    return RedirectContainer
}