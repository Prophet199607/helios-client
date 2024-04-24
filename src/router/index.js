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
            }
        ]
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
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
                        component: () => import("../views/patient/Patient.vue")
                    },
                    {
                        path: 'report',
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
    {
        path: '/register',
        name: 'register',
        component: () => import("../views/auth/Register.vue")
    },
    // { path: '/:pathMatch(.*)', component: Home }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
