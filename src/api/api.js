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
    put(id = null, data = null) {
        return this.axiosInstance.put(`/${this.apiUrl}/${id}`, data)
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

export let usersAPI   = new Api('users')
export let followAPI  = new Api('follow')
export let profileAPI = new Api('profile')
export let authAPI    = new Api('auth')

usersAPI.getUsers = (pageNumber, usersOnPage) => usersAPI.get(`?page=${pageNumber}&count=${usersOnPage}`)

followAPI.follow = (id) => followAPI.post(id)
followAPI.unFollow = (id) => followAPI.delete(id)

profileAPI.getProfile   = (id)         => profileAPI.get(id)
profileAPI.getStatus    = (id)         => profileAPI.get('status/' + id)
profileAPI.updateStatus = (status)     => profileAPI.put('status', {status: status})

authAPI.getMe  = ()     => authAPI.get('me')
authAPI.login  = (form) => authAPI.post('login', form)
authAPI.logout = ()     => authAPI.delete('login')