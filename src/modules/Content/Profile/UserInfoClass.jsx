import React from 'react';
import classes from './Profile.module.css'
import UserPhoto from '../../../pictures/user_man.png'

class UserInfo extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    onChangeStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    onUpdateStatus = () => {
        this.props.updateUserStatus(this.state.status)
        this.setState({
            editMode: false
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
        if (prevState.editMode === true && this.state.editMode === false){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={classes.userInfo}>
                <img alt="Картинка не грузит" src={
                    this.props.profileData.photos.large ? this.props.profileData.photos.large : UserPhoto
                } />
                <p>
                    {!this.state.editMode &&
                        <div>
                            <span onClick={this.activateEditMode}>{this.props.status || 'set your status'}</span>
                        </div>
                    }
                    {this.state.editMode &&
                        <div onMouseLeave={this.deactivateEditMode} className={classes.editStatus}>
                            <div>
                                <input onChange={this.onChangeStatus} autoFocus={true} value={this.state.status} />
                            </div>
                            <div>
                                <button onClick={this.onUpdateStatus}>Update status</button>
                            </div>
                        </div>
                    }
                    <div className={classes.name}>{this.props.profileData.fullName}</div>
                    <div className={classes.contacts}>{this.props.profileData.aboutMe}</div>
                    <div className={classes.contacts}>Contacts:</div>
                    <div className={classes.contact}>Facebook:  {this.props.profileData.facebook}</div>
                    <div className={classes.contact}>VK:        {this.props.profileData.vk}</div>
                    <div className={classes.contact}>Twitter:   {this.props.profileData.twitter}</div>
                    <div className={classes.contact}>Instagram: {this.props.profileData.instagram}</div>
                </p>
            </div>
        );
    }
}

export default UserInfo;