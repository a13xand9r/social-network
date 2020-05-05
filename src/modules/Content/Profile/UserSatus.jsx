import React from 'react';
import styles from './Profile.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

const UserStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [statusBody, changeStatusBody] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }
    const onChangeStatus = (e) => {
        changeStatusBody(e.currentTarget.value)
    }
    const onUpdateStatus = () => {
        props.updateUserStatus(statusBody)
        setEditMode(false)
    }
    useEffect(() => {
        changeStatusBody(props.status)
    }, [props.status, editMode])
    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{props.status || 'set your status'}</span>
                </div>
            }
            {editMode &&
                <div onMouseLeave={deactivateEditMode} className={styles.editStatus}>
                    <div>
                        <input onChange={onChangeStatus} autoFocus={true} value={statusBody} />
                    </div>
                    <div>
                        <button onClick={onUpdateStatus}>Update status</button>
                    </div>
                </div>
            }
        </div>
    );
}


export default UserStatus;