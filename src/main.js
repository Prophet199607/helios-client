import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import  VueSelect  from "vue-select";
import 'vue-select/dist/vue-select.css';
import router from "./router/index";
import { createPinia } from 'pinia';
import "axios";
import {useAuthStore} from "./store/AuthStore.js";
import { defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
    defineRule('required', value => {
        if (!value || !value.length) {
            return 'This field is required';
        }
        return true;
    });
    defineRule('email', value => {
        if (!value || !value.length) {
            return true;
        }

        if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value.trim())) {
            return 'This field must be a valid email';
        }
        return true;
    });
    defineRule(rule, AllRules[rule]);
});


const pinia = createPinia()

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.user;
    console.log(to.meta.roles)
    console.log(authStore.role)

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'login' });
        } else if(to.matched.some(record => record.meta.roles) && !to.meta.roles.includes(authStore.role)) {
            next({name: '404'})
        } else {
            next();
        }
    } else {
        next();
    }
});


createApp(App)
    .use(router)
    .use(pinia)
    .component("v-select", VueSelect)
    .mount('#app');

