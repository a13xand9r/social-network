// @ts-nocheck
import * as axios from 'axios';

class Api {
    constructor(apiUrl) {
        this.axiosInstance = axios.create({
            baseURL: "https://social-network.samuraijs.com/api/1.0/",
            withCredentials: true,
            headers: {
                "API-KEY": "cce64977-17ba-465b-8d32-0c7b57f1007e"
            }
        });
        this.apiUrl = apiUrl;
    }
    post(id = null, data = null) {
        return this.axiosInstance.post(`/${this.apiUrl}/${id}`, data)
            .then(response => {
                return response.data
            })
    }
    put(id = null, data = null, headers = null) {
        return this.axiosInstance.put(`/${this.apiUrl}/${id}`, data, headers)
            .then(response => {
                return response.data
            })
    }
    get(id) {
        return this.axiosInstance.get(`/${this.apiUrl}/${id}`)
            .then(response => {
                return response.data
            })
    }
    delete(id) {
        return this.axiosInstance.delete(`/${this.apiUrl}/${id}`)
            .then(response => {
                return response.data
            })
    }
}

export let usersAPI    = new Api('users')
export let followAPI   = new Api('follow')
export let profileAPI  = new Api('profile')
export let authAPI     = new Api('auth')
export let securityAPI = new Api('security')

usersAPI.getUsers = (pageNumber, usersOnPage) => usersAPI.get(`?page=${pageNumber}&count=${usersOnPage}`)

followAPI.follow = (id) => followAPI.post(id)
followAPI.unFollow = (id) => followAPI.delete(id)

profileAPI.getProfile    = (id)         => profileAPI.get(id)
profileAPI.getStatus     = (id)         => profileAPI.get('status/' + id)
profileAPI.updateStatus  = (status)     => profileAPI.put('status', {status: status})
profileAPI.updateAboutMe = (form)       => profileAPI.axiosInstance.put(`/${profileAPI.apiUrl}`, form)
    .then(response => {
        return response.data
    })
profileAPI.updatePhoto   = (photoFile)      => {
    const formData = new FormData()
    formData.append("image", photoFile)
     return profileAPI.put('photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

securityAPI.getCaptcha = () => securityAPI.get('get-captcha-url')

authAPI.getMe  = ()     => authAPI.get('me')
authAPI.logout = ()     => authAPI.delete('login')
authAPI.login  = (form) => authAPI.post('login', form)