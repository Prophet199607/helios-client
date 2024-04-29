import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import UserProfileLayout from "../layouts/UserProfileLayout.vue";

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
                path: 'FAQ',
                name: 'FAQ',
                component: () => import("../views/FAQ.vue")
            },
            {
                path: '/register',
                name: 'register',
                component: () => import("../views/auth/Register.vue")
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
        meta: { requiresAuth: true, roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_LABORATORY'] },
        children: [
            {
                path: '',
                name: 'dashboard',
                meta: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_LABORATORY'] },
                component: () => import("../views/Dashboard.vue")
            },
            {
                path: 'patients',
                name: 'patients-index',
                meta: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_LABORATORY'] },
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
                        meta: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'] },
                        component: () => import("../views/patient/Report.vue")
                    },
                    {
                        path: 'create',
                        name: 'patients-create',
                        meta: { roles: ['ROLE_ADMIN'] },
                        component: () => import("../views/patient/Create.vue")
                    },
                ]
            },
            {
                path: 'user',
                name: 'user-index',
                meta: { roles: ['ROLE_ADMIN'] },
                component: () => import("../views/user/Index.vue"),
                children: [
                    {
                        path: '',
                        name: 'users',
                        meta: { roles: ['ROLE_ADMIN'] },
                        component: () => import("../views/user/User.vue")
                    },
                    {
                        path: 'create',
                        name: 'user-create',
                        meta: { roles: ['ROLE_ADMIN'] },
                        component: () => import("../views/user/Create.vue")
                    },
                ]
            },
            {
                path: 'laboratory',
                name: 'laboratory-index',
                meta: { roles: ['ROLE_LABORATORY'] },
                component: () => import("../views/laboratory/Index.vue"),
                children: [
                    {
                        path: 'upload',
                        name: 'image-upload',
                        meta: { roles: ['ROLE_LABORATORY'] },
                        component: () => import("../views/laboratory/Upload.vue")
                    },
                ]
            }
        ]
    },
    {
        path: '/my-profile',
        component: UserProfileLayout,
        meta: { requiresAuth: true, roles: ['ROLE_USER'] },
        children: [
            {
                path: '',
                name: 'my-profile',
                meta: { roles: ['ROLE_USER'] },
                component: () => import("../views/PatientDashboard.vue")
            },
            {
                path: 'appointments',
                name: 'appointment-index',
                component: () => import("../views/profile/appointments/Index.vue"),
                children: [
                    {
                        path: '',
                        name: 'appointments',
                        meta: { roles: ['ROLE_USER'] },
                        component: () => import("../views/profile/appointments/Appointments.vue")
                    },
                    {
                        path: 'create',
                        name: 'appointment-create',
                        meta: { roles: ['ROLE_USER'] },
                        component: () => import("../views/profile/appointments/NewAppointment.vue")
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
        path: '/404',
        name: '404',
        meta: { requiresAuth: false},
        component: () => import("../views/auth/404.vue")
    },
    // { path: '/:pathMatch(.*)', component: DefaultLayout }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
