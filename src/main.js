import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import  VueSelect  from "vue-select";
import 'vue-select/dist/vue-select.css';
import router from "./router/index";
import { createPinia } from 'pinia';
import "axios";
import {useAuthStore} from "./store/AuthStore.js";
// import { defineRule } from 'vee-validate';
// import * as AllRules from '@vee-validate/rules';
// Object.keys(AllRules).forEach(rule => {
//     defineRule(rule, AllRules[rule]);
// });

const pinia = createPinia()

router.beforeEach((to, from) => {
    const authStore = useAuthStore();

    const isAuthenticated = !!authStore.user;

    if (!isAuthenticated && to.name !== 'login') {
        return { name: 'login' }
    }

    if (isAuthenticated && to.name === 'login') {
        return { name: 'home' }
    }
})

createApp(App)
    .use(router)
    .use(pinia)
    .component("v-select", VueSelect)
    .mount('#app');

