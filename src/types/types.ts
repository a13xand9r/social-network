export type ContactsType = {
    github?: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
}
export type ProfilePhotoType = {
    large: string | null
    small: string | null
}
export type ProfileDataType = {
    fullName: string | null
    contacts: ContactsType
    photos: ProfilePhotoType
    aboutMe: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
}

export type UserPhotosType = {
    small: string | null
    large: string //TODO insert null
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: UserPhotosType
    followed: boolean
}
export type PostDataType = {
    id: string
    message: string
    like: string
}