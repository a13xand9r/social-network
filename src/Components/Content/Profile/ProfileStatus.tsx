import React, { FC, ChangeEvent } from 'react';
import styles from './Profile.module.css'
import { useState } from 'react';
import { useEffect } from 'react';

type PropsType = {
    status: string
    updateUserStatus: (statusBody: string) => void
    isOwner: boolean
}

const UserStatus: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [statusBody, changeStatusBody] = useState<string>(props.status)
    let timeoutId: number
    const activateEditMode = () => {
        if (props.isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        timeoutId = setTimeout(() => setEditMode(false))
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatusBody(e.currentTarget.value)
    }
    const onUpdateStatus = () => {
        props.updateUserStatus(statusBody)
        setEditMode(false)
    }
    useEffect(() => {
        changeStatusBody(props.status)
    }, [props.status, editMode])
    const onFocusHandler = () => {
        clearTimeout(timeoutId)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{props.status || 'set your status'}</span>
                </div>
            }
            {editMode &&
                <div onBlur={deactivateEditMode} onFocus={onFocusHandler} className={styles.editStatus}>
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