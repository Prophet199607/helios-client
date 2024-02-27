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
                path: 'collections',
                name: 'collections',
                component: () => import("../views/collection/Index.vue"),
                children: [
                    {
                        path: '',
                        name: 'collections-index',
                        component: () => import("../views/collection/Collection.vue")
                    },
                    {
                        path: 'create',
                        name: 'collections-create',
                        component: () => import("../views/collection/Create.vue")
                    },
                ]
            }
            // {
            //     path: 'sales-orders',
            //     name: 'sales-orders',
            //     component: () => import("../views/sales-order/Index.vue"),
            //     children: [
            //         {
            //             path: '',
            //             name: 'sales-orders-index',
            //             component: () => import("../views/sales-order/SalesOrder.vue")
            //         },
            //         {
            //             path: 'create',
            //             name: 'sales-orders-create',
            //             component: () => import("../views/sales-order/Create.vue")
            //         },
            //     ]
            // },
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
