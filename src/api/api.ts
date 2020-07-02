import axios from 'axios';
import { UsersType, ProfileDataType } from '../types/types';

const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "cce64977-17ba-465b-8d32-0c7b57f1007e"
    }
});

type getMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
type getCaptchaType = {
    url: string
}
type getUsersType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
type getStatusType = string
type getType = getMeType | getCaptchaType | getUsersType | ProfileDataType | getStatusType

class Api {
    apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
    post(id: null | string = null, data: any = null) {
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
    get(id: string) {
        return axiosInstance.get(`/${this.apiUrl}/${id}`)
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

    getMe = () => this.get('me')
    getCaptcha = () => this.get('get-captcha-url')
    logout = () => this.delete('login')
    login = (form: any) => this.post('login', form)
    getUsers = (pageNumber: number, usersOnPage: number) => this.get(`?page=${pageNumber}&count=${usersOnPage}`)
    getProfile = (id: number) => this.get(id.toString())
    getStatus = (id: number) => this.get('status/' + id.toString())
    follow = (id: number) => this.post(id.toString())
    unFollow = (id: number) => this.delete(id.toString())
    updateAboutMe = (form: any) => this.put(`/${profileAPI.apiUrl}`, form)
        .then(response => {
            return response.data
        })
    updateStatus = (status: string) => this.put('status', { status: status })
    updatePhoto = (photoFile: any) => {
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