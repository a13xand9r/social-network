import React, { useState, FC } from 'react';
import styles from './Profile.module.css'
import { reduxForm, Field } from 'redux-form';
import { ProfileDataType } from '../../../types/types';


const AboutMeEditForm = (props: any) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <button>Save</button>
            {props.error && <div>
                {props.error}
            </div>}
            <div className={styles.contacts}><b>About me:</b></div>
            <div className={styles.contact}><b>About me:</b> <Field name = 'aboutMe' component = 'input'/> </div>
            <div className={styles.contact}><b>Looking for a job:</b> <Field name = 'lookingForAJob' component = 'input' type = 'checkbox'/> </div>
            <div className={styles.contact}><b>What job:</b> <Field name = 'lookingForAJobDescription' component = 'input' /> </div>

            <div className={styles.contacts}><b>Contacts:</b></div>
            <div className={styles.contact}><b>Facebook:</b> <Field name = 'contacts.facebook' component = 'input'/>  </div>
            <div className={styles.contact}><b>VK:</b>       <Field name = 'contacts.vk' component = 'input'/>        </div>
            <div className={styles.contact}><b>Twitter:</b>  <Field name = 'contacts.twitter' component = 'input'/>   </div>
            <div className={styles.contact}><b>Instagram:</b><Field name = 'contacts.instagram' component = 'input'/> </div>
            <div className={styles.contact}><b>GitHub:</b>   <Field name = 'contacts.github' component = 'input'/> </div>
        </form>
    )
}

const AboutMeReduxForm = reduxForm({
    form: 'aboutMe'
})(AboutMeEditForm)

type PropsType = {
    profileData: ProfileDataType
    isOwner: boolean
    updateAboutMe: (form: any) => void
}

const AboutMe: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [showEditButton, setShowEditButton] = useState(false)
    const onSaveForm = (form: any) => {
        props.updateAboutMe(form)
        setEditMode(false)
    }
    let contactsCnt = 0
    return (
        <div>
            {
                !editMode && <div onMouseOver={() => setShowEditButton(true)} onMouseLeave={() => setShowEditButton(false)}>
                    <div className={styles.contacts}><b>About me:</b></div>
                    <div className={styles.contact}><b>About me:</b>  {props.profileData.aboutMe}</div>
                    <div className={styles.contact}><b>Looking for a job:</b>  {props.profileData.lookingForAJob ? 'yes' : 'no'}</div>
                    {props.profileData.lookingForAJobDescription
                        && props.profileData.lookingForAJob
                        && <div className={styles.contact}><b>What job:</b>  {props.profileData.lookingForAJobDescription}</div>}

                    <div className={styles.contacts}><b>Contacts:</b></div>
                    <div>
                        {(Object.keys(props.profileData.contacts) as Array<keyof typeof props.profileData.contacts>).map((key) => {     
                            props.profileData.contacts[key] && contactsCnt++
                            return props.profileData.contacts[key] !== null 
                            && <div className={styles.contact}><b>{key}:</b>
                            <a href = {props.profileData.contacts[key]} className={styles.contact}>{props.profileData.contacts[key]}</a></div>
                            
                        })}
                        {contactsCnt === 0 ? <div className={styles.contact}>No contacts</div> : null}
                        {(showEditButton && props.isOwner) && <button onClick={() => setEditMode(true)}>Edit profile</button>}
                    </div>
                </div>
            }
            {editMode && <div>
                <AboutMeReduxForm initialValues={props.profileData} onSubmit={onSaveForm} />
            </div>
            }
        </div>
    );
}

export default AboutMe;