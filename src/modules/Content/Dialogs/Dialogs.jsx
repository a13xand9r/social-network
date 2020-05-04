import React from 'react';
import classes from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { fieldIsRequired, fieldIsFullCreator } from '../../../validation/validation';
import { DialogsTextArea } from '../../Common/FormComponents';

const Max30symbols = fieldIsFullCreator(30);

const MessageTextForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <Field name = "messageBody"
                   component = {DialogsTextArea}
                   placeholder = "write a message" 
                   validate = {[fieldIsRequired, Max30symbols]}/>
            <button>send message</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({ form: 'dialogMessage' })(MessageTextForm)

const DialogItem = (props) => {
    let path = '/dialogs/' + props.path;
    return (
      <div className={classes.dialogItem}>
          <NavLink to = {path} activeClassName = {classes.active}>{props.name}</NavLink>
      </div>
    );
}

const Dialog = (props) => {
    return (
      <div>
          {props.message}
      </div>
    );
}

const Dialogs = (props) => {
    
    let onSendMessage = (form) => {
        props.sendMessage(form.messageBody);
    }
   
    let dialogs = props.dialogsPage.dialogUsers.map(d => <DialogItem name = {d.name} 
                                                                     path = {d.id}/>)
    let messages = props.dialogsPage.messageData.map(m => <Dialog message = {m.message} />)

    return (
    <div className = {classes.dialog_wrapper}>
        <div className={classes.dialogItems}>
            { dialogs }
        </div>
        <div className={classes.dialog}>
            { messages }
            <MessageReduxForm onSubmit = {onSendMessage} />
        </div>
    </div>
    );
}

export default Dialogs;