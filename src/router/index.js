import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Front',
    component: () => import('../views/Frontend/Front.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Frontend/Index.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/Frontend/Product.vue'),
      },
      {
        path: 'productcategory',
        name: 'productcategory',
        component: () => import('../views/Frontend/productcategory.vue'),
      },
      {
        path: 'shippingcart',
        component: () => import('../views/Frontend/shippingcart.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Tools/Login.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../views/Backend/Dashboard.vue'),
    children: [
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/Backend/Coupons.vue'),
      },
      {
        path: 'productList',
        name: 'ProductList',
        component: () => import('../views/Backend/ProductList.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/Backend/Orders.vue'),

      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Tools/Oops.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Frontend/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
