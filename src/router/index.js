import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from "../layouts/DefaultLayout.vue";

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import("../views/Home.vue")
            },
            {
                path: 'patients',
                name: 'patients-index',
                component: () => import("../views/patient/Index.vue"),
                children: [
                    {
                        path: '',
                        name: 'patients',
                        component: () => import("../views/patient/Patient.vue")
                    },
                    {
                        path: '',
                        name: 'patients-report',
                        component: () => import("../views/patient/Report.vue")
                    },
                    {
                        path: 'create',
                        name: 'patients-create',
                        component: () => import("../views/patient/Create.vue")
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/auth/Login.vue")
    },
    // { path: '/:pathMatch(.*)', component: Home }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
