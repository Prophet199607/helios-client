import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
    {
        path: '',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'index',
                component: () => import("../views/Index.vue")
            },
            {
                path: 'checkup-request',
                name: 'checkup-request',
                component: () => import("../views/CheckupRequest.vue")
            }
        ]
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true, roles: ['ROLE_ADMIN', 'ROLE_USER'] },
        children: [
            {
                path: '',
                name: 'dashboard',
                meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
                component: () => import("../views/Dashboard.vue")
            },
            {
                path: 'patients',
                name: 'patients-index',
                component: () => import("../views/patient/Index.vue"),
                children: [
                    {
                        path: '',
                        name: 'patients',
                        meta: { roles: ['ROLE_ADMIN'] },
                        component: () => import("../views/patient/Patient.vue")
                    },
                    {
                        path: 'report',
                        name: 'patients-report',
                        meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
                        component: () => import("../views/patient/Report.vue")
                    },
                    {
                        path: 'create',
                        name: 'patients-create',
                        meta: { roles: ['ROLE_ADMIN'] },
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
    {
        path: '/register',
        name: 'register',
        component: () => import("../views/auth/Register.vue")
    },
    {
        path: '/404',
        name: '404',
        component: () => import("../views/auth/404.vue")
    },
    // { path: '/:pathMatch(.*)', component: Home }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
