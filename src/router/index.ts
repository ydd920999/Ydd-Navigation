import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     name: 'IndexPage',
    //     meta: {
    //         title: '首页',
    //         keepAlive: true,
    //         requireAuth: true
    //     },
    //     component: () => import('@/pages/index1.vue')
    // },
    {
        path: '/',
        name: 'Encyclopedia',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/Encyclopedia.vue')
    },
    {
        path: '/vueUse',
        name: 'VueUse',
        meta: {
            title: 'vueUse demo',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/vueUse.vue')
    },
    {
        path: '/shapeShifter',
        name: 'ShapeShifter',
        meta: {
            title: '粒子',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/ShapeShifter.vue')
    }
    // {
    //     path: '/encyclopedia',
    //     name: 'Encyclopedia',
    //     meta: {
    //         title: '问道百科全书',
    //         keepAlive: true,
    //         requireAuth: true
    //     },
    //     component: () => import('@/pages/Encyclopedia.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
