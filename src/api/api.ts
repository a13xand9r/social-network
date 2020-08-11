import axios from 'axios';
import { UsersType, ProfileDataType } from '../types/types';
import { LoginFormValuesType } from '../Components/Login/Login';
import { AboutMeFormValuesType } from '../Components/Content/Profile/AboutMe';

const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "cce64977-17ba-465b-8d32-0c7b57f1007e"
    }
});

type ResponseType<D = {}, RC = number> = {
    resultCode: RC
    messages: Array<string>
    data: D
}

export enum LoginResultCode {
    SuccessLogin = 0,
    CaptchaRequired = 10
}
export enum AuthResultCode {
    Success = 0,
    Error = 10
}
export type GetMeResponseDataType = {
    id: number
    email: string
    login: string
}
export type GetCaptchaType = {
    url: string
}
export type GetUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type LoginType = {
    resultCode: LoginResultCode
    messages: Array<string>
    data: {userId: number}
}
export type FollowType = {
    resultCode: number
    messages: Array<string>
    data: object
}
type PostType = LoginFormValuesType | null
//type PutType = {status: string} | {image: string} | null

class Api {
    apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
    post(id: null | string = null, data: PostType = null) {
        return axiosInstance.post(`/${this.apiUrl}/${id}`, data)
            .then(response => {
                return response.data
            })
    }
    put(id: null | string = null, data: any = null, headers: any = null) {
        return axiosInstance.put(`/${this.apiUrl}/${id}`, data, headers)
            .then(response => {
                return response.data
            })
    }
    // get(id: string) {
    //     return axiosInstance.get(`/${this.apiUrl}/${id}`)
    //         .then(response => {
    //             return response.data
    //         })
    // }
    delete(id: string) {
        return axiosInstance.delete(`/${this.apiUrl}/${id}`)
            .then(response => {
                return response.data
            })
    }

    getMe = () => axiosInstance.get<ResponseType<GetMeResponseDataType, AuthResultCode>>(`${this.apiUrl}/me`)
        .then(response => {
            return response.data
        })
    getCaptcha = () => axiosInstance.get<GetCaptchaType>(`/${this.apiUrl}/get-captcha-url`)
        .then(response => {
            return response.data
        })
    logout = () => this.delete('login')
    login = (form: LoginFormValuesType) => axiosInstance.post<ResponseType<{userId: number}, LoginResultCode>>(`/${this.apiUrl}/login`, form)
        .then(response => {
            return response.data
        })
    getUsers = (pageNumber: number, usersOnPage: number, friends: boolean = false, term: string | null = null) => 
        axiosInstance.get<GetUsersType>(`/${this.apiUrl}/?page=${pageNumber}&count=${usersOnPage}${friends ? '&friend=true' : ''}${term ? '&term=' + term : ''}`)
        .then(response => {
            return response.data
        })
    getProfile = (id: number) => axiosInstance.get<ProfileDataType>(`/${this.apiUrl}/${id.toString()}`)
        .then(response => {
            return response.data
        })
    getStatus = (id: number) => axiosInstance.get<string>(`/${this.apiUrl}/status/${id.toString()}`)
        .then(response => {
            return response.data
        })
    follow = (id: number) => axiosInstance.post(`/${this.apiUrl}/${id.toString()}`)
        .then(response => {
            return response.data
        })
    unFollow = (id: number) => this.delete(id.toString())
    updateAboutMe = (form: AboutMeFormValuesType) => axiosInstance.put(`/${profileAPI.apiUrl}`, form)
        .then(response => {
            return response.data
        })
    updateStatus = (status: string) => this.put('status', { status: status })
    updatePhoto = (photoFile: File) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return this.put('photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

let usersAPI    = new Api('users')
let followAPI   = new Api('follow')
let profileAPI  = new Api('profile')
let authAPI     = new Api('auth')
let securityAPI = new Api('security')

// usersAPI.getUsers = (pageNumber, usersOnPage) => usersAPI.get(`?page=${pageNumber}&count=${usersOnPage}`)

// followAPI.follow = (id) => followAPI.post(id)
// followAPI.unFollow = (id) => followAPI.delete(id)

// profileAPI.getProfile    = (id)         => profileAPI.get(id)
// profileAPI.getStatus     = (id)         => profileAPI.get('status/' + id)
// profileAPI.updateStatus  = (status)     => profileAPI.put('status', {status: status})
// profileAPI.updateAboutMe = (form)       => profileAPI.axiosInstance.put(`/${profileAPI.apiUrl}`, form)
//     .then(response => {
//         return response.data
//     })
// profileAPI.updatePhoto   = (photoFile)      => {
//     const formData = new FormData()
//     formData.append("image", photoFile)
//      return profileAPI.put('photo', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
// }

// securityAPI.getCaptcha = () => securityAPI.get('get-captcha-url')

// authAPI.getMe  = ()     => authAPI.get('me')
// authAPI.logout = ()     => authAPI.delete('login')
// authAPI.login  = (form) => authAPI.post('login', form)

export {usersAPI, followAPI, profileAPI, authAPI, securityAPI}