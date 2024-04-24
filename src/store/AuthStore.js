import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const router = useRouter();
    const login = (credentials) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.post('/auth/authenticate', {
                    "username": credentials.username,
                    "password": credentials.password,
                });

                user.value = data;

                localStorage.setItem('auth', true);
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('roles', data.roles);
                localStorage.setItem('token_', data.token);
                if (data.roles[0] === 'ROLE_USER') {
                    router.push({name: 'index'});
                } else {
                    router.push({name: 'dashboard'});
                }

                resolve()
            } catch (e) {
                reject(e)
            }
        })
    };

    const register = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.post('/register', payload);
                router.push({name: 'index'});
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    };

    const checkUserLogStatus = () => {
        const auth = !!localStorage.getItem('auth');
        if (auth) {
            user.value = JSON.parse(localStorage.getItem('user'));
        } else {
            router.replace({name: 'login'});
        }
    };


    const logout = () => {
        user.value = null;
        localStorage.setItem('auth', false);
        localStorage.removeItem('user');
        localStorage.removeItem('uname');
        localStorage.removeItem('Emp_Code');
        localStorage.removeItem('Emp_Name');
        localStorage.removeItem('Token');
        router.push({name: 'login'})
    };

    return {login, register, checkUserLogStatus, logout, user};
})
