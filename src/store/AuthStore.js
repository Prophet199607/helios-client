import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";
import { useRouter} from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(localStorage.getItem('user'))
    const role = ref(localStorage.getItem('roles'))
    const router = useRouter();
    const login = async (credentials) => {
        try {
            const {data} = await api.post('/auth/authenticate', {
                "username": credentials.username,
                "password": credentials.password,
            });

            user.value = data;
            role.value = data.roles[0];
            localStorage.setItem('auth', true);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('roles', data.roles[0]);
            localStorage.setItem('token_', data.token);

            if (data.roles[0] === 'ROLE_USER') {
                await router.push({name: 'index'});
            } else {
                await router.push({name: 'dashboard'});
            }
        } catch (e) {

        }
    };

    const register = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                await api.post('/register', payload);
                await router.push({name: 'index'});
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
            router.replace({name: 'login'}).then(_ => {});
        }
    };


    const logout = () => {
        user.value = null;
        localStorage.setItem('auth', false);
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
        localStorage.removeItem('token_');
        router.push({name: 'login'}).then(_ => {})
    };

    return {login, register, checkUserLogStatus, logout, user, role};
})
