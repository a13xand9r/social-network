import React, { FC } from 'react';
import styles from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { fieldIsRequired, fieldIsFullCreator } from '../../../validation/validation';
import { DialogsTextArea } from '../../Common/FormComponents';
import { DialogsInitialStateType } from '../../../redux/dialogs_reducer';

const Max30symbols = fieldIsFullCreator(30);

type MessageTextFormPropsType = {
    handleSubmit: () => void
}

const MessageTextForm: FC<InjectedFormProps<MessageFormValuesType>> = (props) => {
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

const MessageReduxForm = reduxForm<MessageFormValuesType>({ form: 'dialogMessage' })(MessageTextForm)

type DialogItemPropsType = {
    path: string
    name: string
}
export type MessageFormValuesType = {
    messageBody: string
}

const DialogItem: FC<DialogItemPropsType> = (props) => {
    let path = '/dialogs/' + props.path;
    return (
      <div className={styles.dialogItem}>
          <NavLink to = {path} activeClassName = {styles.active}>{props.name}</NavLink>
      </div>
    );
}

type DialogPropsType = {
    message: string
}

const Dialog: FC<DialogPropsType> = (props) => {
    return (
      <div>
          {props.message}
      </div>
    );
}

type DialogsPropsType = {
    path: string
    name: string
    message: string
    dialogsPage: DialogsInitialStateType
    sendMessage: (messageBody: string) => void

}

const Dialogs: FC<DialogsPropsType> = (props) => {
    
    let onSendMessage = (form: MessageFormValuesType) => {
        props.sendMessage(form.messageBody);
    }
   
    let dialogs = props.dialogsPage.dialogUsers.map(d => <DialogItem name = {d.name} 
                                                                     path = {d.id}/>)
    let messages = props.dialogsPage.messageData.map(m => <Dialog message = {m.message} />)

    return (
    <div className = {styles.dialog_wrapper}>
        <div className={styles.dialogItems}>
            { dialogs }
        </div>
        <div className={styles.dialog}>
            { messages }
            <MessageReduxForm onSubmit = {onSendMessage} />
        </div>
    </div>
    );
}

export default Dialogs;