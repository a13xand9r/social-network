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

class Api {
    apiUrl: string
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }
    post(id: null | string = null, data: PostType = null) {
        return axiosInstance.post(`/${this.apiUrl}/${id}`, data)
            .then(response => {
                return response.data
            })
    }
    put(id: null | string = null, data: any = null, headers: any = null) {
        return axiosInstance.put(`/${this.apiUrl}/${id ? id : ''}`, data, headers)
            .then(response => {
                return response.data
            })
    }
    delete(id: string) {
        return axiosInstance.delete(`/${this.apiUrl}/${id}`)
            .then(response => {
                return response.data
            })
    }
}

class UsersAPI extends Api {
    getUsers = (pageNumber: number, usersOnPage: number, friends: boolean = false, term: string | null = null) =>
        axiosInstance.get<GetUsersType>(`/${this.apiUrl}/?page=${pageNumber}&count=${usersOnPage}${friends ? '&friend=true' : ''}${term ? '&term=' + term : ''}`)
            .then(response => {
                return response.data
            })
}

class FollowAPI extends Api {
    follow = (id: number) => this.post(id.toString())
    unFollow = (id: number) => this.delete(id.toString())
}
class ProfileAPI extends Api {
    getProfile = (id: number) => axiosInstance.get<ProfileDataType>(`/${this.apiUrl}/${id.toString()}`)
        .then(response => {
            return response.data
        })
    getStatus = (id: number) => axiosInstance.get<string>(`/${this.apiUrl}/status/${id.toString()}`)
        .then(response => {
            return response.data
        })
    updateAboutMe = (form: AboutMeFormValuesType) => this.put(null, form)
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
class AuthAPI extends Api {
    getMe = () => axiosInstance.get<ResponseType<GetMeResponseDataType, AuthResultCode>>(`${this.apiUrl}/me`)
        .then(response => {
            return response.data
        })
    logout = () => this.delete('login')
    login = (form: LoginFormValuesType) => axiosInstance.post<ResponseType<{ userId: number }, LoginResultCode>>(`/login`, form)
        .then(response => {
            return response.data
        })
}
class SecurityAPI extends Api {
    getCaptcha = () => axiosInstance.get<GetCaptchaType>(`/${this.apiUrl}/get-captcha-url`)
        .then(response => {
            return response.data
        })
}

let usersAPI    = new UsersAPI('users')
let followAPI   = new FollowAPI('follow')
let profileAPI  = new ProfileAPI('profile')
let authAPI     = new AuthAPI('auth')
let securityAPI = new SecurityAPI('security')

export {usersAPI, followAPI, profileAPI, authAPI, securityAPI}